import mongoose from 'mongoose';
const Schema = mongoose.Schema
import { Utils } from '../utils.js';
const _utils = new Utils();

// schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true    
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String    
  }
}, { timestamps: true })

// encrypt password field on save
userSchema.pre('save', function(next) {
  // check if password is present and is modifed  
  if( this.password && this.isModified() ){
      this.password = _utils.hashPassword(this.password);
  }
  next()
})

// model
export const User = mongoose.model('User', userSchema)

