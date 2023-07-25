import mongoose from 'mongoose'
const {Schema} = mongoose

const packageSchema = new Schema({
  name: String,
  code: String
})

export {
  packageSchema
}