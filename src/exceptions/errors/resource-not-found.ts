export default class ResourceNotFound extends Error {
  public status : number
  constructor (message?: string) {
    super(message)

    this.name = 'ResourceNotFound'
    this.message = message || 'Não encontrado'
    this.status = 404
    this.stack = (new Error()).stack
  }
}
