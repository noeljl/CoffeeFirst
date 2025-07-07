export default function requireAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next()
  }
  res.status(401).json({ error: 'Nicht eingeloggt' })
}
