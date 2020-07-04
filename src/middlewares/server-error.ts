import { getKnownError } from '../exceptions/exception'

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => {
  const error = getKnownError(err)
  return res.status(error.status || 500).json({
    name: error.name,
    message: error.message,
    status: error.status
  })
}
