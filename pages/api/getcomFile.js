import mongoose from "mongoose"
import {packageContentSchema} from '../Mongodb/Package/packageConent.schema'

export default async function (req, res) {
  if(req.method === 'POST'){
    const fileDirName = req.body.fileDirName;
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageConentModel = defineComModel.model('packageConent',packageContentSchema)
    const fileConent = await packageConentModel.findOne({name: fileDirName})
    res.status(200).json({ fileConent })
  }
}