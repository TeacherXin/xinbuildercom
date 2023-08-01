import { packageSchema } from "../../Mongodb/Package/package.schema";
import mongoose from "mongoose";

export default async function (req, res) {
  const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
  const packageModel = defineComModel.model('package',packageSchema);
  if(req.method === 'POST'){
    if(req.body._id){
      const packageItem = await packageModel.findOne({_id: req.body._id});
      res.status(200).json({ packageItem })
    }else{
      const packageList = await packageModel.find({})
      res.status(200).json({ packageList })
    }
  }else if(req.method === 'GET'){
    const code = req.url.replace('/api/getpackage?code=','');
    if(code === '/api/getpackage'){
      const packageList = await packageModel.find({})
      res.setHeader("Access-Control-Allow-Origin","*");
      res.status(200).json({ packageList })
    }else if(code){
      const packageList = await packageModel.findOne({code})
      res.setHeader("Access-Control-Allow-Origin","*");
      res.status(200).json({ packageList })
    }
  }
}