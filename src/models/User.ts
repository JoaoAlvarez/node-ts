import { Schema, model, Document } from 'mongoose'

interface UserInterface extends Document{
  email?: string
  fistName?: string
  lastName?: string
  fullName(): string
  password?: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    min: 5,
    lowercase: true,
    unique: true,
    trim: true
  },
  fistName: {
    type: String,
    required: true,
    min: 5,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    min: 5,
    trim: true
  },
  password: { type: String, required: true }
}, {
  timestamps: true
})

UserSchema.methods.fullName = function (): string {
  return this.fistName + ' ' + this.lastName
}

export default model<UserInterface>('User', UserSchema)
