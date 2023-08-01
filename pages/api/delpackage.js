import mongoose from "mongoose";
import { packageSchema } from "../../Mongodb/Package/package.schema";
import {packageContentSchema} from '../../Mongodb/Package/packageConent.schema'

export default async function(req,res){
  if(req.method === 'POST'){
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageModel = defineComModel.model('package',packageSchema);
    const packageConentModel = defineComModel.model('packageConent',packageContentSchema)
    await packageModel.deleteOne({_id: req.body._id})
    await packageConentModel.deleteOne({name: req.body.fileDirName})
    res.status(200).json({ text: 'Hello' })
  }
}