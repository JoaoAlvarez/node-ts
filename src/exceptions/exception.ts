
import Unauthorized from './errors/unauthorized'
import InvalidSession from './errors/invalid-session'
import InvalidFields from './errors/invalid-fields'
import InternalServerError from './errors/internal-server-error'
import AlreadyExists from './errors/already-exists'
import InvalidCredentials from './errors/invalid-credentials'
import ResourceNotFound from './errors/resource-not-found'

const getKnownError = (error) => {
  let currentError = error
  if (!currentError || !currentError.name) { currentError = { name: 'InternalServerError' } }

  const knownErrors = {
    JsonWebTokenError: new Unauthorized(error.message),
    TokenExpiredError: new InvalidSession(error.message),
    ValidationError: new InvalidFields(error.message),
    InternalServerError: new InternalServerError(error.message),
    AlreadyExists: new AlreadyExists(error.message),
    InvalidCredentials: new InvalidCredentials(error.message),
    ResourceNotFound: new ResourceNotFound(error.message),
    Unauthorized: new Unauthorized(error.message),
    UnauthorizedError: new Unauthorized(error.message),
    InvalidSession: new InvalidSession(error.message),
    InvalidFields: new InvalidFields(error)
  }
  return knownErrors[currentError.name] || error
}

export {
  getKnownError,
  Unauthorized,
  InvalidSession,
  InvalidFields,
  InternalServerError,
  AlreadyExists,
  ResourceNotFound,
  InvalidCredentials
}
