import React from 'react';
import { Input } from 'antd';

const { TextArea } = Input;

const InputComponent = ({ size, placeholder, bordered, style, isTextArea, ...rests }) => {
  return isTextArea ? (
    <TextArea
      size={size}
      placeholder={placeholder}
      bordered={bordered}
      style={style}
      {...rests} // Chuyển tất cả các props còn lại vào TextArea
    />
  ) : (
    <Input
      size={size}
      placeholder={placeholder}
      bordered={bordered}
      style={style}
      {...rests} // Chuyển tất cả các props còn lại vào Input
    />
  );
};

export default InputComponent;
