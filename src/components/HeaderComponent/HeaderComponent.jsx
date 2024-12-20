import React, { useState } from 'react';
import { Badge, Col, Popover, Spin } from 'antd'; 
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperHeaderAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup
} from './style';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as UserService from "../../services/UserService";
import { resetUser } from '../../redux/slice/userSlide';
import { searchProduct } from '../../redux/slice/productSlide1';

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [Pending, setPending] = useState(false);
  const order = useSelector((state) => state.order)
  const [search,setSearch] = useState('');

  const handleNavigateLogin = () => {
    navigate('sign-in');
  };

  const handleLogout = async () => {
    setPending(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate('/', { replace: true });
    setPending(false);
  };
  const onSearch = (e) =>{
    setSearch(e.target.value)
    dispatch(searchProduct(e.target.value))
  }

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  return (
    <WrapperHeader>
      {/* Logo Section */}
      <Col span={4} style={{ textAlign: 'left' }}>
        <WrapperTextHeader onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          DUYLAPTOP
        </WrapperTextHeader>
      </Col>

      {/* Search Bar Section */}
      {!isHiddenSearch && (
        <Col span={14} style={{ padding: '0 16px' }}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="Nhập nội dung tìm kiếm"
            onChange = {onSearch}
          />
        </Col>
      )}

      {/* Account and Cart Section */}
      <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <WrapperHeaderAccount>
          <UserOutlined style={{ fontSize: '30px' }} />
          {user?.access_token ? (
            <Popover content={content} trigger="click">
              <div style={{ cursor: 'pointer' }}>{user?.name || user?.email}</div>
            </Popover>
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

        {Pending && <Spin />}

        {!isHiddenCart && (
          <div onClick={() => navigate ('/order')} style={{ display: 'flex', alignItems: 'center', gap: '8px',cursor:'pointer'}}>
            <Badge count={order?.orderItems?.length} size="small">
              <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        )}
      </Col>
    </WrapperHeader>
  );
};

export default HeaderComponent;
