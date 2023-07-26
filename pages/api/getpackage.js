import { packageSchema } from "../Mongodb/Package/package.schema";
import mongoose from "mongoose";

export default async function (req, res) {
  if(req.method === 'POST'){
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageModel = defineComModel.model('package',packageSchema);
    if(req.body._id){
      const packageItem = await packageModel.findOne({_id: req.body._id});
      res.status(200).json({ packageItem })
    }else{
      const packageList = await packageModel.find({})
      res.status(200).json({ packageList })
    }
  }
}