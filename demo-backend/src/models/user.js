import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import config from '../config'

const UserSchema = new mongoose.Schema({
  username: { type: String, minlength: [8, 'Username must be longer than 7 character']},
  password: { type: String, minlength: [8, 'Password must be longer than 7 character']},
  role: {
    type:     String,
    enum:     [config.consumerRole, config.providerRole],
    default:  config.consumerRole
  }
})

UserSchema.pre('save', function(next) {
  let user = this
  let saltRounds = 5

  if (!user.isModified('password')) return next()

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err)
      user.password = hash;
      next()
    })
  })
})

const User = mongoose.model('user', UserSchema)
export default User
