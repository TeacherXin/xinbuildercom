import { packageSchema } from "../Mongodb/Package/package.schema";
import mongoose from "mongoose";

export default async function (req, res) {
  if(req.method === 'POST'){
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageModel = defineComModel.model('package',packageSchema);
    const packageList =  await packageModel.find({})
    res.status(200).json({ packageList })
  }
}