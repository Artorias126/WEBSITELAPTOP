import React, { useEffect, useMemo, useState } from 'react';
import { Checkbox, Form, message } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperStyleHeader, WrapperPriceDiscount, WrapperTotal, WrapperRight } from './style';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slice/orderslide';
import { convertPrice } from '../../utils';
import InputComponent from '../../components/InputComponent/InputComponent';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService'
import { updateUser } from '../../redux/slice/userSlide';
import { useNavigate } from 'react-router-dom';

const OrderPage = ({ count = 1 }) => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const [form] = Form.useForm();

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

  const priceMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const deliveryPriceMemo = useMemo(() => {
    if (priceMemo > 5000000) {
      return 10000;
    } else if (priceMemo === 0) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) + Number(deliveryPriceMemo);
  }, [priceMemo, deliveryPriceMemo]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });


  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  const handleRemoveAllOrder = () => {
    if (listChecked?.length > 1) {
      dispatch(removeAllOrderProduct({ listChecked }));
    }
  };

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = order?.orderItems?.map((item) => item?.product) || [];
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

  useEffect(() => {
    dispatch(selectedOrder({ listChecked }));
  }, [listChecked]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleAddCard = () => {
    if (listChecked.length === 0) {
      return message.error('Vui lòng chọn sản phẩm');
    }

    if (!user?.phone || !user?.address || !user?.name || !user?.city) {
      return setIsOpenModalUpdateInfo(true);
    }

    navigate('/payment');
  };

  const handleCancelUpdate = () => {
    setIsOpenModalUpdateInfo(false);
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        }
      );
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
                <span className="header-column" style={{ marginLeft: '55px' }}>Thành tiền</span>
                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
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
                        <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}đ</span>
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
                        {convertPrice(order?.price * order?.amount)}
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
              onClick={() => handleAddCard()}
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
      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInforUser}
      >
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          //onFinish={onUpdateProduct}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent
              value={stateUserDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please input your city!' }]}
          >
            <InputComponent
              value={stateUserDetails.city}
              onChange={handleOnChangeDetails}
              name="city"
            />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone!' }]}
          >
            <InputComponent
              value={stateUserDetails.phone}
              onChange={handleOnChangeDetails}
              name="phone"
            />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <InputComponent
              value={stateUserDetails.address}
              onChange={handleOnChangeDetails}
              name="address"
            />
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default OrderPage;

