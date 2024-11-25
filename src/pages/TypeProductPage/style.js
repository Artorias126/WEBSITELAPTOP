import { Col } from "antd";
import styled from "styled-components";

export const WrapperProducts = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: flex-start; /* Căn trái khi các card xuống hàng */
`;

export const WrapperNavbar = styled(Col)`
  background: #fff;
  margin-right: 10px;
  padding: 10px;
  border-radius: 6px;
  height: fit-content;
  margin-top: 20px;
  width: 250px; /* Đảm bảo chiều rộng navbar phù hợp */
`;
