module.exports = async function requireLogin(req, res, next) {
  // TODO: come back to verify
  if (req.isAuthenticated()) {
    next()
  } else {
    res.status(401).json({
      errors: [{ title: 'Login required', status: 401 }]
    })
  }
}
