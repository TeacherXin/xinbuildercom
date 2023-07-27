import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from "next/router";
import  Header  from './Component/Header/header.jsx';
import { Spin } from 'antd';

export default withRouter(function ComView({ router }) {
  const [Com, setCom] = useState(null)
  const [spinning, setSpinning] = useState(true)

  const getPackageItem = async () => {
    const res = await axios.post('/api/getpackage',{
      _id: router.query._id || location.search.replace('?_id=','')
    })
    const fileDirName = res.data.packageItem?.fileDirName;
    const fileRes = await axios.post('api/getcomFile',{
      fileDirName
    })
    const fileContent = fileRes.data.fileConent?.fileConent.replaceAll('\n','').replaceAll('\r','')
    const fileCom = new Function('return '+fileContent)
    const Com = fileCom();
    setCom(<Com />);
    setSpinning(false)
  }

  useEffect(() => {
    window.React = React
  },[])
  
  useEffect(() => {
    getPackageItem()
  },[])

  return (
    <div>
      <Header hideButton={true}/>
        <div style={{marginTop:'20px',marginLeft:'20px'}}>
          <h3>组件预览：</h3>
          <Spin tip="Loading" spinning={spinning}>
            <div style={{background:'#f2f2f2',width:'600px',height:'300px',marginTop:'20px',padding:'20px'}}>
                {
                  Com ?  Com : <div>暂未找到组件</div>
                }
            </div>
          </Spin>
        </div>
    </div>
  )
})
