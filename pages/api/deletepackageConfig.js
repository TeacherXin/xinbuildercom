import mongoose from "mongoose";
import { packageConfigSchema } from "../../Mongodb/Package/packageConfig.schema";

export default async function (req, res) {
  if(req.method === 'POST'){
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageConfigModal = defineComModel.model('packageConfig',packageConfigSchema);
    console.log(req.body._id);
    await packageConfigModal.deleteOne(({_id: req.body._id}))
    res.status(200).json({ data: {} })
  }
}