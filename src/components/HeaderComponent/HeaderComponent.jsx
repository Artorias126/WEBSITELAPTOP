import React from 'react';
import { Badge, Col } from 'antd';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { WrapperHeader, WrapperTextHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

function HeaderComponent() {
  return (
    <div>
      <WrapperHeader>
        <Col span={6}>
          <WrapperTextHeader>DUYLAPTOP</WrapperTextHeader>
        </Col>
        <Col span={12}>
          <ButtonInputSearch 
            size="large"
            textButton="Tìm kiếm"
            placeholder="input search text"
            // onSearch={onSearch}
          />
        </Col>
        <Col span={6} style={{ display: 'flex', alignItems:'center', gap: '20px' }}>
          <WrapperHeaderAccount>
              <UserOutlined style={{ fontSize: '30px', }} />
              <div>
                <WrapperTextHeaderSmall>Đăng Nhập/Đăng Kí</WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Badge count={4} size="small" style={{ marginRight: '5px' }}>
                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
            </div>
          </WrapperHeaderAccount>
        </Col>
      </WrapperHeader>
    </div>
  );
}

export default HeaderComponent;
