import styled from "styled-components";

export const WrapperLableText = styled.h4`
  color: rgb(56, 56, 61);
  font-size: 14px;
  font-weight: 500;
`;

export const WrapperTextValue = styled.span`
  color: rgb(56, 56, 61);
  font-size: 12px;
  font-weight: 400;
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;  /* Đặt các phần tử theo chiều dọc */
  gap: 12px;
  /* align-items: center; */
  /* flex-direction: column; */
`;

export const WrapperTextPrice = styled.div`
  padding: 4px;
  color: rgb(56, 56, 61);
  border-radius: 10px;
  background-color: rgb(238, 238, 238);
  width: fit-content;
`;
