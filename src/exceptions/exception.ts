
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
    JsonWebTokenError: new Unauthorized(error),
    TokenExpiredError: new InvalidSession(error),
    ValidationError: new InvalidFields(error),
    InternalServerError: new InternalServerError(error),
    AlreadyExists: new AlreadyExists(error),
    InvalidCredentials: new InvalidCredentials(error),
    ResourceNotFound: new ResourceNotFound(error),
    Unauthorized: new Unauthorized(error),
    InvalidSession: new InvalidSession(error),
    InvalidFields: new InvalidFields(error)
  }
  return knownErrors[currentError] || error
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
