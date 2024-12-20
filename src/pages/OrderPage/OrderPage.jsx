import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import imag from '../../assets/images/test.png';
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperStyleHeader, WrapperPriceDiscount, WrapperTotal,WrapperRight } from './style';
import {WrapperInputNumber} from '../../components/ProductDetailsComponent/style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const OrderPage = ({ count = 1 }) => {
  const [checkedAll, setCheckedAll] = useState(false);

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const handleChangeCount = (operation) => {
    // Handle count change logic here
  };

  const handleOnchangeCheckAll = (e) => {
    setCheckedAll(e.target.checked);
    console.log("Checked all: ", e.target.checked);
  };

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: 'auto' }}>
        <h3>Giỏ hàng</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '390px' }}>
                <Checkbox onChange={handleOnchangeCheckAll} checked={checkedAll} />
                <span>Tất cả ({count} sản phẩm)</span>
              </span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Đơn giá</span>
                <span>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} />
              </div>
            </WrapperStyleHeader>

            <WrapperListOrder>
              <WrapperItemOrder>
                <div style={{ width: '390px', display: 'flex', alignItems: 'center' }}>
                  <Checkbox onChange={onChange} />
                  <img src={imag} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                  <div>name san oamr</div>
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: '#242424' }}>
                    211 <WrapperPriceDiscount>230</WrapperPriceDiscount>
                  </span>
                  <WrapperCountOrder>
                    <button style={{ border: 'none', background: 'transparent' }}>
                      <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                    <WrapperInputNumber onChange={onChange} defaultValue={1} />
                    <button style={{ border: 'none', background: 'transparent' }}>
                      <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                    </button>
                  </WrapperCountOrder>
                  <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px' }}>
                    Giảm giá
                  </span>
                  <DeleteOutlined style={{ cursor: 'pointer' }} />
                </div>
              </WrapperItemOrder>
            </WrapperListOrder>
          </WrapperLeft>

          <WrapperRight>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>250,000 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Giảm giá</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>-30,000 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Thuế</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>5,000 VND</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>15,000 VND</span>
                </div>
              </WrapperInfo>

              <WrapperTotal>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px' }}>240,000 VND</span>
                  <span style={{ color: '#999', fontSize: '11px' }}>Đã bao gồm thuế và phí giao hàng</span>
                </span>
              </WrapperTotal>
            </div>

            <ButtonComponent
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '220px',
                border: 'none',
                borderRadius: '4px'
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
