import React, { useState, useRef, useImperativeHandle } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import axios from 'axios';
const UploadCom = React.forwardRef((props,ref) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('xinbuilderCom', file);
    });
    setUploading(true);
    // You can use any AJAX library you like
    const result = await axios.post('/api/addpackageJs', 
      formData
    )
    return result
  };

  useImperativeHandle(ref,() => (
    {
      handleUpload
    }  
  ))
  const propsData = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };
  return (
    <>
      <Upload maxCount={1} {...propsData}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </>
  );
});

UploadCom.displayName = UploadCom
export default UploadCom;