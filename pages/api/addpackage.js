// import mongoose from "mongoose";
// import { packageSchema } from "../Mongodb/Package/package.schema";
export default function(req,res){
  if(req.method === 'POST'){
    console.log(req.body);
    res.status(200).json({ text: 'Hello' })
  }
}