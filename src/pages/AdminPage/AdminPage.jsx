import React, { useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined, AppstoreOutlined, ProductOutlined } from '@ant-design/icons';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';

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
        {
            key: 'order',
            icon: <ProductOutlined />,
            label: 'Đơn hàng',
        },
    ];

    const [keySelected, setKeySelected] = useState('');

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
            case 'product':
                return <AdminProduct />;
            case 'order':
                return <OrderAdmin />;
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
                        boxShadow: '1px 1px 2px #ccc'
                    }}
                    items={items}
                    onClick={handleOnClick}
                />
                <div style={{ flex: 1, padding: '15px' }}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    );
};

export default AdminPage;