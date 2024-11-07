import React from 'react';
import { Col } from 'antd';
import Search from 'antd/es/transfer/search';
import {
    UserOutlined,CaretDownOutlined,ShoppingCartOutlined,
  } from '@ant-design/icons';
import { WrapperHeader, WrapperTextHeader,WrapperHeaderAccount,WrapperTextHeaderSmall } from './style';

function HeaderComponent() {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>DUYLAPTOP</WrapperTextHeader>
                </Col>
                <Col span={12}>
                <Search 
                placeholder="input search text" 
                enterButton 
                // onSearch={onSearch}
                />
                </Col>
                <Col span={6} style ={{ display: 'flex', gap: '20px'}}>
                <WrapperHeaderAccount>
                <UserOutlined style ={{ fontSize: '30px'}}/>
                <div>
                    <WrapperTextHeaderSmall>Đăng Nhập/Đăng Kí</WrapperTextHeaderSmall>
                    <div>
                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                    </div>
                </div>
                </WrapperHeaderAccount>
                <div>
                    
                <ShoppingCartOutlined style ={{ fontSize: '30px',color:'#fff'}} />
                <WrapperTextHeaderSmall>Giỏ Hàng</WrapperTextHeaderSmall>
                    
                </div>
                </Col>
            </WrapperHeader>
        </div>
    )
}

export default HeaderComponent
