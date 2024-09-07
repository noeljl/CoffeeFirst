import createError from 'http-errors'
import QRCodeModel from '../models/qrCode.js'

const QRCodeModelInstance = new QRCodeModel()

export default class QRCodeService {
  // QR-Code Validierung
  async validateQRCode(event_id, token) {
    try {
      console.log(`services/QRCodeService QR-Code Validation - Event ID: ${event_id}, Token: ${token}`)

      // Prüfe, ob der QR-Code (Token) für das Event in der Datenbank existiert
      const event = await QRCodeModelInstance.findOneByEventIdAndToken(event_id, token)

      // Wenn das Event nicht existiert oder der Token falsch ist, Fehler werfen
      if (!event) {
        throw createError(400, 'Ungültiger QR-Code')
      }

      // QR-Code erfolgreich validiert
      return true
    } catch (err) {
      throw createError(500, err)
    }
  }
}