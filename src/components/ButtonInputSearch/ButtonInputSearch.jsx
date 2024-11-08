import React from 'react'
import { Button,Input } from 'antd'
import {
    SearchOutlined,
    
  } from '@ant-design/icons';


const ButtonInputSearch = (props) => {
    const {
        size,placeholder,textButton, 
        bordered, backgroundColorInput = '#fff',
        backgroundColorButton=`rgb(13,92,182)`,
        colorButton = `#fff`
        } 
        = props
  return (
    <div style={{display: 'flex', backgroundColor: "#fff"}}>
        <Input
        size={size} 
        placeholder={placeholder} 
        bordered={bordered} 
        style={{backgroundColor: backgroundColorInput,borderRadius: 0, }} />
        <Button 
            size={size} 
            style={{background: backgroundColorButton ,borderRadius: 0, border: !bordered && `none`}} 
            icon={<SearchOutlined style={{color: colorButton}} />}
            ><span style ={{ color: colorButton}}>{textButton}</span></Button>
    </div>
  )
}

export default ButtonInputSearch