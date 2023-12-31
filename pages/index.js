import { Button, Card, message } from 'antd'
import axios from 'axios'
import React, { useEffect, useState, useRef } from 'react'
import Header from '../Component/Header/header'
import Router from "next/router"
import { DeleteOutlined } from '@ant-design/icons';

export default function Main() {
  const [packageList, setPackageList] = useState([])
  const getPackageList = async () => {
    const result = await axios.post('/api/getpackage');
    setPackageList(result.data.packageList)
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user){
      axios.post(`http://${window.location.hostname}:80/login/getUser`,{
        username: user.username,
        password: user.password
      }).then(res => {
        if(res.data.data){
          getPackageList();
        }else{
          Router.push({pathname: '/login'})
        }
      })
    }
  },[])

  useEffect(() => {
    window.React = React
    window.useEffect = useEffect;
    window.useState = useState;
    window.useRef = useRef;
  },[])

  const toComView = (item) => {
    return () => {
      Router.push({pathname: '/comView', query: {_id: item._id}})
    }
  }

  const delPackge = (item) => {
    return () => {
      axios.post('/api/delpackage',{
        _id: item._id,
        fileDirName: item.fileDirName
      })
      .then(res => {
        message.success('删除成功')
        getPackageList()
      })
      .catch(err => {
        message.error(err)
      })
    }
  }

  return (
    <div>
      <Header getPackageList={getPackageList}/>
      <div style={{marginTop: '20px', marginLeft: '20px',display:'flex',flexWrap:'wrap'}}>
        {
          packageList.map((item) => {
            return <Card
              key={item._id}
              title={<div><span>{item.name}</span><DeleteOutlined onClick={delPackge(item)} style={{float:'right'}}/></div>}
              style={{
                width: 250,
                marginLeft: '10px',
                marginTop:'10px'
              }}
            >
              <Button onClick={toComView(item)} type='text'>查看组件</Button>
              <Button type='text'>设计组件</Button>
             </Card>
          })
        }
      </div>
    </div>
  )
}