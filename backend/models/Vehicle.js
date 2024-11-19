import mongoose from 'mongoose';
const Schema = mongoose.Schema
import { Utils } from '../utils/tools.js';

// schema
const vehicleSchema = new mongoose.Schema({
  registration: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  make: {
    type: String,
    required: true    
  },
  model: {
    type: String,
    required: true
  },
  photo: {
    type: String    
  }
}, { timestamps: true })

// model
export const Vehicle = mongoose.model('Vehicle', vehicleSchema)

