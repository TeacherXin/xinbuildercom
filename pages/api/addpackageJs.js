import mongoose from "mongoose"
import { packageContentSchema } from '../Mongodb/Package/packageConent.schema.js'

const startTag = 'text/javascript'
const endTag = '------'
const startFilenameTag= 'filename'
const endFilenameTag = 'Content-Type'
const startHashTag = '------'
const endHashTag = 'Content-Disposition'
export default async function(req, res){
  if(req.method === 'POST'){
    //获取哈希值
    let content = req.body.toString()
    const hashStartIndex = content.indexOf(startHashTag)
    const hashEndIndex = content.indexOf(endHashTag)
    const hashName = content.slice(hashStartIndex + startHashTag.length,hashEndIndex - 2)
    // //获取文件名
    const filenameStartIndex = content.indexOf(startFilenameTag)
    const filenameEndIndex = content.indexOf(endFilenameTag)
    const filename = content.slice(filenameStartIndex + startFilenameTag.length + 2,filenameEndIndex - 3)
    // //获取文件内容
    let index = content.indexOf(startTag)
    content = content.slice(index + startTag.length + 1)
    index = content.indexOf(endTag)
    content = content.slice(0,index)
    // 组件入库
    const defineComModel = mongoose.createConnection('mongodb://127.0.0.1/defineCom');
    const packageConentModel = defineComModel.model('packageConent',packageContentSchema)
    packageConentModel.create({
      name: `${hashName}_${filename}`,
      fileConent: content
    })
    res.status(200).json({ 
      filename: `${hashName}_${filename}`
    })
  }
}