import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { withRouter } from "next/router";
import  Header  from '../Component/Header/header.jsx';
import { Button, Modal, Spin, Input } from 'antd';

export default withRouter(function ComView({ router }) {
  const [Com, setCom] = useState(null)
  const [spinning, setSpinning] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [attributeName, setAttributeName] = useState('')
  const [attributeType, setAttributeType] = useState('')
  const [fileDirName, setFileDirName] = useState('')
  const [configList, setConfigList] = useState([])

  const getPackageItem = async () => {
    const res = await axios.post('/api/getpackage',{
      _id: router.query._id || location.search.replace('?_id=','')
    })
    const fileDirName = res.data.packageItem?.fileDirName;
    setFileDirName(fileDirName);
    getPackageConfig(fileDirName);
    const fileRes = await axios.post('api/getcomFile',{
      fileDirName
    })
    const fileContent = fileRes.data.fileConent?.fileConent.replaceAll('\n','').replaceAll('\r','')
    const fileCom = new Function('return '+fileContent)
    const Com = fileCom();
    setCom(<Com />);
    setSpinning(false);
  }

  const getPackageConfig = async (data) => {
    const res = await axios.post('/api/getpackageConfig',{
      fileDirName: data || fileDirName
    })
    if(res.data){
      const configList = res.data.data.map(item => {
        return item.packageConfig
      })
      setConfigList(configList)
    }
  }

  useEffect(() => {
    window.React = React
    window.useEffect = useEffect;
    window.useState = useState;
    window.useRef = useRef;
  },[])
  
  useEffect(() => {
    getPackageItem();
  },[])

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOk = () => {
    const res = axios.post('/api/addpackageConfig', {
      fileDirName,
      attributeName,
      attributeType
    })
    if(res){
      setIsModalOpen(false);
      setAttributeName('');
      setAttributeType('');
      getPackageConfig(fileDirName);
    }
  }

  return (
    <div>
      <Header hideButton={true}/>
      <div style={{marginTop:'20px',marginLeft:'20px', display:'flex',justifyContent:'space-evenly'}}>
        <div>
          <h3>组件预览：</h3>
          <Spin tip="Loading" spinning={spinning}>
            <div style={{background:'#f2f2f2',width:'600px',height:'300px',marginTop:'20px',padding:'20px'}}>
                {
                  Com ?  Com : <div>暂未找到组件</div>
                }
            </div>
          </Spin>
        </div>
        <div>
          <h3>属性预览：</h3>
          <Button onClick={() => {setIsModalOpen(true)}} style={{position:'absolute', right:'50px', top:'90px'}}>增加属性</Button>
          <Spin tip="Loading" spinning={spinning}>
            <div style={{background:'#f2f2f2',width:'600px',height:'300px',marginTop:'20px',padding:'20px'}}>
                {
                  configList.map(item => {
                    return <div key={item.attributeName}>
                      <div style={{height:'40px', fontSize:'16px'}}>
                        <span>属性名称：</span>
                        <span style={{marginRight:'20px',color:'gray'}}>{item.attributeName}</span>
                        <span>属性类型：</span>
                        <span style={{color:'gray'}}>{item.attributeType}</span>
                      </div>
                    </div>
                  })
                }
            </div>
          </Spin>
        </div>
      </div>
      <Modal onOk={handleOk} onCancel={handleCancel} closable={false} open={isModalOpen}>
        <div style={{height: '50px'}}>
          属性名称：
          <Input value={attributeName} onChange={(e) => {setAttributeName(e.target.value)}} style={{width:'200px'}} />
        </div>
        <div>
          属性类型：
          <Input value={attributeType} onChange={(e) => {setAttributeType(e.target.value)}} style={{width:'200px'}} />
        </div>
      </Modal>
    </div>
  )
})
