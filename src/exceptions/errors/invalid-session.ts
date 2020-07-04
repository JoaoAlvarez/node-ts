export default class InvalidSession extends Error {
  public status : number
  constructor (message?: string) {
    super(message)
    this.name = 'InvalidSession'
    this.message = message || 'Sessão inválida'
    this.status = 401
    this.stack = (new Error()).stack
  }
}
