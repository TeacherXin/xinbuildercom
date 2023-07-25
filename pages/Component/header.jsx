import styles from './header.module.css'
import { Button } from 'antd'
import axios from 'axios'

export default function Header() {
  const {header, title, button} = styles
  const addPackage = () => {
    axios.post('/api/addpackage',{
      name: '123',
      code: '123'
    })
  }
  return (
    <div className={header}>
      <h2 className={title}>XinBuilder-Com基于React实现自定义组件</h2>
      <Button onClick={addPackage} className={button}>新建组件包</Button>
    </div>
  )
}
