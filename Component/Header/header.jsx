import styles from './header.module.css'
import { Button,Modal,Form,Input, message } from 'antd'
import axios from 'axios'
import UploadCom from '../UpLoad/index.js'
import { useRef, useState } from 'react'
import Router from 'next/router'

export default function Header(props) {
  const {header, title, button} = styles
  const [showModal,setShowModal] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileCode, setFileCode] = useState('')
  const uploadRef = useRef()
  const {getPackageList} = props

  const handleOk = async () => {
    const result = await uploadRef.current.handleUpload();
    if(result.data){
      const fileDirName = result.data.filename
      axios.post('/api/addpackage',{
        name: fileName,
        code: fileCode,
        fileDirName,
        username: JSON.parse(localStorage.getItem('user')).username
      })
      .then(res => {
        message.success('新建成功')
        setShowModal(false)
        getPackageList()
      })
      .catch(err => {
        message.error('新建失败')
      })
    }
    setFileName('')
    setFileCode('')
  }

  const handleCancel = () => {
    setFileName('')
    setFileCode('')
    setShowModal(false)
  }

  const refeshLogin = () => {
    localStorage.removeItem('user');
    Router.push('/login')
  }

  return (
    <div className={header}>
      <h2 className={title}>XinBuilder-Com基于React实现自定义组件</h2>
      <Button onClick={refeshLogin} className={button} style={{display: props.hideButton ? 'none' : 'block'}}>退出登录</Button>
      <Button onClick={() => {setShowModal(true)}} className={button} style={{display: props.hideButton ? 'none' : 'block'}}>新建组件</Button>
      <Modal closable={false} title="上传组件" open={showModal} onOk={handleOk} onCancel={handleCancel}>
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item
            label="编码"
          >
            <Input value={fileCode} onChange={(e) => {setFileCode(e.target.value)}}/>
          </Form.Item>
          <Form.Item
            label="名称"
          >
            <Input value={fileName} onChange={(e) => {setFileName(e.target.value)}}/>
          </Form.Item>
          <Form.Item
            label="脚本"
          >
            <UploadCom ref={uploadRef}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
