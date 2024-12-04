import React from "react";

const ButtonComponent = ({ 
  size, 
  styleButton = {}, 
  styleTextButton = {}, 
  textButton, 
  disabled = false, 
  ...rests 
}) => {
  return (
    <button
      style={{
        ...styleButton,
        background: disabled ? "#ccc" : styleButton.background, // Đổi màu nền nếu nút bị vô hiệu hóa
        cursor: disabled ? "not-allowed" : "pointer", // Đổi con trỏ khi bị vô hiệu hóa
        fontSize: size ? `${size}px` : "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      disabled={disabled}
      {...rests}
    >
      <span style={styleTextButton}>{textButton}</span>
    </button>
  );
};

export default ButtonComponent;
