export default class InternalServerError extends Error {
  public status : number
  constructor (message?: string) {
    super(message)
    this.name = 'InternalServerError'
    this.message = message || 'Erro interno no servidor'
    this.status = 500
    this.stack = (new Error()).stack
  }
}
