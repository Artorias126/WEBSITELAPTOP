import React from 'react'

import {
    SearchOutlined,
    
  } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';


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
        <InputComponent
        size={size} 
        placeholder={placeholder} 
        bordered={bordered} 
        style={{backgroundColor: backgroundColorInput,borderRadius: 0, }} />
        <ButtonComponent
            size={size}
            styleButton={{
              background: backgroundColorButton,
              border: !bordered && 'none',
              borderRadius: 0
            }}
            icon={<SearchOutlined style={{ color: colorButton || '#fff' }} />}
            textButton={textButton}
            styleTextButton={{
              color: colorButton,
            }}
          />

    </div>
  )
}

export default ButtonInputSearch