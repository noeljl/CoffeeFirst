import React, { useState, useEffect, useRef } from 'react'
import './PersonalInfo.css'
import Button from '../Buttons.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { initialState as accountInitialState } from '../../store/accountSettings/AccountSettings.reducers.js'
import {
  getMemberByIdAction,
  updateMemberByIDAction,
  changeMemberPasswordAction,
} from '../../store/accountSettings/AccountSettings.actions.js'
import FormData from 'form-data'
import DeleteAccountModal from '../deleteAccountModal/DeleteAccountModal.jsx'

/**
 * PersonalInfo
 *
 * Diese Komponente ermöglicht es Benutzern, ihre persönlichen Informationen anzuzeigen und zu bearbeiten,
 * einschließlich Name, Profilbild, E-Mail und Passwort.
 */
function PersonalInfo() {
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)

  // Redux-State
  const accountSettings =
    useSelector((state) => state.accountSettings) || accountInitialState
  const memberId = useSelector((state) => state.auth.member?.id)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const {
    firstName: reduxFirstName,
    lastName: reduxLastName,
    profilePicture: reduxProfilePicture,
    email: reduxEmail,
    isLoading,
    error,
  } = accountSettings

  // Lokaler UI-State
  const [editingField, setEditingField] = useState(null)
  const [localFirstName, setLocalFirstName] = useState('')
  const [localLastName, setLocalLastName] = useState('')
  const [localEmail, setLocalEmail] = useState('')
  const [localPassword, setLocalPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  })

  // State für Profilbild-Upload
  const [localProfilePicFile, setLocalProfilePicFile] = useState(null)
  const [localProfilePicUrl, setLocalProfilePicUrl] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [showUploadZone, setShowUploadZone] = useState(false)

  // State für Delete Account Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Daten bei Authentifizierung und MemberId laden
  useEffect(() => {
    if (isAuthenticated && memberId) {
      dispatch(getMemberByIdAction(memberId))
    }
    console.log('memberId in PersonalInfo', memberId)
  }, [isAuthenticated, memberId, dispatch])

  // Redux-Daten in lokale States synchronisieren
  useEffect(() => {
    setLocalFirstName(reduxFirstName || '')
    setLocalLastName(reduxLastName || '')
    setLocalEmail(reduxEmail || '')
    setLocalProfilePicUrl(reduxProfilePicture || '')
    setImagePreview(null)
    setShowUploadZone(false)
  }, [reduxFirstName, reduxLastName, reduxEmail, reduxProfilePicture])

  // Event-Handler
  const handleEdit = (field) => {
    setEditingField(field)
    setLocalFirstName(reduxFirstName || '')
    setLocalLastName(reduxLastName || '')
    setLocalEmail(reduxEmail || '')
    setLocalPassword({ current: '', new: '', confirm: '' })
    setLocalProfilePicFile(null)
    setLocalProfilePicUrl(reduxProfilePicture || '')
    setImagePreview(null)
    setShowUploadZone(false)
  }

  const handleCancel = () => {
    setEditingField(null)
    setLocalFirstName(reduxFirstName || '')
    setLocalLastName(reduxLastName || '')
    setLocalEmail(reduxEmail || '')
    setLocalPassword({ current: '', new: '', confirm: '' })
    setLocalProfilePicFile(null)
    setLocalProfilePicUrl(reduxProfilePicture || '')
    setImagePreview(null)
    setShowUploadZone(false)
  }

  // Delete Account Modal Handlers
  const handleDeleteAccountClick = () => {
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleDeleteAccountSuccess = () => {
    // This will be called after successful account deletion
    // The modal will close and user will be redirected to home page
  }

  // Datei-Validierung
  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!file) return false

    if (!allowedTypes.includes(file.type)) {
      alert('Bitte wählen Sie ein gültiges Bildformat (JPEG, PNG, GIF, WebP).')
      return false
    }

    if (file.size > maxSize) {
      alert('Die Datei ist zu groß. Maximale Größe: 5MB.')
      return false
    }

    return true
  }

  // Bild-Upload Handler
  const handleImageSelect = (file) => {
    if (!validateFile(file)) {
      setLocalProfilePicFile(null)
      setImagePreview(null)
      return
    }

    setLocalProfilePicFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  // Drag & Drop Handler
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleImageSelect(files[0])
    }
  }

  const handleSave = async () => {
    let updatedData = {}
    let isFormData = false

    try {
      switch (editingField) {
        case 'legalName':
          updatedData = {
            firstName: localFirstName,
            lastName: localLastName,
          }
          break

        case 'profilePicture': {
          if (!localProfilePicFile) {
            setEditingField(null)
            return
          }
          const formData = new FormData()
          formData.append('profilePicture', localProfilePicFile)
          updatedData = formData
          isFormData = true
          break
        }

        case 'email':
          updatedData = { email: localEmail }
          break

        case 'password': {
          if (
            !localPassword.current ||
            !localPassword.new ||
            !localPassword.confirm
          ) {
            alert('Bitte alle Passwort-Felder ausfüllen.')
            return
          }
          if (localPassword.new !== localPassword.confirm) {
            alert('Neue Passwörter stimmen nicht überein.')
            return
          }
          if (localPassword.new.length < 8) {
            alert('Das neue Passwort muss mindestens 8 Zeichen lang sein.')
            return
          }

          await dispatch(
            changeMemberPasswordAction({
              id: memberId,
              currentPassword: localPassword.current,
              newPassword: localPassword.new,
            })
          ).unwrap()

          // alert('Passwort erfolgreich geändert!')
          break
        }

        default:
          return
      }

      if (Object.keys(updatedData).length > 0 || isFormData) {
        await dispatch(
          updateMemberByIDAction({
            id: memberId,
            updatedFields: updatedData,
            isFormData,
          })
        ).unwrap()
      }

      // if (editingField === 'password') {
      //   alert('Passwort erfolgreich geändert!')
      // } else {
      //   alert('Änderungen erfolgreich gespeichert!')
      // }

      setEditingField(null)
      setLocalProfilePicFile(null)
      setImagePreview(null)
      setShowUploadZone(false)

      if (editingField === 'profilePicture' && imagePreview) {
        setLocalProfilePicUrl(imagePreview)
      }
    } catch (err) {
      console.error('Fehler beim Aktualisieren des Profils:', err)
      const errorMessage =
        err.message || 'Fehler beim Speichern. Bitte versuchen Sie es erneut.'
      alert(errorMessage)
    }
  }

  // Universeller Change-Handler
  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (name.startsWith('password.')) {
      const subField = name.split('.')[1]
      setLocalPassword((prev) => ({ ...prev, [subField]: value }))
    } else if (type === 'file') {
      const file = files?.[0]
      if (file) {
        handleImageSelect(file)
      }
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

  // Aktuelles Bild für Anzeige ermitteln
  const getCurrentImageSrc = () => {
    if (imagePreview) {
      return imagePreview
    }
    if (localProfilePicUrl) {
      return localProfilePicUrl.startsWith('http')
        ? localProfilePicUrl
        : `http://localhost:3001/profileImages${localProfilePicUrl}`
    }
    return 'http://localhost:3001/profileImages/example_picture.png'
  }

  return (
    <div className="personal-info-container">
      <h1 className="personal-info-title">Personal information</h1>

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
                    value={localFirstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="floating-input">
                  <label htmlFor="lastName">Last name on ID</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={localLastName}
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
          {editingField === 'profilePicture' ? (
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
                <div
                  className="profile-image-round-wrapper"
                  style={{ textAlign: 'center', marginBottom: '20px' }}
                >
                  <img
                    src={getCurrentImageSrc()}
                    alt="Profilbild"
                    style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                <div
                  className={`image-upload-zone ${
                    isDragOver ? 'drag-over' : ''
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    backgroundColor: isDragOver ? '#f0f8ff' : '#fafafa',
                    borderColor: isDragOver ? '#007bff' : '#ccc',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleChange}
                    style={{ display: 'none' }}
                  />
                  <p style={{ margin: '0', color: '#666' }}>
                    {isDragOver
                      ? 'Bild hier ablegen...'
                      : 'Ziehen Sie ein Bild hierher oder klicken Sie zum Auswählen'}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#999',
                      margin: '10px 0 0 0',
                    }}
                  >
                    Unterstützte Formate: JPEG, PNG, GIF, WebP (max. 5MB)
                  </p>
                </div>
              </div>

              <div className="button-group">
                {(localProfilePicFile || localProfilePicUrl) && (
                  <Button
                    onClick={async () => {
                      try {
                        // Send request to backend to set profile picture to example_picture.png
                        await dispatch(
                          updateMemberByIDAction({
                            id: memberId,
                            updatedFields: {
                              profilePicture: '/example_picture.png',
                            },
                            isFormData: false,
                          })
                        ).unwrap()

                        // Clear local state
                        setLocalProfilePicFile(null)
                        setLocalProfilePicUrl('/example_picture.png')
                        setImagePreview(null)
                        if (fileInputRef.current)
                          fileInputRef.current.value = ''
                      } catch (err) {
                        console.error(
                          'Fehler beim Entfernen des Profilbilds:',
                          err
                        )
                        const errorMessage =
                          err.message ||
                          'Fehler beim Entfernen des Profilbilds. Bitte versuchen Sie es erneut.'
                        alert(errorMessage)
                      }
                    }}
                    bg="red"
                    radius="small"
                  >
                    Remove picture
                  </Button>
                )}

                {localProfilePicFile && (
                  <Button
                    bg="black"
                    type="submit"
                    radius="small"
                    onClick={handleSave}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    Save
                  </Button>
                )}
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
                onClick={() => handleEdit('profilePicture')}
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
                    type="email"
                    id="email"
                    name="email"
                    value={localEmail}
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
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="password.current"
                    placeholder="Current Password"
                    value={localPassword.current}
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
                    value={localPassword.new}
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
                    value={localPassword.confirm}
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
        <Button
          bg="red"
          radius="small"
          padding="medium"
          fw="bold"
          onClick={handleDeleteAccountClick}
        >
          Delete account
        </Button>
      </div>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onDeleteSuccess={handleDeleteAccountSuccess}
      />
    </div>
  )
}

export default PersonalInfo
