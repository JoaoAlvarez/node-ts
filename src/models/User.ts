import { Schema, model, Document } from 'mongoose'
import { getToken } from '../configs/jwt-configuration'
import unique from 'mongoose-unique-validator'
import crypto from 'crypto'
import 'dotenv/config'

export interface IUser extends Document{
  userName ?: string
  email?: string
  fistName?: string
  lastName?: string
  fullName(): string
  password?: string
  lastLogin?: Date
  token?: string
  salt?: string
  updatedAt?: Date
  comparePassword(password: string) : boolean
  generateToken(): IUser
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, '{PATH} da turma é um campo obrigatório'],
    min: 5,
    lowercase: true,
    unique: true,
    trim: true
  },
  userName: {
    type: String,
    required: [true, '{PATH} da turma é um campo obrigatório'],
    min: 5,
    trim: true,
    unique: true
  },
  fistName: {
    type: String,
    required: [true, '{PATH} da turma é um campo obrigatório'],
    min: 5,
    trim: true
  },
  lastName: {
    type: String,
    required: [true, '{PATH} da turma é um campo obrigatório'],
    min: 5,
    trim: true
  },
  password: { type: String, required: [true, '{PATH} da turma é um campo obrigatório'] },
  lastLogin: Date,
  salt: String,
  token: String
}, {
  timestamps: true
})

UserSchema.methods.fullName = function (): string {
  return this.fistName + ' ' + this.lastName
}

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  const hash = crypto.pbkdf2Sync(candidatePassword || '', this.salt, 10000, 512, 'sha512').toString('hex')
  return this.password === hash
}

UserSchema.methods.generateToken = async function () {
  this.lastLogin = new Date()

  const obj = {
    id: this.id,
    userName: this.userName,
    email: this.email,
    lastLogin: this.lastLogin
  }

  this.token = getToken(obj)
  await this.save()
  return this
}

UserSchema.pre<IUser>('save', function (next) {
  try {
    this.lastLogin = this.updatedAt

    const obj = {
      id: this.id,
      userName: this.userName,
      email: this.email,
      lastLogin: this.lastLogin
    }

    this.token = getToken(obj)

    if (!this.isModified('password')) return next()

    this.salt = crypto.randomBytes(Number(process.env.SALT)).toString('hex')

    const hash = crypto.pbkdf2Sync(this.password, this.salt, 10000, 512, 'sha512').toString('hex')

    this.password = hash

    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.plugin(unique, { message: '{PATH} do usuario já existente' })

export default model<IUser>('User', UserSchema)
