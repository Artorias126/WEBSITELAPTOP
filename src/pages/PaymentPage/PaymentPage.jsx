import React, { useEffect, useState, useMemo } from 'react';
import { Form, message, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/slice/userSlide';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { convertPrice } from '../../utils';


import {
  Lable,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from './style';
import { removeAllOrderProduct } from '../../redux/slice/orderslide';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const order = useSelector((state) => state.order); // Kiểm tra dữ liệu trong order
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState('fast');
  const [payment, setPayment] = useState('later_money');
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const [form] = Form.useForm();

  // Tính tổng giá tiền sản phẩm
  const priceMemo = useMemo(() => {
    const orderItems = order?.orderItemsSelected || order?.orderItemsSlected; // Kiểm tra tên đúng
    if (Array.isArray(orderItems)) {
      return orderItems.reduce((total, item) => total + (item.price * item.amount), 0);
    }
    return 0;
  }, [order]);

  // Tính phí giao hàng
  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 5000000) {
      return 10000;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  // Tính tổng tiền
  const totalPriceMemo = useMemo(() => {
    return priceMemo + deliveryPriceMemo;
  }, [priceMemo, deliveryPriceMemo]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    return UserService.updateUser(id, { ...rests }, token);
  });

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    return OrderService.createOrder({ ...rests }, token);
  });

  const { isSuccess, isError, data, error } = mutationAddOrder;

  useEffect(() => {
    if (isSuccess) {
      console.log('API Response:', data); // Đảm bảo data là dữ liệu từ API
      if (data?.status === 'OK' && data?.message === 'SUCCESS') {
        // Xử lý đơn hàng thành công
        const arrayOrdered = [];
        order?.orderItemsSelected?.forEach(element => {
          arrayOrdered.push(element.product);  // Đảm bảo tên thuộc tính đúng
        });
        dispatch(removeAllOrderProduct({ listChecked: arrayOrdered }));
        message.success('Đặt hàng thành công');
        navigate('/orderSuccess', {
          state: {
            delivery,
            payment,
            orders: order?.orderItemsSelected,  // Dữ liệu đơn hàng
            totalPriceMemo: totalPriceMemo,  // Tổng tiền
          }
        });
      } else {
        message.error(`Đặt hàng thất bại: ${data?.message || 'Lý do không rõ'}`);
      }
    }
  }, [isSuccess, data]);

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateUserInfo = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate({
        id: user?.id,
        token: user?.access_token,
        ...stateUserDetails,
      });
      mutationUpdate.onSuccess = () => {
        dispatch(updateUser({ name, address, city, phone }));
        setIsOpenModalUpdateInfo(false);
      };
    }
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelivery = (e) => {
    setDelivery(e.target.value);
  };

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const handleAddOrder = () => {
    if (
      user?.access_token &&
      order?.orderItemsSelected?.length > 0 &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      priceMemo > 0 &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: deliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
      });
    } else {
      message.error('Vui lòng kiểm tra lại thông tin giỏ hàng!');
    }
  };

  return (
    <div style={{ background: '#f5f5fa', width: '100%', height: '100vh' }}>
      <div style={{ height: '100%', width: '1270px', margin: 'auto' }}>
        <h3>Thanh toán</h3>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <WrapperLeft>
            <WrapperInfo>
              <div>
                <Lable>Chọn phương thức giao hàng</Lable>
                <WrapperRadio onChange={handleDelivery} value={delivery}>
                  <Radio value="fast">
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>Fast</span>
                  </Radio>
                  <Radio value="gojek">
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>Gojek</span>
                  </Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>

            <WrapperInfo>
              <div>
                <Lable>Chọn phương thức thanh toán</Lable>
                <WrapperRadio onChange={handlePayment} value={payment}>
                  <Radio value="later_money">Thanh toán tiền mặt khi nhận hàng</Radio>
                </WrapperRadio>
              </div>
            </WrapperInfo>
          </WrapperLeft>
          <WrapperRight style={{ flex: 1, paddingLeft: '20px' }}>
            <div style={{ width: '100%' }}>
              <WrapperInfo>
                <div>
                  <span>Địa chỉ: </span>
                  <span style={{ fontWeight: 'bold' }}>
                    {`${user?.address} ${user?.city}`}
                  </span>
                  <span
                    onClick={handleChangeAddress}
                    style={{ color: 'blue', cursor: 'pointer', marginLeft: ' 10px' }}
                  >
                    Thay đổi
                  </span>
                </div>
              </WrapperInfo>
              <WrapperInfo style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Tạm tính</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span>Phí giao hàng</span>
                  <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(deliveryPriceMemo)}</span>
                </div>
              </WrapperInfo>

              <WrapperTotal style={{ fontSize: '16px' }}>
                <span>Tổng tiền</span>
                <span style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                  <span style={{ color: '#999', fontSize: '11px' }}>Đã bao gồm thuế và phí giao hàng</span>
                </span>
              </WrapperTotal>
            </div>

            <ButtonComponent
              onClick={() => handleAddOrder()}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                marginTop: '20px',
              }}
              textButton="Đặt hàng"
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 'bold' }}
            />
          </WrapperRight>
        </div>
      </div>
      {isOpenModalUpdateInfo && (
        <ModalComponent
          visible={isOpenModalUpdateInfo}
          onCancel={handleCancelUpdate}
          onOk={handleUpdateUserInfo}
        >
          <InputComponent
            label="Tên"
            name="name"
            value={stateUserDetails.name}
            onChange={handleOnChangeDetails}
          />
          <InputComponent
            label="Số điện thoại"
            name="phone"
            value={stateUserDetails.phone}
            onChange={handleOnChangeDetails}
          />
          <InputComponent
            label="Địa chỉ"
            name="address"
            value={stateUserDetails.address}
            onChange={handleOnChangeDetails}
          />
          <InputComponent
            label="Thành phố"
            name="city"
            value={stateUserDetails.city}
            onChange={handleOnChangeDetails}
          />
        </ModalComponent>
      )}
    </div>
  );
};

export default PaymentPage;
