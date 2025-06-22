import React, { useState } from 'react'
import './PersonalInfo.css'
import Button from '../../components/ui/buttons/Button.jsx'

function PersonalInfo() {
  // State, welches Feld gerade editiert wird: 'legalName' | 'profilePic' | 'email' | 'password' | null
  const [editingField, setEditingField] = useState(null)

  // Form-Daten
  const [formData, setFormData] = useState({
    firstName: 'Maximilian',
    lastName: 'Müller',
    profilePic: null,
    email: 'maximilian.mueller@web.de',
    password: {
      current: '',
      new: '',
      confirm: '',
    },
  })

  // Handler zum Öffnen des Edit-Modus
  const handleEdit = (field) => {
    setEditingField(field)
  }

  // Cancel: zurück in View-Mode, Form-Daten wieder zurücksetzen (falls nötig)
  const handleCancel = () => {
    // Hier könntest Du die formData auf die ursprünglichen Werte zurücksetzen.
    // Für Demo belassen wir es einfach nur beim Schließen:
    setEditingField(null)
  }

  // Save: Werte übernehmen und schließen
  const handleSave = () => {
    // TODO: API-Call oder Context-Update hier
    console.log('Saved', editingField, formData)
    setEditingField(null)
  }

  // Universal Change-Handler
  const handleChange = (e) => {
    const { name, value, files } = e.target

    if (name === 'profilePic') {
      setFormData((f) => ({ ...f, profilePic: files[0] }))
    } else if (name in formData.password) {
      setFormData((f) => ({
        ...f,
        password: { ...f.password, [name]: value },
      }))
    } else {
      setFormData((f) => ({ ...f, [name]: value }))
    }
  }

  return (
    <div className="personal-info-page">
      <main className="personal-info-container">
        <h1 className="personal-info-title">Personal information</h1>

        <div className="info-list">
          {/** LEGAL NAME **/}
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
                      placeholder="" // Placeholder leer lassen
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="floating-input">
                    <label htmlFor="lastName">Last name on ID</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="" // Placeholder leer lassen
                      value={formData.lastName}
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
                  <span className="info-value">Maxmilian Müller</span>
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
                  {/* Neuer Wrapper für den runden Ausschnitt im Bearbeitungsmodus */}
                  <div className="profile-image-round-wrapper">
                    <img
                      src={
                        formData.profilePic
                          ? URL.createObjectURL(formData.profilePic)
                          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
                      }
                      alt="Profile"
                      className="profile-pic-large"
                    />
                  </div>
                </div>

                <div className="button-group">
                  {/* Save Button: Make it black with small radius as per screenshot */}
                  <Button onClick={handleSave} bg="black" radius="small">
                    Save
                  </Button>

                  {/* Upload new picture Button: Make it red with small radius as per screenshot */}
                  {/* It needs to be inside a label for file input functionality */}
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
                      style={{ display: 'none' }} // Keep the actual file input hidden
                    />
                    {/* Render the Button component *inside* the label, with specific props */}
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

          {/** EMail **/}
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
                    <label htmlFor="firstName">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="" // Placeholder leer lassen
                      value={formData.email}
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
                  <span className="info-value">Maxmilian.mueller@tum.de</span>
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

          {/** Password **/}
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
                    <label htmlFor="firstName">Password</label>
                    <input
                      type="text"
                      id="password"
                      name="currentPassword"
                      placeholder="Current Password" // Placeholder leer lassen
                      value={formData.password.current}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="floating-input">
                    <label htmlFor="firstName">New Password</label>
                    <input
                      type="text"
                      id="newPassword"
                      name="newPassword"
                      placeholder="New Password" // Placeholder leer lassen
                      value={formData.password.new}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="floating-input">
                    <label htmlFor="firstName">Confirm Password</label>
                    <input
                      type="text"
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      placeholder="Confirm new Password" // Placeholder leer lassen
                      value={formData.password.confirm}
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
                  <span className="info-value">
                    Please choose a safe password
                  </span>
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
