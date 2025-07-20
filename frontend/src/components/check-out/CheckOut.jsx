import React, { useState } from 'react'
import jsQR from 'jsqr'
import {
  getMembershipByMemberId,
  updateMembership,
} from '../../apis/membership'
import { addCoffeeShopToMemberList } from '../../apis/member'
import { createVisit } from '../../apis/visit'
import { useSelector } from 'react-redux'
import Button from '../Buttons.jsx'
import styles from '../styles/CheckInModal.module.css'
import stylesCheckout from './CheckOut.module.css'

const CheckOut = () => {
  const [qrData, setQrData] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const member = useSelector((state) => state.auth.member)
  const memberId = member?.id

  // Real QR Code Scanner using jsQR
  const scanQRCode = (imageFile) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        // Using jsQR library (loaded from CDN)
        const code = jsQR(imageData.data, imageData.width, imageData.height)

        if (code) {
          try {
            // Try to parse the QR code data as JSON
            const qrContent = JSON.parse(code.data)
            resolve(qrContent)
          } catch (e) {
            // If it's not JSON, return the raw data
            resolve({ rawData: code.data })
          }
        } else {
          reject(new Error('No QR code found in image'))
        }
      }

      img.onerror = () => {
        reject(new Error('Error loading image'))
      }

      img.src = URL.createObjectURL(imageFile)
    })
  }

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setIsLoading(true)
    setError(null)

    try {
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)

      // Scan the actual QR code
      const scannedData = await scanQRCode(file)

      // If we got raw data instead of structured data, show it
      if (scannedData.rawData) {
        setError(`QR-Code gelesen: ${scannedData.rawData}`)
        setQrData(null)
      } else {
        // Use the scanned data or fall back to mock data if structure doesn't match
        const processedData = {
          memberId: scannedData.memberId || 'unknown',
          firstName: scannedData.firstName || 'Unbekannt',
          lastName: scannedData.lastName || 'Benutzer',
          email: scannedData.email || 'unknown@example.com',
          coffeeQuotaLeft: scannedData.coffeeQuotaLeft || 0,
          startDate: scannedData.startDate || new Date().toISOString(),
          endDate:
            scannedData.endDate ||
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          paymentStatus: scannedData.paymentStatus || 'Pending',
          membership: scannedData.membership || 'Bronze',
        }
        setQrData(processedData)
      }
    } catch (err) {
      setError(err.message || 'Error scanning QR code')
      setQrData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckout = async () => {
    if (!qrData) return

    setIsLoading(true)
    setError(null)
    try {
      // 1. Membership aus DB holen
      const membership = await getMembershipByMemberId(qrData.memberId)
      if (!membership || !membership._id) {
        throw new Error('Membership not found')
      }
      // 2. coffeeQuotaLeft um 1 reduzieren (aber nicht < 0)
      const newQuota = Math.max(0, (membership.coffeeQuotaLeft || 0) - 1)
      // 3. Membership updaten
      await updateMembership(membership._id, { coffeeQuotaLeft: newQuota })
      // 4. Lokalen State aktualisieren
      setQrData((prev) => ({
        ...prev,
        coffeeQuotaLeft: newQuota,
      }))

      // Add the specific CoffeeShop to visitedCoffeeShops
      await addCoffeeShopToMemberList(
        qrData.memberId,
        '6873781c930a2ec016d5a015',
        'visitedCoffeeShops'
      )

      // Create a visit record with timestamp
      await createVisit(qrData.memberId, '6873781c930a2ec016d5a015', {
        wasFreeCoffee: true,
        quotaBefore: membership.coffeeQuotaLeft + 1,
        quotaAfter: newQuota,
        coffeeType: 'ESPRESSO', // You can make this dynamic based on what was ordered
      })

      setShowSuccessModal(true)
    } catch (err) {
      setError('Checkout-Fehler: ' + (err.message || err))
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getMembershipClass = (membership) => {
    switch (membership) {
      case 'Gold':
        return 'membership-badge membership-gold'
      case 'Silver':
        return 'membership-badge membership-silver'
      case 'Black':
        return 'membership-badge membership-black'
      default:
        return 'membership-badge'
    }
  }

  return (
    <div className={stylesCheckout.checkoutContainer}>
      {/* Load jsQR library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js"></script>

      <div className={stylesCheckout.checkoutWrapper}>
        {/* Header */}
        <div className={stylesCheckout.checkoutHeader}>
          <h1 className={stylesCheckout.checkoutTitle}>Checkout</h1>
          <p className={stylesCheckout.checkoutSubtitle}>Scan QR code and order coffee</p>
        </div>

        {/* Main Content Card */}
        <div className={stylesCheckout.checkoutCard}>
          {/* Upload Section */}
          <div className={stylesCheckout.uploadSection}>
            <h2 className={stylesCheckout.uploadTitle}>Upload QR Code</h2>

            <div className={stylesCheckout.uploadArea}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={stylesCheckout.uploadInput}
                id="qr-upload"
              />
              <label htmlFor="qr-upload" style={{ cursor: 'pointer' }}>
                <div className={stylesCheckout.uploadIcon}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className={stylesCheckout.uploadText}>Click here or drag a file here</p>
                <p className={stylesCheckout.uploadSubtext}>PNG, JPG or JPEG (max. 10MB)</p>
              </label>
            </div>

            {uploadedImage && (
              <div className={stylesCheckout.uploadedImageContainer}>
                <div className={stylesCheckout.uploadedImageWrapper}>
                  <img
                    src={uploadedImage}
                    alt="Uploaded QR Code"
                      className={stylesCheckout.uploadedImage}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className={stylesCheckout.loadingSection}>
              <div className={stylesCheckout.loadingContent}>
                <div className={stylesCheckout.loadingSpinner}></div>
                <p className={stylesCheckout.loadingText}>Processing QR code...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className={stylesCheckout.errorSection}>
              <div className={stylesCheckout.errorAlert}>
                <div className={stylesCheckout.errorContent}>
                  <svg
                    className={stylesCheckout.errorIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className={stylesCheckout.errorText}>{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Member Information */}
          {qrData && (
            <div className={stylesCheckout.memberSection}>
              {/* Member Details */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 className={stylesCheckout.sectionTitle}>
                  <svg
                    className={stylesCheckout.sectionIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Member Information
                </h2>

                <div className={stylesCheckout.memberGrid}>
                  <div className={stylesCheckout.memberField}>
                    <label className={stylesCheckout.fieldLabel}>Vollständiger Name</label>
                    <p className={stylesCheckout.fieldValue}>
                      {qrData.firstName} {qrData.lastName}
                    </p>
                  </div>

                  <div className={stylesCheckout.memberField}>
                    <label className={stylesCheckout.fieldLabel}>E-Mail-Adresse</label>
                    <p className={stylesCheckout.fieldValue}>{qrData.email}</p>
                  </div>

                  <div className={stylesCheckout.memberField}>
                    <label className={stylesCheckout.fieldLabel}>Mitgliedschaftstyp</label>
                    <span className={getMembershipClass(qrData.membership)}>
                      {qrData.membership}
                    </span>
                  </div>

                  <div className={stylesCheckout.memberField}>
                    <label className={stylesCheckout.fieldLabel}>Zahlungsstatus</label>
                    <div className={stylesCheckout.paymentStatus}>
                      {qrData.paymentStatus === 'Success' ? (
                        <svg
                          className={stylesCheckout.paymentIcon}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className={stylesCheckout.paymentIcon}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      <span
                        className={
                          qrData.paymentStatus === 'Success'
                            ? stylesCheckout.paymentSuccess
                            : stylesCheckout.paymentFailed
                        }
                      >
                        {qrData.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coffee Quota */}
              <div className={stylesCheckout.quotaSection}>
                <h3 className={stylesCheckout.quotaHeader}>
                  <svg
                    className={stylesCheckout.sectionIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                  Available Coffee Quota
                </h3>
                <div className={stylesCheckout.quotaContent}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={stylesCheckout.quotaNumber}>
                      {qrData.coffeeQuotaLeft}
                    </span>
                    <span className={stylesCheckout.quotaText}>
                      {qrData.coffeeQuotaLeft === 1
                        ? 'Coffee remaining'
                        : 'Coffees remaining'}
                    </span>
                  </div>
                  <div className={stylesCheckout.quotaIconWrapper}>
                    <svg
                      className={stylesCheckout.quotaIcon}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Membership Period */}
                  <div className={stylesCheckout.periodSection}>
                <h3 className={stylesCheckout.sectionTitle}>
                  <svg
                    className={stylesCheckout.sectionIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Membership Period
                </h3>
                <div className={stylesCheckout.periodGrid}>
                  <div className={stylesCheckout.periodField}>
                    <label className={stylesCheckout.periodLabel}>Start Date</label>
                    <p className={stylesCheckout.periodValue}>
                      {formatDate(qrData.startDate)}
                    </p>
                  </div>
                  <div className={stylesCheckout.periodField}>
                    <label className={stylesCheckout.periodLabel}>End Date</label>
                    <p className={stylesCheckout.periodValue}>{formatDate(qrData.endDate)}</p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className={stylesCheckout.checkoutButtonSection}>
                <button
                  onClick={handleCheckout}
                  disabled={
                    isLoading ||
                    qrData.coffeeQuotaLeft === 0 ||
                    qrData.paymentStatus !== 'Success'
                  }
                  className={`${stylesCheckout.checkoutButton} ${
                    isLoading ||
                    qrData.coffeeQuotaLeft === 0 ||
                    qrData.paymentStatus !== 'Success'
                      ? stylesCheckout.checkoutButtonDisabled
                      : stylesCheckout.checkoutButtonActive
                  }`}
                >
                  <svg
                    className={stylesCheckout.checkoutButtonIcon}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                    />
                  </svg>
                  {isLoading ? 'Processing...' : 'Order Coffee'}
                </button>

                {qrData.coffeeQuotaLeft === 0 && (
                  <p className={stylesCheckout.errorMessage}>No coffee quota available</p>
                )}

                {qrData.paymentStatus !== 'Success' && (
                      <p className={stylesCheckout.errorMessage}>
                    Payment required - Please update your payment information
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  )
}

export default CheckOut

function SuccessModal({ onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} style={{ padding: '2rem', textAlign: 'center' }}>
        <svg width="64" height="64" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24" style={{ margin: '0 auto 1rem' }}>
          <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="2" fill="#f0fdf4" />
          <path d="M9 12l2 2 4-4" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h2 style={{ color: '#16a34a', fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem' }}>Checkout erfolgreich!</h2>
        <p style={{ color: '#374151', marginBottom: '2rem' }}>CoffeeShop wurde zu deinen besuchten Cafés hinzugefügt.</p>
        <Button bg="red" fs="medium" radius="small" width="full" onClick={onClose}>Schließen</Button>
      </div>
    </div>
  )
}
