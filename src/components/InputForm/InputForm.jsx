import React from "react";
import { WrapperInputStyle } from "./style";

const InputForm = (props) => {
  const { placeholder = "Nhập text", onChange, value, ...rests } = props;

  const handleOnchangeInput = (e) => {
    if (onChange) {
      onChange(e.target.value); // Gọi hàm onChange từ props
    }
  };

  return (
    <WrapperInputStyle
      placeholder={placeholder}
      value={value}
      {...rests}
      onChange={handleOnchangeInput} // Gắn sự kiện onChange
    />
  );
};

export default InputForm;
