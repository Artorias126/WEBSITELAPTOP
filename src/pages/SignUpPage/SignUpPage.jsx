import React, { useState, useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import imageLogo from "../../assets/images/logo.png";
import { WrapperContainerLeft, WrapperTextLight, WrapperContainerRight } from "./style";
import { EyeInvisibleFilled, EyeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => { 
    if (isSuccess) { 
      message.success(); 
      handleNavigateSignIn()
    } else if (isError) { 
      message.error(); 
    } 
  }, [isSuccess, isError]);
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword((prev) => !prev);
  };

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
    console.log("sign-up", email, password, confirmPassword);
  };

  // Kiểm tra nút có bị vô hiệu hóa hay không
  const isDisabled = !email.trim() || !password.trim() || !confirmPassword.trim();

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
          <p style={{ marginBottom: "20px", color: "#666" }}>Đăng ký để tạo tài khoản</p>

          {/* Email */}
          <InputForm
            style={{
              marginBottom: "16px",
              padding: "12px 16px",
              borderRadius: "4px",
            }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />

          {/* Mật khẩu */}
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <div style={{ position: "relative" }}>
            <InputForm
              placeholder="Password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
              style={{
                marginBottom: "16px",
                padding: "12px 16px",
                borderRadius: "4px",
              }}
            />
            {/* Icon hiển thị/mở khóa mật khẩu */}
            <span
              onClick={togglePasswordVisibility}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
                cursor: "pointer",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>

          {/* Xác nhận mật khẩu */}
          <div style={{ position: "relative" }}>
            <InputForm
              placeholder="Confirm password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
              style={{
                marginBottom: "16px",
                padding: "12px 16px",
                borderRadius: "4px",
              }}
            />
            {/* Icon hiển thị/mở khóa mật khẩu */}
            <span
              onClick={toggleConfirmPasswordVisibility}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
                cursor: "pointer",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>

          {/* Button */}
          <Loading isPending={isPending}>
          <ButtonComponent
            size={40}
            onClick={handleSignUp} 
            disabled={isDisabled} // Nút bị vô hiệu hóa khi chưa nhập đủ thông tin
            styleButton={{
              background: isDisabled ? "#ccc" : "rgb(255, 57, 69)",
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
          </Loading>
          <p style={{ marginTop: "5px" }}>
            Bạn đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignIn} style={{ cursor: "pointer" }}>
              Đăng nhập
            </WrapperTextLight>
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
};

export default SignUpPage;
