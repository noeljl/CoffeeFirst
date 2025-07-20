import styles from '../styles/CheckInModal.module.css'
import { useDispatch } from 'react-redux'
// Corrected import: Use named export QRCodeCanvas
import { QRCodeCanvas } from 'qrcode.react'
import useDisableScrolling from '../../hooks/useDisableScrolling'

export default function CheckInModal({
  onClose,
  firstName,
  lastName,
  profilePicture,
  getCurrentImageSrc,
  membershipName,
  qrCodeContent,
}) {
  useDisableScrolling(true)
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.memberCard}>
          <div className={styles.memberAvatar}>
            <img
              src={getCurrentImageSrc()}
              alt="Profilbild"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              onError={(e) => {
                console.log('Image failed to load:', e.target.src)
                e.target.src =
                  'http://localhost:3001/profileImages/example_picture.jpeg'
              }}
            />
          </div>

          <h2 className={styles.memberCardTitle}>Member card from</h2>
          <h3 className={styles.memberName}>
            {firstName} {lastName}
          </h3>
          <p className={styles.memberStatus}>{membershipName} Member</p>

          <p className={styles.memberInstructions}>
            Please show your member card at the
            <br />
            store to get your coffee.
          </p>

          <div className={styles.qrCode}>
            {qrCodeContent ? (
              // Use QRCodeCanvas instead of QRCode
              <QRCodeCanvas
                value={qrCodeContent}
                size={200} // Adjust size as needed
                level="H" // Error correction level (L, M, Q, H)
                includeMargin={false}
              />
            ) : (
              <div className={styles.qrPlaceholder}>
                <div className={styles.qrPattern}></div>
                <p>Loading QR Code...</p>
              </div>
            )}
          </div>

          <button className={styles.doneButton} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  )
}