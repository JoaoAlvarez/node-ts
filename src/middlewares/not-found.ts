import { ResourceNotFound } from '../exceptions/exception'

export default (req, res, next) => next(new ResourceNotFound())
