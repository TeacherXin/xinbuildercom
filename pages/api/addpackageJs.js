import fs from 'fs'
import path from 'path'

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
    fs.writeFile(path.resolve(`C:\\Myself\\React-cli\\xinbuildercom\\assets\\defineCom\\${hashName}_${filename}`),content,(err) => {
      if(err){
        console.log(err);
      }
    })
    res.status(200).json({ 
      filename: `${hashName}_${filename}`
    })
  }
}