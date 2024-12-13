import React, { useState } from 'react';
import { Badge, Col, Popover, Spin } from 'antd';  // Thêm import Spin
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

const HeaderComponent = ({isHiddenSearch = false,isHiddenCart =false}) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch(); // Lấy dữ liệu người dùng từ Redux store
  const [Pending, setPending] = useState(false); // Sửa lại ở đây
  console.log('user', user); // Kiểm tra dữ liệu người dùng

  // Điều hướng đến trang đăng nhập khi người dùng chưa đăng nhập
  const handleNavigateLogin = () => {
    navigate('sign-in');
  };

  const handleLogout = async () => {
    setPending(true);  // Bật trạng thái đang xử lý
    await UserService.logoutUser();
    dispatch(resetUser());
    navigate('/', { replace: true });
    setPending(false);  // Tắt trạng thái khi hoàn thành
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate('/profile-user')} >Thông tin người dùng</WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate('/system/admin')} >Quản lí hệ thống</WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
    </div>
  );

  return (
    <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenSearch ? 'space-between' : 'unset' }}>
      {/* Logo Section */}
      <Col span={5} style={{ textAlign: 'left' }}>
        <WrapperTextHeader>DUYLAPTOP</WrapperTextHeader>
      </Col>

      {/* Search Bar Section */}
      {!isHiddenSearch && (
        <Col span={13} style={{ padding: '0 16px' }}>
        <ButtonInputSearch
          size="large"
          textButton="Tìm kiếm"
          placeholder="Nhập nội dung tìm kiếm"
        />
      </Col>
      )}
      
      {/* Account and Cart Section */}
      <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px' }}>
        <WrapperHeaderAccount>
          <UserOutlined style={{ fontSize: '30px' }} />
          {user?.access_token ? (
            <>
              <Popover content={content} trigger="click">
                 <div style={{ cursor: 'pointer' }}>{user?.name?.length ? user?.name : user?.email}</div>
              </Popover>
            </>
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

        {/* Loading chỉ áp dụng cho phần logout */}
        {Pending && (
          <Spin />
        )}

        {/* Cart Section */}
        {!isHiddenCart && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Badge count={4} size="small">
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