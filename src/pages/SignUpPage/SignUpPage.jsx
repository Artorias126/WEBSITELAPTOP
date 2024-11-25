import React from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import imageLogo from "../../assets/images/logo.png";
import { WrapperContainerLeft, WrapperTextLight, WrapperContainerRight } from "./style";

const SignUpPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "850px",
          height: "500px",
          borderRadius: "8px",
          background: "#fff",
          display: "flex",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
        }}
      >
        {/* Container Left */}
        <WrapperContainerLeft style={{ flex: 3, padding: "40px" }}>
          <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>Xin chào</h1>
          <p style={{ marginBottom: "20px", color: "#666" }}>
            Đăng ký để tạo tài khoản
          </p>
          <InputForm
            placeholder="abc@gmail.com"
            style={{
              marginBottom: "16px",
              padding: "12px 16px",
              borderRadius: "4px",
            }}
          />
          <InputForm
            placeholder="password"
            style={{
              marginBottom: "16px",
              padding: "12px 16px",
              borderRadius: "4px",
            }}
          />
          <InputForm
            placeholder="comfirm password"
            style={{
              marginBottom: "16px",
              padding: "12px 16px",
              borderRadius: "4px",
            }}
          />
          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: "rgb(255, 57, 69)",
              height: "48px",
              width: "100%",
              border: "none",
              borderRadius: "4px",
              margin: "20px 0 10px",
            }}
            textButton="Đăng ký"
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />
          <p style={{ marginTop: "5px" }}>
            Bạn đã có tài khoản? <WrapperTextLight>Đăng nhập</WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        {/* Container Right */}
        <WrapperContainerRight
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(136deg, rgb(240, 248, 255), rgb(219, 238, 255))",
          }}
        >
          <img
            src={imageLogo}
            alt="image-logo"
            style={{ height: "300px", width: "300px", marginBottom: "20px" }}
          />
          <h4 style={{ fontSize: "20px", fontWeight: "500", color: "#333" }}>
            <strong>Mua sắm tại DuyLaptop</strong>
          </h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
}

export default SignUpPage