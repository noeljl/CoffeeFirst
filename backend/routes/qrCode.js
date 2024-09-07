import express from 'express'
import QRCodeService from '../services/QRCodeService.js'

const router = express.Router()
const QRCodeServiceInstance = new QRCodeService()

export default (app) => {
  app.use('/api/QRCode', router)

  // QR-Code Validierungs-Endpoint
  router.post('/validateQRCode', async (req, res, next) => {
    try {
      const { event_id, token } = req.body

      console.log(`QR-Code Validation - Event ID: ${event_id}, Token: ${token}`)

      // Verwende den EventService, um die Validierung durchzuführen
      const isValid = await QRCodeServiceInstance.validateQRCode(
        event_id,
        token
      )

      // Falls der QR-Code gültig ist, gib den Erfolg zurück
      if (isValid) {
        res
          .status(200)
          .send({ valid: true, message: 'QR-Code erfolgreich validiert' })
      } else {
        res.status(400).send({ valid: false, message: 'Ungültiger QR-Code' })
      }
    } catch (err) {
      next(err)
    }
  })
}
