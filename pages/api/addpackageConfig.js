import mongoose from "mongoose";
import { packageConfigSchema } from "../../Mongodb/Package/packageConfig.schema";

export default async function (req, res) {
  if(req.method === 'POST'){
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageConfigModal = defineComModel.model('packageConfig',packageConfigSchema);
    await packageConfigModal.create({
      fileDirName: req.body.fileDirName,
      packageConfig: {
        attributeName: req.body.attributeName,
        attributeCode: req.body.attributeCode,
        attributeType: req.body.attributeType
      }
    })
    res.status(200).json({ data: {} })
  }
}