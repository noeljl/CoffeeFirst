import React, { useState, useEffect } from 'react'
import './PersonalInfo.css'
import Button from '../../components/ui/buttons/Button.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { initialState as accountInitialState } from '../../store/accountSettings/AccountSettings.reducers.js'
import {
  getMemberByIdAction,
  updateMemberByIDAction, // Korrekter Import der Update-Action
} from '../../store/accountSettings/AccountSettings.actions.js'

function PersonalInfo() {
  const dispatch = useDispatch()

  // Redux-State
  const accountSettings =
    useSelector((state) => state.accountSettings) || accountInitialState

  const memberId = useSelector((state) => state.auth.member?.id)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  useEffect(() => {
    if (!isAuthenticated || !memberId) return
    dispatch(getMemberByIdAction(memberId))
  }, [isAuthenticated, memberId, dispatch])

  const {
    firstName: reduxFirstName, // Umbenennen, um Konflikt mit lokalem State zu vermeiden
    lastName: reduxLastName, // Umbenennen
    profilePic: reduxProfilePic, // Umbenennen
    email: reduxEmail, // Umbenennen
    password: reduxPassword, // Umbenennen
    isLoading,
    error,
  } = accountSettings

  // Lokaler UI-State: Welches Feld wird gerade editiert?
  const [editingField, setEditingField] = useState(null)

  // Lokaler State für die bearbeitbaren Feldwerte
  // Wir initialisieren diese Werte, sobald die Daten aus Redux kommen.
  const [localFirstName, setLocalFirstName] = useState(reduxFirstName)
  const [localLastName, setLocalLastName] = useState(reduxLastName)
  const [localEmail, setLocalEmail] = useState(reduxEmail)
  const [localPassword, setLocalPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  })
  const [localProfilePic, setLocalProfilePic] = useState(null) // Für Datei-Uploads

  // --- useEffect zum Initialisieren des lokalen States bei Redux-Datenänderungen ---
  // Dieser Effekt stellt sicher, dass der lokale State aktualisiert wird,
  // wenn die Daten aus dem Redux Store (nach dem getMemberByMail) geladen werden.
  useEffect(() => {
    setLocalFirstName(reduxFirstName)
    setLocalLastName(reduxLastName)
    setLocalEmail(reduxEmail)
    // Beachte: Passwörter werden aus Sicherheitsgründen nicht aus dem Redux-Store in den lokalen State geladen.
    // Sie werden beim Bearbeiten neu eingegeben.
    setLocalProfilePic(reduxProfilePic) // Setze hier die URL, nicht das File-Objekt
  }, [reduxFirstName, reduxLastName, reduxEmail, reduxProfilePic])

  // --- Debug useEffect um Redux State Changes zu verfolgen (optional) ---
  useEffect(() => {
    console.log('Redux State Update:', {
      reduxFirstName,
      reduxLastName,
      reduxEmail,
      isLoading,
      error,
    })
  }, [reduxFirstName, reduxLastName, reduxEmail, isLoading, error])

  // Öffnet den Edit-Modus und initialisiert den lokalen State mit den aktuellen Redux-Werten
  const handleEdit = (field) => {
    setEditingField(field)
    // Setze lokale Werte auf die aktuellen Redux-Werte, wenn der Bearbeitungsmodus beginnt
    setLocalFirstName(reduxFirstName)
    setLocalLastName(reduxLastName)
    setLocalEmail(reduxEmail)
    // Passwörter werden beim Editieren nicht vorab gefüllt, nur zurückgesetzt
    setLocalPassword({ current: '', new: '', confirm: '' })
    setLocalProfilePic(reduxProfilePic)
  }

  const handleCancel = () => {
    setEditingField(null)
    // Lokale Änderungen verwerfen und auf Redux-Werte zurücksetzen
    setLocalFirstName(reduxFirstName)
    setLocalLastName(reduxLastName)
    setLocalEmail(reduxEmail)
    setLocalPassword({ current: '', new: '', confirm: '' })
    setLocalProfilePic(reduxProfilePic)
  }

  // --- handleSave Funktion: Hier wird die Update-Action dispatchet ---
  const handleSave = async () => {
    console.log('Saving field:', editingField)

    let updatedData = {} // Objekt für die zu sendenden Daten
    let emailToUpdate = reduxEmail // Die E-Mail des Benutzers als Identifier

    switch (editingField) {
      case 'legalName':
        updatedData = {
          firstName: localFirstName,
          lastName: localLastName,
        }
        break
      case 'profilePic':
        // Hier wäre die Logik für den Bild-Upload (z.B. FormData)
        // Nehmen wir an, `localProfilePic` ist ein File-Objekt, das hochgeladen werden muss.
        // Die API würde wahrscheinlich die URL des hochgeladenen Bildes zurückgeben.
        updatedData = {
          profilePic: localProfilePic, // Dies müsste an deine API-Erwartung angepasst werden
        }
        break
      case 'email':
        updatedData = {
          email: localEmail,
        }
        // ACHTUNG: Wenn die E-Mail geändert wird, ist die `emailToUpdate`
        // für den *aktuellen* Benutzer immer noch die alte E-Mail,
        // da sie erst nach erfolgreichem Update im Redux-Store aktualisiert wird.
        // Die API braucht die alte E-Mail, um den richtigen Benutzer zu finden,
        // und die neue E-Mail in `updatedData`.
        break
      case 'password':
        // Für Passwörter benötigt die API oft das aktuelle und die neuen Passwörter
        updatedData = {
          currentPassword: localPassword.current,
          newPassword: localPassword.new,
          confirmNewPassword: localPassword.confirm,
        }
        // Hier sollte eine serverseitige Validierung erfolgen
        if (localPassword.new !== localPassword.confirm) {
          alert('New password and confirmation do not match!')
          return // Abbruch
        }
        break
      default:
        console.warn('Unknown field to save:', editingField)
        setEditingField(null)
        return
    }

    try {
      // Dispatche die Update-Action
      // updateMemberProfileByMailAction erwartet die E-Mail des zu aktualisierenden Members
      // und die aktualisierten Felder als zweites Argument (Payload).
      // Deine Action muss entsprechend angepasst werden, um ein Objekt mit den Daten zu akzeptieren:
      // updateMemberProfileByMailAction({ email: emailToUpdate, updatedFields: updatedData })
      await dispatch(
        updateMemberByIDAction({
          id: memberId, // Identifiziert den Benutzer
          updatedFields: updatedData, // Die zu aktualisierenden Daten
        })
      ).unwrap() // .unwrap() wirft einen Fehler, wenn die Action rejected wird

      setEditingField(null) // Bearbeitungsmodus beenden bei Erfolg
    } catch (err) {
      console.error('Failed to update profile:', err)
      // Redux Toolkit Thunks handhaben Fehler automatisch im rejected-Reducer.
      // Hier könntest du zusätzlichen UI-Feedback geben.
    }
  }

  // --- Universeller Change-Handler für lokalen State ---
  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (name.startsWith('password.')) {
      const subField = name.split('.')[1]
      setLocalPassword((prev) => ({
        ...prev,
        [subField]: value,
      }))
    } else if (type === 'file') {
      // Speichern des File-Objekts für den Upload
      setLocalProfilePic(files[0])
    } else {
      switch (name) {
        case 'firstName':
          setLocalFirstName(value)
          break
        case 'lastName':
          setLocalLastName(value)
          break
        case 'email':
          setLocalEmail(value)
          break
        default:
          break
      }
    }
  }

  // Debug render
  console.log(
    'PersonalInfo render - firstName:',
    reduxFirstName, // Zeigt den Wert aus Redux
    'lastName:',
    reduxLastName
  )

  return (
    <div className="personal-info-page">
      <main className="personal-info-container">
        <h1 className="personal-info-title">Personal information</h1>

        {/* Debug Information - kann später entfernt werden */}
        {/* <div
          style={{
            padding: '10px',
            backgroundColor: '#f0f0f0',
            margin: '10px 0',
          }}
        >
          <strong>Debug Info:</strong>
          <br />
          Loading: {isLoading ? 'Yes' : 'No'}
          <br />
          Error: {error || 'None'}
          <br />
          FirstName (Redux): {reduxFirstName}
          <br />
          LastName (Redux): {reduxLastName}
          <br />
          Email (Redux): {reduxEmail}
          <br />
          FirstName (Local): {localFirstName}
          <br />
          LastName (Local): {localLastName}
          <br />
          Email (Local): {localEmail}
          <br />
          Editing Field: {editingField || 'None'}
        </div> */}

        {/* Anzeige von Lade‑/Fehlerzuständen */}
        {isLoading && <p>Loading…</p>}
        {error && <p className="error-text">{error}</p>}

        <div className="info-list">
          {/* LEGAL NAME */}
          <div className="info-item">
            {editingField === 'legalName' ? (
              <>
                <div className="info-header">
                  <div>
                    <h2 className="info-label">Legal Name</h2>
                    <p className="info-value">
                      We will need to verify your legal name before reservation.
                    </p>
                  </div>
                  <button
                    className="edit-button cancel-link"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>

                <div className="info-form">
                  <div className="floating-input">
                    <label htmlFor="firstName">First name on ID</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={localFirstName || ''} // Nutze lokalen State
                      onChange={handleChange}
                    />
                  </div>
                  <div className="floating-input">
                    <label htmlFor="lastName">Last name on ID</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={localLastName || ''} // Nutze lokalen State
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="button-group">
                  <Button onClick={handleSave} bg="black">
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="info-text">
                  <span className="info-label">Legal Name</span>
                  <span className="info-value">{`${reduxFirstName || ''} ${
                    reduxLastName || ''
                  }`}</span>
                </div>
                <button
                  className="edit-button"
                  onClick={() => handleEdit('legalName')}
                >
                  Edit
                </button>
              </>
            )}
          </div>

          {/* PROFILE PICTURE */}
          <div className="info-item">
            {editingField === 'profilePic' ? (
              <>
                <div className="info-header">
                  <div>
                    <h2 className="info-label">Profile Picture</h2>
                    <p className="info-value">Keep your smile up to date</p>
                  </div>
                  <button
                    className="edit-button cancel-link"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>

                <div className="profile-pic-content">
                  <div className="profile-image-round-wrapper">
                    <img
                      src={
                        localProfilePic // Nutze lokalen State für Vorschau
                          ? typeof localProfilePic === 'string'
                            ? localProfilePic
                            : URL.createObjectURL(localProfilePic)
                          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
                      }
                      alt="Profile"
                      className="profile-pic-large"
                    />
                  </div>
                </div>

                <div className="button-group">
                  <Button onClick={handleSave} bg="black" radius="small">
                    Save
                  </Button>

                  <label
                    style={{
                      display: 'flex',
                      cursor: 'pointer',
                      marginLeft: '0.5rem',
                    }}
                  >
                    <input
                      type="file"
                      name="profilePic"
                      accept="image/*"
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                    <Button as="span" bg="black" radius="small">
                      Upload new picture
                    </Button>
                  </label>
                </div>
              </>
            ) : (
              <>
                <div className="info-text">
                  <span className="info-label">Profile Picture</span>
                  <span className="info-value">Keep your smile up to date</span>
                </div>
                <button
                  className="edit-button"
                  onClick={() => handleEdit('profilePic')}
                >
                  Edit
                </button>
              </>
            )}
          </div>

          {/* EMAIL */}
          <div className="info-item">
            {editingField === 'email' ? (
              <>
                <div className="info-header">
                  <div>
                    <h2 className="info-label">Email</h2>
                    <p className="info-value">How can we contact you?</p>
                  </div>
                  <button
                    className="edit-button cancel-link"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>

                <div className="info-form">
                  <div className="floating-input">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={localEmail || ''} // Nutze lokalen State
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="button-group">
                  <Button bg="black" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="info-text">
                  <span className="info-label">Email</span>
                  <span className="info-value">{reduxEmail || ''}</span>
                </div>
                <button
                  className="edit-button"
                  onClick={() => handleEdit('email')}
                >
                  Edit
                </button>
              </>
            )}
          </div>

          {/* PASSWORD */}
          <div className="info-item">
            {editingField === 'password' ? (
              <>
                <div className="info-header">
                  <div>
                    <h2 className="info-label">Password</h2>
                    <p className="info-value">Please choose a safe password</p>
                  </div>
                  <button
                    className="edit-button cancel-link"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>

                <div className="info-form">
                  <div className="floating-input">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password.current"
                      placeholder="Current Password"
                      value={localPassword.current || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="floating-input">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="password.new"
                      placeholder="New Password"
                      value={localPassword.new || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="floating-input">
                    <label htmlFor="confirmNewPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmNewPassword"
                      name="password.confirm"
                      placeholder="Confirm new Password"
                      value={localPassword.confirm || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="button-group">
                  <Button bg="black" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="info-text">
                  <span className="info-label">Password</span>
                  <span className="info-value">••••••••••</span>
                </div>
                <button
                  className="edit-button"
                  onClick={() => handleEdit('password')}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>

        <div className="delete-account-container">
          <Button bg="red" radius="small" padding="medium" fw="bold">
            Delete account
          </Button>
        </div>
      </main>
    </div>
  )
}

export default PersonalInfo
