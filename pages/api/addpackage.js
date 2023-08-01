import mongoose from "mongoose";
import { packageSchema } from "../../Mongodb/Package/package.schema";
export default function(req,res){
  if(req.method === 'POST'){
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageModel = defineComModel.model('package',packageSchema);
    packageModel.create({
      name: req.body.name,
      code: req.body.code,
      fileDirName: req.body.fileDirName,
      username: req.body.username
    })
    res.status(200).json({ text: 'Hello' })
  }
}