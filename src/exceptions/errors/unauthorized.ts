export default class Unauthorized extends Error {
  public status : number
  constructor (message?: string) {
    super(message)
    if (message === 'jwt expired') {
      message = 'Sessão expirada'
    }
    this.name = 'Unauthorized'
    this.message = message || 'Não autorizado'
    this.status = 401
    this.stack = (new Error()).stack
  }
}
