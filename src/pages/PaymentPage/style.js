import { Radio, InputNumber } from "antd";
import styled from "styled-components";


export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`;

export const WrapperInfo = styled.div`
  padding: 10px ;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
`;

export const WrapperLeft = styled.div`
  width: 910px;
`;

export const WrapperTotal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 17px 20px;
  background: #fff;
  border-radius: 6px;
  margin-top: 20px;
  font-weight: bold;

  div {
    display: full;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold;
`;

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 500px;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;

export const WrapperRight = styled.div`
  width: 30%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;
export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm {
    width: 40px;
    text-align: center;
  }
`;