import bodyParser from 'body-parser'
import cors from 'cors'
import session from 'express-session' // npm install express-session
import { SESSION_SECRET } from '../config.js'

const expressLoader = (app) => {
  // Aktiviert Cors. CORS ist ein Sicherheitsfeature moderner Browser,
  // das standardmäßig verhindert, dass Webanwendungen HTTP-Anfragen
  // an eine andere Domain als die eigene senden.
  // Dies bedeutet, dass, wenn eine Webanwendung, die auf http://example.com läuft,
  // versucht, eine Ressource von http://api.example.com oder http://anotherdomain.com
  // abzurufen, der Browser diese Anfragen blockiert, wenn CORS nicht korrekt konfiguriert ist.
  // Es werden nur Anfragen von spezifischen Domains akzeptiert
  const corsOptions = {
    origin: 'https://www.rotaract-district-1866.de',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Füge OPTIONS hinzu
    credentials: true,
  }

  app.use(cors(corsOptions))

  // Transformiert einen String zu einem JSON String, damit weiterverarbeitet werden kann
  app.use(bodyParser.json())

  // Die in den Anfragen übergebenen Strings werden geparst.
  // Gibt jemand in einer Anfrage einen /?name=Laurens an, dann wird der Parameter in
  // {
  // name: Laurens
  // } geparst
  app.use(bodyParser.urlencoded({ extended: true }))

  // Um Express-Server mitzuteilen, dass er sich hinter einem vertrauenswürdigen Reverse-Proxy (wie z.B. Nginx, HAProxy oder einem Load Balancer)
  // befindet. Dies hat Auswirkungen darauf, wie die Anwendung bestimmte Informationen, die durch den Proxy weitergeleitet werden, verarbeitet,
  // insbesondere die IP-Adresse des Clients.
  // Der Reverse Proxy leitet dann Anfragen an den Client in Form von HTML-Daten weiter
  // und kann Anfragen entgegennehmen. Daher muss diesem vertraut werden
  app.set('trust proxy', 1)

  // Erstellt eine Session für State Management
  app.use(
    session({
      // Zum Identifizieren des Nutzers. Dies verhindert, dass jemand die Sitzung manipuliert.
      secret: SESSION_SECRET,
      // Wenn resave auf false gesetzt ist, wird die Sitzung nur dann erneut gespeichert, wenn sie tatsächlich verändert wurde. Dies verhindert unnötige Speicheroperationen und verbessert die Effizienz.
      resave: false,
      // Wenn saveUninitialized auf false gesetzt ist, werden Sitzungen, die nicht verändert wurden, nicht gespeichert. Dies ist nützlich, um unnötige Sitzungseinträge in der Datenbank oder im Speicher zu vermeiden
      saveUninitialized: false,
      cookie: {
        // Die secure-Option legt fest, ob das Cookie nur über HTTPS gesendet werden soll. Wenn secure: false gesetzt ist, wird das Cookie auch über HTTP gesendet.
        secure: true, // Sobald SSL aktiviert ist, sollte secure auf true gesetzt werden
        // maxAge gibt die Lebensdauer des Sitzungscookies in Millisekunden an. In diesem Fall ist das Cookie 24 Stunden gültig (24 Stunden * 60 Minuten * 60 Sekunden * 1000 Millisekunden).
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  )

  return app
}

export default expressLoader
