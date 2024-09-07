import { query } from '../db/index.js'
import QRCode from 'qrcode'
import nodemailer from 'nodemailer'

import dotenv from 'dotenv'
dotenv.config()

class QRCodeModel {
  /**
   * Generiert einen QR-Code und sendet ihn per E-Mail
   * @param  {Number} eventID   [ID des Events]
   * @param  {String} eventToken [Der Token, der im QR-Code enthalten ist]
   * @return {String}            [Der QR-Code als Bild (Data URL)]
   */
  async generateQRCode(eventID, eventToken) {
    try {
      // QR-Code Inhalt (Token und event_id als URL verpacken) #fromQR weist auf weitere Seite
      const qrContent = `http://localhost:3000/event/${eventID}/?token=${encodeURIComponent(
        eventToken
      )}&fromQr=true`

      // Generiere den QR-Code als Data URL (Bild)
      const qrCodeDataURL = await QRCode.toDataURL(qrContent)

      // Sende den QR-Code per E-Mail
      await this.sendQRCodeEmail(qrCodeDataURL, eventID)

      return qrCodeDataURL
    } catch (err) {
      throw new Error('Fehler beim Generieren des QR-Codes: ' + err)
    }
  }

  async findOneByEventIdAndToken(event_id, token) {
    try {
      // SQL-Abfrage: Finde ein Event basierend auf event_id und token
      const result = await query(
        `SELECT * FROM events WHERE event_id = $1 AND event_token = $2`,
        [event_id, token]
      )

      // Wenn ein Event gefunden wird, gib es zurück, sonst null
      return result.rows.length ? result.rows[0] : null
    } catch (err) {
      throw new Error('Fehler bei der Datenbankabfrage: ' + err)
    }
  }

  /**
   * Sendet den QR-Code per E-Mail an den Empfänger, der in der Umgebungsvariable gespeichert ist
   * @param  {String} qrCodeDataURL [Der QR-Code als Data URL (Bild)]
   * @param  {Number} eventID       [ID des Events]
   */
  async sendQRCodeEmail(qrCodeDataURL, eventID) {
    try {
      const receiverEmail = process.env.QR_CODE_RECEIVER_MAIL

      if (!receiverEmail) {
        throw new Error(
          'QR_CODE_RECEIVER_MAIL ist nicht in der Umgebungsvariable definiert'
        )
      }

      const transporter = nodemailer.createTransport({
        service: 'gmail', // Ersetze dies durch deinen E-Mail-Dienst (Gmail, SMTP, etc.)
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: receiverEmail,
        subject: `QR-Code für Event ID: ${eventID}`,
        html: `<h3>Hier ist der QR-Code für das Event:</h3>
         <p>Bitte sehen Sie den QR-Code im Anhang.</p>`,
        attachments: [
          {
            filename: 'qrcode.png',
            content: qrCodeDataURL.split('base64,')[1],
            encoding: 'base64',
          },
        ],
      }

      // E-Mail senden
      await transporter.sendMail(mailOptions)
      console.log('QR-Code E-Mail erfolgreich gesendet an ' + receiverEmail)
    } catch (err) {
      throw new Error('Fehler beim Senden der QR-Code E-Mail: ' + err)
    }
  }
}

export default QRCodeModel
