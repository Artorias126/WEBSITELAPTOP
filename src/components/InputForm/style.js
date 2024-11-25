import styled from "styled-components";
import { Input } from "antd";

export const WrapperInputStyle = styled(Input)`
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: rgb(255, 255, 255); 
  outline: none;

  &:focus {
    background-color: rgb(232, 240, 254); 
    
  }
`;
