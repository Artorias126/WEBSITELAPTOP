import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { convertPrice } from '../../utils';

import {
  Lable,
  WrapperInfo,
  WrapperContainer,
  WrapperValue,
  WrapperItemOrder,
  WrapperItemOrderInfo,
} from './style';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';


const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;
  console.log('location', location)
  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: 'auto' }}>
        <h3>Đặt hàng thành công</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperContainer>
            <WrapperInfo>
              <div>
                <Lable>Phương thức giao hàng</Lable>
                <WrapperValue style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</WrapperValue >
              </div>
            </WrapperInfo>

            <WrapperInfo>
              <div>
                <Lable>Phương thức thanh toán</Lable>
                <WrapperValue >{orderContant.payment[state?.payment]}</WrapperValue >
              </div>
            </WrapperInfo>
            <WrapperInfo>
              {state.orders?.map((order) => {
                return (
                  <WrapperItemOrder>
                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div>{order?.name}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '50px' }}>
                      <span>
                        <span style={{ fontSize: '20px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                      </span>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '20px', fontWeight: 500 }}>
                        Số Lượng: {order?.amount}
                      </span>
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperInfo>
          </WrapperContainer>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
