import { getBase64 } from '../../utils';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Upload, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import * as message from '../../components/Message/Message';
import TableComponent from '../../components/TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { WrapperHeader } from './style';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query'; // Import useQueryClient
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const user = useSelector((state) => state?.user);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    isAdmin: false,
  });

  const [form] = Form.useForm();

  // Khai báo mutation cho việc cập nhật sản phẩm
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids } = data;
      const res = UserService.deleteManyUser(ids, token);
      return res;
    }
  );

  const getAllUsers = async () => {
    const res = await UserService.getAllUsers(user?.access_token);
    return res;
  };

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const fetchGetDetailsUser = async (rowSelected) => {
    if (!rowSelected) {
      return;
    }

    const res = await UserService.getDetailsUser(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
        isAdmin: res?.data?.isAdmin,
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsUser = () => {
    if (rowSelected) {
      fetchGetDetailsUser(rowSelected); // Ensure rowSelected is passed
    }
    setIsOpenDrawer(true);
  };

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsUser} />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    setSearchText('');
    confirm();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={`${selectedKeys[0] || ''}`}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated } = mutationUpdate;
  const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted } = mutationDeleted;
  const {data: dataDeletedMany,isSuccess: isSuccessDeletedMany,isError: isErrorDeletedMany,} = mutationDeletedMany;
  const [deletedSuccessfully, setDeletedSuccessfully] = useState(false);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text) => <a>{text}</a>,
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];

  const dataTable =
  Array.isArray(users?.data) &&
  users?.data?.map((user) => ({
    ...user,
    key: user._id,
    isAdmin: user.isAdmin ? 'True' : 'False',
    name: user.name || '', // Đảm bảo có giá trị mặc định
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
  }));

  const queryClient = useQueryClient(); // Initialize queryClient

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    // Kiểm tra nếu người dùng là admin
    const userToDelete = users?.data?.find((user) => user._id === rowSelected);

    if (userToDelete?.isAdmin) {
      message.error('Không thể xóa tài khoản admin!');
      return; // Dừng lại nếu là tài khoản admin
    }

    // Nếu không phải là admin, tiếp tục thực hiện xóa
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['users']); // Làm mới danh sách người dùng
        },
      }
    );
  };

    const handleDeleteManyUsers = (ids) => {
      if (Array.isArray(ids) && ids.length > 0) {
        mutationDeletedMany.mutate(
          { ids: ids, token: user?.access_token },
          {
            onSettled: () => {
              queryClient.invalidateQueries(['users']); // Làm mới danh sách sản phẩm
              setDeletedSuccessfully(true)
            },
          }
        );
      } else {
        message.error('Please select at least one product to delete');
      }
    };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Cập nhật người dùng thành công');
      queryClient.invalidateQueries(['users']); // Làm mới danh sách người dùng
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error('Có lỗi xảy ra khi cập nhật người dùng');
    }
  }, [isSuccessUpdated, dataUpdated, queryClient]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success('Xóa người dùng thành công');
      queryClient.invalidateQueries(['users']); // Làm mới danh sách người dùng
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error('Có lỗi xảy ra khi xóa người dùng');
    }
  }, [isSuccessDeleted, dataDeleted, queryClient]);

 useEffect(() => {
    if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
      message.success();
    } else if (isErrorDeletedMany) {
      message.error();
    }
  }, [isSuccessDeletedMany, isErrorDeletedMany, dataDeletedMany]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      address: '',
      isAdmin: false,
    });
    form.resetFields();
  };

  const onUpdateProduct = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: user?.access_token,
      ...stateUserDetails,
    });
  };

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: '20px' }}>
        <TableComponent
          deletedSuccessfully={deletedSuccessfully}
          pageType="AdminUser.jsx"
          handleDeleteMany = {handleDeleteManyUsers}
          columns={columns}
          data={dataTable}
          onRow={(record) => {
            return {
              onClick: () => {
                setRowSelected(record._id); // Ensure rowSelected is updated correctly
              },
            };
          }}
        />
      </div>
      <DrawerComponent
        forceRender
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="50%"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onUpdateProduct}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên người dùng"
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
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <InputComponent
              value={stateUserDetails.email}
              onChange={handleOnChangeDetails}
              name="email"
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
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Apply
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>

      <ModalComponent
        forceRender
        title="Xoá người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <div>Bạn có chắc muốn xoá người dùng này không?</div>
      </ModalComponent>
    </div>
  );
};

export default AdminUser;
