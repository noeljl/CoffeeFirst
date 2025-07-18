import React, { useState } from 'react'
import jsQR from 'jsqr'
import {
  getMembershipByMemberId,
  updateMembership,
} from '../../apis/membership'
import { addCoffeeShopToMemberList } from '../../apis/member'
import { useSelector } from 'react-redux'

const CheckOut = () => {
  const [qrData, setQrData] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

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
          reject(new Error('Kein QR-Code im Bild gefunden'))
        }
      }

      img.onerror = () => {
        reject(new Error('Fehler beim Laden des Bildes'))
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
      setError(err.message || 'Fehler beim Scannen des QR-Codes')
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
        throw new Error('Mitgliedschaft nicht gefunden')
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
      alert('CoffeeShop wurde zu deinen besuchten Cafés hinzugefügt!')

      alert('Checkout erfolgreich!')
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
      case 'Bronze':
        return 'membership-badge membership-bronze'
      default:
        return 'membership-badge'
    }
  }

  return (
    <div className="checkout-container">
      {/* Load jsQR library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js"></script>

      <div className="checkout-wrapper">
        {/* Header */}
        <div className="checkout-header">
          <h1 className="checkout-title">Checkout</h1>
          <p className="checkout-subtitle">
            QR-Code scannen und Kaffee bestellen
          </p>
        </div>

        {/* Main Content Card */}
        <div className="checkout-card">
          {/* Upload Section */}
          <div className="upload-section">
            <h2 className="upload-title">QR-Code hochladen</h2>

            <div className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-input"
                id="qr-upload"
              />
              <label htmlFor="qr-upload" style={{ cursor: 'pointer' }}>
                <div className="upload-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="upload-text">
                  Klicken Sie hier oder ziehen Sie eine Datei hierher
                </p>
                <p className="upload-subtext">PNG, JPG oder JPEG (max. 10MB)</p>
              </label>
            </div>

            {uploadedImage && (
              <div className="uploaded-image-container">
                <div className="uploaded-image-wrapper">
                  <img
                    src={uploadedImage}
                    alt="Uploaded QR Code"
                    className="uploaded-image"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="loading-section">
              <div className="loading-content">
                <div className="loading-spinner"></div>
                <p className="loading-text">QR-Code wird verarbeitet...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="error-section">
              <div className="error-alert">
                <div className="error-content">
                  <svg
                    className="error-icon"
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
                  <p className="error-text">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Member Information */}
          {qrData && (
            <div className="member-section">
              {/* Member Details */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 className="section-title">
                  <svg
                    className="section-icon"
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
                  Mitgliedsinformationen
                </h2>

                <div className="member-grid">
                  <div className="member-field">
                    <label className="field-label">Vollständiger Name</label>
                    <p className="field-value">
                      {qrData.firstName} {qrData.lastName}
                    </p>
                  </div>

                  <div className="member-field">
                    <label className="field-label">E-Mail-Adresse</label>
                    <p className="field-value">{qrData.email}</p>
                  </div>

                  <div className="member-field">
                    <label className="field-label">Mitgliedschaftstyp</label>
                    <span className={getMembershipClass(qrData.membership)}>
                      {qrData.membership}
                    </span>
                  </div>

                  <div className="member-field">
                    <label className="field-label">Zahlungsstatus</label>
                    <div className="payment-status">
                      {qrData.paymentStatus === 'Success' ? (
                        <svg
                          className="payment-icon payment-success"
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
                          className="payment-icon payment-failed"
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
                            ? 'payment-success'
                            : 'payment-failed'
                        }
                      >
                        {qrData.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coffee Quota */}
              <div className="quota-section">
                <h3 className="quota-header">
                  <svg
                    className="section-icon"
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
                  Verfügbares Kaffee-Kontingent
                </h3>
                <div className="quota-content">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="quota-number">
                      {qrData.coffeeQuotaLeft}
                    </span>
                    <span className="quota-text">
                      {qrData.coffeeQuotaLeft === 1
                        ? 'Kaffee verbleibend'
                        : 'Kaffees verbleibend'}
                    </span>
                  </div>
                  <div className="quota-icon-wrapper">
                    <svg
                      className="quota-icon"
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
              <div className="period-section">
                <h3 className="section-title">
                  <svg
                    className="section-icon"
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
                  Mitgliedschaftszeitraum
                </h3>
                <div className="period-grid">
                  <div className="period-field">
                    <label className="period-label">Startdatum</label>
                    <p className="period-value">
                      {formatDate(qrData.startDate)}
                    </p>
                  </div>
                  <div className="period-field">
                    <label className="period-label">Enddatum</label>
                    <p className="period-value">{formatDate(qrData.endDate)}</p>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="checkout-button-section">
                <button
                  onClick={handleCheckout}
                  disabled={
                    isLoading ||
                    qrData.coffeeQuotaLeft === 0 ||
                    qrData.paymentStatus !== 'Success'
                  }
                  className={`checkout-button ${
                    isLoading ||
                    qrData.coffeeQuotaLeft === 0 ||
                    qrData.paymentStatus !== 'Success'
                      ? 'checkout-button-disabled'
                      : 'checkout-button-active'
                  }`}
                >
                  <svg
                    className="checkout-button-icon"
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
                  {isLoading ? 'Wird verarbeitet...' : 'Kaffee bestellen'}
                </button>

                {qrData.coffeeQuotaLeft === 0 && (
                  <p className="error-message">
                    Kein Kaffee-Kontingent mehr verfügbar
                  </p>
                )}

                {qrData.paymentStatus !== 'Success' && (
                  <p className="error-message">
                    Zahlung erforderlich - Bitte aktualisieren Sie Ihre
                    Zahlungsinformationen
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .checkout-container {
          min-height: 100vh;
          background-color: #f9fafb;
          padding: 2rem 1rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            sans-serif;
        }

        .checkout-wrapper {
          max-width: 64rem;
          margin: 0 auto;
        }

        .checkout-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .checkout-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .checkout-subtitle {
          color: #6b7280;
          font-size: 1rem;
        }

        .checkout-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          overflow: hidden;
        }

        .upload-section {
          padding: 2rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .upload-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 1.5rem;
        }

        .upload-area {
          border: 2px dashed #d1d5db;
          border-radius: 0.75rem;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }

        .upload-area:hover {
          border-color: #dc2626;
        }

        .upload-input {
          display: none;
        }

        .upload-icon {
          width: 4rem;
          height: 4rem;
          background-color: #f3f4f6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          transition: background-color 0.2s ease;
        }

        .upload-icon:hover {
          background-color: #e5e7eb;
        }

        .upload-icon svg {
          width: 2rem;
          height: 2rem;
          color: #9ca3af;
        }

        .upload-text {
          font-size: 1.125rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.25rem;
        }

        .upload-subtext {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .uploaded-image-container {
          margin-top: 1.5rem;
          text-align: center;
        }

        .uploaded-image-wrapper {
          display: inline-block;
          padding: 0.5rem;
          background-color: #f9fafb;
          border-radius: 0.5rem;
        }

        .uploaded-image {
          max-width: 12rem;
          max-height: 12rem;
          object-fit: contain;
          border-radius: 0.5rem;
        }

        .loading-section {
          padding: 2rem;
          text-align: center;
          border-bottom: 1px solid #f3f4f6;
        }

        .loading-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }

        .loading-spinner {
          width: 2rem;
          height: 2rem;
          border: 2px solid #dc2626;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          color: #6b7280;
          font-weight: 500;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .error-section {
          padding: 2rem;
          border-bottom: 1px solid #f3f4f6;
        }

        .error-alert {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .error-content {
          display: flex;
          align-items: center;
        }

        .error-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #dc2626;
          margin-right: 0.75rem;
        }

        .error-text {
          color: #b91c1c;
          font-weight: 500;
        }

        .member-section {
          padding: 2rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
        }

        .section-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #6b7280;
          margin-right: 0.5rem;
        }

        .member-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .member-field {
          background-color: #f9fafb;
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .field-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .field-value {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
        }

        .membership-badge {
          display: inline-flex;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid;
        }

        .membership-gold {
          background-color: #fef3c7;
          color: #92400e;
          border-color: #fde68a;
        }

        .membership-silver {
          background-color: #f3f4f6;
          color: #374151;
          border-color: #e5e7eb;
        }

        .membership-bronze {
          background-color: #fed7aa;
          color: #c2410c;
          border-color: #fdba74;
        }

        .payment-status {
          display: flex;
          align-items: center;
        }

        .payment-icon {
          width: 1.25rem;
          height: 1.25rem;
          margin-right: 0.5rem;
        }

        .payment-success {
          color: #16a34a;
        }

        .payment-failed {
          color: #dc2626;
        }

        .quota-section {
          background: linear-gradient(135deg, #fefbf3 0%, #fef3c7 100%);
          border: 1px solid #fde68a;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .quota-header {
          font-size: 1.125rem;
          font-weight: 600;
          color: #92400e;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
        }

        .quota-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .quota-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #92400e;
          margin-right: 0.5rem;
        }

        .quota-text {
          color: #a16207;
          font-weight: 500;
        }

        .quota-icon-wrapper {
          width: 4rem;
          height: 4rem;
          background-color: #fef3c7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quota-icon {
          width: 2rem;
          height: 2rem;
          color: #d97706;
        }

        .period-section {
          margin-bottom: 2rem;
        }

        .period-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .period-field {
          background-color: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 0.5rem;
          padding: 1rem;
        }

        .period-label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #1d4ed8;
          margin-bottom: 0.25rem;
        }

        .period-value {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1e3a8a;
        }

        .checkout-button-section {
          text-align: center;
          padding-top: 1rem;
        }

        .checkout-button {
          display: inline-flex;
          align-items: center;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .checkout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .checkout-button-active {
          background-color: #dc2626;
          color: white;
        }

        .checkout-button-active:hover {
          background-color: #b91c1c;
        }

        .checkout-button-disabled {
          background-color: #d1d5db;
          color: #6b7280;
          cursor: not-allowed;
        }

        .checkout-button-disabled:hover {
          transform: none;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .checkout-button-icon {
          width: 1.5rem;
          height: 1.5rem;
          margin-right: 0.5rem;
        }

        .error-message {
          color: #dc2626;
          font-weight: 500;
          margin-top: 0.75rem;
        }

        @media (max-width: 768px) {
          .checkout-container {
            padding: 1rem;
          }

          .member-grid {
            grid-template-columns: 1fr;
          }

          .period-grid {
            grid-template-columns: 1fr;
          }

          .quota-content {
            flex-direction: column;
            gap: 1rem;
          }

          .checkout-button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default CheckOut
