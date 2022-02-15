const jwt = require('jsonwebtoken')

const loggedInAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'b1n4r', (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        res.redirect('/login')
      } else {
        res.locals.user = decodedToken.email
        next()
      }
    })
  } else {
    res.locals.user = null
    res.redirect('/login')
  }

}

module.exports = loggedInAuth