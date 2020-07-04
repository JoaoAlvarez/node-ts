export default class AlreadyExists extends Error {
  public status : number
  constructor (message?: string) {
    super(message)
    this.name = 'AlreadyExists'
    this.message = message || 'informação já existente'
    this.status = 409
    this.stack = (new Error()).stack
  }
}
