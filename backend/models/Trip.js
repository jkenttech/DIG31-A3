import mongoose from 'mongoose';
const Schema = mongoose.Schema

// schema
const tripSchema = new mongoose.Schema({
  registration: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true    
  },
  finishDate: {
    type: Date,
    required: true    
  },
  startAddress: {
    type: String,
    required: true
  },
  finishAddress: {
    type: String,
    required: true
  },
  startOdometerReading: {
    type: Number,
    required: true
  },
  finishOdometerReading: {
    type: Number,
    required: true
  },
  startPhoto: {
    type: String    
  },
  finishPhoto: {
    type: String    
  }
}, { timestamps: true })

// model
export const Trip = mongoose.model('Trip', tripSchema)
