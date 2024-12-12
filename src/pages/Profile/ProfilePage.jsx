import React, { useState, useEffect } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import {
  WrapperContentProfile,
  WrapperHeader,
  WrapperInput,
  WrapperLabel,
} from './style';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import * as UserService from '../../services/UserService';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slice/userSlide';
import Loading from '../../components/LoadingComponent/Loading';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    return UserService.updateUser (id, rests, access_token);
  });

  const { data, isPending, isSuccess, isError } = mutation;
  console.log('dataa', data);

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser (user?.id, user?.access_token);
    } else if (isError) {
      message.error();
      // If there's an error, you might want to log out the user
      // and redirect them to the login page
      // dispatch(logoutUser ());
      // navigate('/login');
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser  = async (id, token) => {
    const res = await UserService.getDetailsUser (id, token);
    dispatch(updateUser ({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangeName = (value) => {
    setName(value);
  };

  const handleOnchangePhone = (value) => {
    setPhone(value);
  };

  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token, // Đảm bảo token này được truyền đúng
    });
  };

  return (
    <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <Loading isPending={isPending}>
        <WrapperContentProfile>
          <WrapperInput>
            <WrapperLabel htmlFor="email">Email</WrapperLabel>
            <InputForm
              style={{ width: '300px' }}
              id="email"
              value={email}
              onChange={handleOnchangeEmail} // Không dùng optional chaining
            />
            <button onClick={handleUpdate}>Cập nhật</button>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="name">Tên</WrapperLabel>
            <InputForm
              style={{ width: '300px' }}
              id="name"
              value={name}
              onChange={handleOnchangeName} // Không dùng optional chaining
            />
            <button onClick={handleUpdate}>Cập nhật</button>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="phone">Số điện thoại</WrapperLabel>
            <InputForm
              style={{ width: '300px' }}
              id="phone"
              value={phone}
              onChange={handleOnchangePhone} // Không dùng optional chaining
            />
            <button onClick={handleUpdate}>Cập nhật</button>
          </WrapperInput>

          <WrapperInput>
            <WrapperLabel htmlFor="address">Địa chỉ</WrapperLabel>
            <InputForm
              style={{ width: '300px' }}
              id="address"
              value={address }
              onChange={handleOnchangeAddress} // Không dùng optional chaining
            />
            <button onClick={handleUpdate}>Cập nhật</button>
          </WrapperInput>

        </WrapperContentProfile>
      </Loading>
    </div>
  );
};

export default ProfilePage;