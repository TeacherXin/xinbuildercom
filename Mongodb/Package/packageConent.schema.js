import mongoose from 'mongoose'
const {Schema} = mongoose

const packageContentSchema = new Schema({
  name: String,
  fileConent: String
})

export {
  packageContentSchema
}