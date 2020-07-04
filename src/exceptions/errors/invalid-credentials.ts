export default class InvalidCredentials extends Error {
  public status : number
  constructor (message?: string) {
    super(message)
    this.name = 'InvalidCredentials'
    this.message = message || 'Usuário e/ou senha inválidos'
    this.status = 401
    this.stack = (new Error()).stack
  }
}
