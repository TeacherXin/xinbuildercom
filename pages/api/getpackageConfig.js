import mongoose from "mongoose";
import { packageConfigSchema } from "../Mongodb/Package/packageConfig.schema";

export default async function (req, res) {
  if(req.method === 'POST'){
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageConfigModal = defineComModel.model('packageConfig',packageConfigSchema);
    const packageConfig = await packageConfigModal.find({fileDirName: req.body.fileDirName})
    res.status(200).json({ data:  packageConfig})
  }else if(req.method === 'GET'){
    const fileDirName = req.url.replace('/api/getpackageConfig?fileDirName=','');
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageConfigModal = defineComModel.model('packageConfig',packageConfigSchema);
    const packageConfig = await packageConfigModal.find({fileDirName: fileDirName})
    res.status(200).json({ data:  packageConfig})
  }
}