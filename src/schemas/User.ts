import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document{
  email?: string
  fistName?: string
  lastName?: string
  fullName(): string
}

const UserSchema = new Schema({
  email: String,
  fistName: String,
  lastName: String
}, {
  timestamps: true
})

UserSchema.methods.fullName = function (): string {
  return this.fistName + ' ' + this.lastName
}

export default model<UserInterface>('User', UserSchema)
