import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperStyleHeader, WrapperPriceDiscount, WrapperTotal, WrapperRight } from './style';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct } from '../../redux/slice/orderslide';

const OrderPage = ({ count = 1 }) => {
  const order = useSelector((state) => state.order);
  const [listChecked, setListChecked] = useState([]);
  const dispatch = useDispatch();

  // Kiểm tra xem tất cả các sản phẩm đã được chọn chưa
  const isAllChecked = order?.orderItems?.length === listChecked?.length;

  const onChange = (e) => {
    const value = e.target.value;
    if (listChecked.includes(value)) {
      const newListChecked = listChecked.filter((item) => item !== value);
      setListChecked(newListChecked);
    } else {
      setListChecked((prevList) => [...prevList, value]);
    }
  };

  const handleChangeCount = (type, idProduct) => {
    if (type === 'increase') {
      dispatch(increaseAmount({ idProduct }));
    } else {
      dispatch(decreaseAmount({ idProduct }));
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = order?.orderItems?.map((item) => item?.product) || [];
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh', padding: '20px 0' }}>
      <div style={{ width: '1270px', margin: 'auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <WrapperLeft style={{ flex: 2 }}>
            <WrapperStyleHeader>
              <div className="header-left">
                <Checkbox 
                  onChange={handleOnchangeCheckAll} 
                  checked={isAllChecked} 
                />
                <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </div>
              <div className="header-right">
                <span className="header-column">Đơn giá</span>
                <span className="header-column" style={{marginLeft:'55px'}}>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} onClick = {handleRemoveAllOrder}/>
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.id}>
                    <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Checkbox 
                        onChange={onChange} 
                        value={order?.product} 
                        checked={listChecked.includes(order?.product)} 
                      />
                      <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                      <div>{order?.name}</div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginLeft: '50px' }}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{order?.price.toLocaleString()}đ</span>
                      </span>
                      <WrapperCountOrder>
                        <button
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                          onClick={() => handleChangeCount('decrease', order?.product)}
                        >
                          <MinusOutlined style={{ color: '#000', fontSize: '18px' }} />
                        </button>
                        <WrapperInputNumber onChange={onChange} defaultValue={order?.amount} value={order?.amount} size="small" />
                        <button
                          style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                          onClick={() => handleChangeCount('increase', order?.product)}
                        >
                          <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                      </WrapperCountOrder>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>
                        {(order?.price * order?.amount).toLocaleString()}đ
                      </span>
                      <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>

          <WrapperRight style={{ flex: 1, paddingLeft: '20px' }}>
            <div style={{ width: '100%' }}>
              <WrapperInfo style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>250,000 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>-30,000 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Thuế</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>5,000 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>15,000 VND</span>
                </div>
              </WrapperInfo>

              <WrapperTotal style={{ fontSize: '16px' }}>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>240,000 VND</span>
                  <span style={{ color: '#999', fontSize: '11px' }}>Đã bao gồm thuế và phí giao hàng</span>
                </span>
              </WrapperTotal>
            </div>

            <ButtonComponent
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                marginTop: '20px',
              }}
              textButton="Mua hàng"
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 'bold' }}
            />
          </WrapperRight>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;

