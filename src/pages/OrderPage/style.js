import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px; /* Khoảng cách giữa checkbox và text */
    width: 390px;
  }

  .header-right {
    flex: 1;
    display: flex;
    align-items: center;

    .header-column {
      text-align: center;
      flex: 1; /* Đảm bảo chia đều không gian giữa các cột */
    }
  }
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  border-radius: 4px;

  .item-left {
    width: 390px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .item-right {
    flex: 1;
    display: flex;
    align-items: center;

    .item-column {
      text-align: center;
      flex: 1; /* Đồng bộ với header-column */
    }
  }
`;
export const WrapperLeft = styled.div`
  width: 65%;
`;

export const WrapperListOrder = styled.div``;

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
  justify-content: space-between;
`;

export const WrapperRight = styled.div`
  width: 30%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  width: 100%;
  margin-top: 20px;
`;
