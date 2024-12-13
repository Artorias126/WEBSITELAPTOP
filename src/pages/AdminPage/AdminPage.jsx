import React, { useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { getItem } from '../../utils';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';

const AdminPage = () => {
  const items = [
      {
          key: 'user',
          icon: <UserOutlined />,
          label: 'Người dùng',
      },
      {
          key: 'product',
          icon: <AppstoreOutlined />,
          label: 'Sản phẩm',
      },
  ];

  const [keySelected, setKeySelected] = useState('');

  const renderPage = (key) => {
      switch (key) {
          case 'user':
              return <AdminUser />;
          case 'product':
              return <AdminProduct />;
          default:
              return <></>;
      }
  };

  const handleOnClick = ({ key }) => {
      setKeySelected(key);
      console.log('keySelected', key);
  };

  return (
      <>
          <HeaderComponent isHiddenSearch isHiddenCart />
          <div style={{ display: 'flex' }}>
              <Menu
                  mode="inline"
                  style={{
                      width: 256,
                      boxShadow: '1px 1px 2px #ccc',
                      height: '100vh',
                  }}
                  items={items}
                  onClick={handleOnClick}
              />
              <div style={{ flex: 1,padding:'15px' }}>
                  {renderPage(keySelected)}
              </div>
          </div>
      </>
  );
};

export default AdminPage;