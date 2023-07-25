import { Button, Card } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Header from './Component/Header/header'

export default function Main() {
  const [packageList, setPackageList] = useState([])
  const getPackageList = async () => {
    const result = await axios.post('/api/getpackage');
    setPackageList(result.data.packageList)
  }
  useEffect(() => {
    getPackageList()
  },[])
  return (
    <div>
      <Header/>
      <div style={{marginTop: '20px'}}>
        {
          packageList.map((item) => {
            return <Card
              key={item._id}
              size="small"
              title={item.name}
              style={{
                width: 200,
              }}
            >
              <Button>查看组件</Button>
             </Card>
          })
        }
      </div>
    </div>
  )
}