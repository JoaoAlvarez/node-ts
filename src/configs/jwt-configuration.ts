import jwt from 'jsonwebtoken'
import expressJWT from 'express-jwt'
import 'dotenv/config'

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env

const getToken = (user) => {
  const payload = user
  // const token = jwt.sign({ resultProperty: payload, secret: JWT_SECRET, expiresIn: JWT_EXPIRATION_TIME  }
  // const options = Object.assign({}, { secret: { resultProperty: payload, secret: JWT_SECRET, expiresIn: JWT_EXPIRATION_TIME } })

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME
  })

  return token
}

const getFromToken = async (token) => {
  return jwt.decode(token)
}

const configuration = expressJWT({
  secret: JWT_SECRET,
  expiresIn: JWT_EXPIRATION_TIME
})

export { getToken, getFromToken, configuration }
