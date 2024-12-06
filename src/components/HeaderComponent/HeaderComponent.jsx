import React from 'react';
import { Badge, Col } from 'antd';
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
} from './style';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Lấy dữ liệu người dùng từ Redux store
  console.log('user', user); // Kiểm tra dữ liệu người dùng

  // Điều hướng đến trang đăng nhập khi người dùng chưa đăng nhập
  const handleNavigateLogin = () => {
    navigate('sign-in');
  };

  return (
    <WrapperHeader>
      {/* Logo Section */}
      <Col span={5} style={{ textAlign: 'left' }}>
        <WrapperTextHeader>DUYLAPTOP</WrapperTextHeader>
      </Col>

      {/* Search Bar Section */}
      <Col span={13} style={{ padding: '0 16px' }}>
        <ButtonInputSearch
          size="large"
          textButton="Tìm kiếm"
          placeholder="Nhập nội dung tìm kiếm"
        />
      </Col>

      {/* Account and Cart Section */}
      <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <WrapperHeaderAccount>
          <UserOutlined style={{ fontSize: '30px' }} />
          {user?.name ? (
            <div style={{ cursor: 'pointer' }} >{user.name}</div> // Hiển thị tên người dùng nếu đã đăng nhập
          ) : (
            <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
              <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                <CaretDownOutlined />
              </div>
            </div>
          )}
        </WrapperHeaderAccount>

        {/* Cart Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge count={4} size="small">
            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
          </Badge>
          <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
        </div>
      </Col>
    </WrapperHeader>
  );
};

export default HeaderComponent;
