import mongoose from 'mongoose'
const {Schema} = mongoose

const packageConfigSchema = new Schema({
  fileDirName: String,
  packageConfig: {
    attributeName: String,
    attributeType: String,
    attributeCode: String
  }
})

export {
  packageConfigSchema
}