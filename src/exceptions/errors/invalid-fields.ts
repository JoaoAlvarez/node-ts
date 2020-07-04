/* eslint-disable no-restricted-syntax */
const getError = (message) => {
  let errorKey
  if (message && message.errors) { for (errorKey in message.errors); }

  if (errorKey) { return message.errors[errorKey].message }
  return message || 'Campos inválidos'
}
export default class InvalidFields extends Error {
  public status : number
  constructor (message?: string) {
    super(message)
    this.name = 'InvalidFields'
    this.message = getError(message)
    this.status = 400
    this.stack = (new Error()).stack
  }
}
