import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, Input, Button, Space, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import { orderContant } from '../../contant';

const { Option } = Select;

const OrderAdmin = () => {
  const user = useSelector((state) => state.user);

  // State lưu trữ dữ liệu đơn hàng
  const [ordersData, setOrdersData] = useState([]);

  // Lấy dữ liệu từ API
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrder,
    refetchInterval: 30000, // Tự động refetch mỗi 5 giây
  });

  const { isLoading: isLoadingOrders, data: orders } = queryOrder;

  // Xử lý dữ liệu đơn hàng sau khi lấy từ API
  useEffect(() => {
    if (orders?.data) {
      const formattedData = orders.data.map((order) => {
        const productName = order?.orderItems?.map(item => item.name).join(', ');
        const formattedTotalPrice = order.totalPrice?.toLocaleString('vi-VN');

        return {
          ...order,
          key: order._id,
          userName: order?.shippingAddress?.fullName,
          phone: order?.shippingAddress?.phone,
          address: order?.shippingAddress?.address,
          paymentMethod: orderContant.payment[order?.paymentMethod],
          isPaid: order?.isPaid ? 'TRUE' : 'FALSE',
          isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE',
          productName,
          totalPrice: formattedTotalPrice,
        };
      });
      setOrdersData(formattedData);
    }
  }, [orders]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            onClick={() => confirm()}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && clearFilters()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'userName',
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps('userName'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
    },
    {
      title: 'Delivery Status',
      dataIndex: 'isDelivered',
      render: (text, record) => (
        <Select
          value={text === 'TRUE' ? 'TRUE' : 'FALSE'}
          onChange={(value) => handleChangeDeliveryStatus(value === 'TRUE', record.key)}
          style={{ width: 100 }}
        >
          <Option value="TRUE">Đã giao</Option>
          <Option value="FALSE">Chưa giao</Option>
        </Select>
      ),
      filters: [
        { text: 'Đã giao', value: 'TRUE' },
        { text: 'Chưa giao', value: 'FALSE' },
      ],
      onFilter: (value, record) => record.isDelivered === value,
    },
    {
      title: 'Product Name',
      dataIndex: 'productName',
      render: (text) => text || 'No product',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      sorter: (a, b) => parseFloat(a.totalPrice.replace(/\./g, '')) - parseFloat(b.totalPrice.replace(/\./g, '')),
    },
  ];


  const handleChangeDeliveryStatus = (isDelivered, orderId) => {
    const updatedOrders = ordersData.map((order) =>
      order.key === orderId ? { ...order, isDelivered: isDelivered ? 'TRUE' : 'FALSE' } : order
    );
    setOrdersData(updatedOrders);
  };

  return (
    <div>
      <h3>Quản lý Đơn Hàng</h3>
      <div style={{ marginTop: '20px' }}>
        <Table
          columns={columns}
          dataSource={ordersData}
          loading={isLoadingOrders}
          pagination={false}
          scroll={{ x: 'max-content', y: 600 }}
        />
      </div>
    </div>
  );
};

export default OrderAdmin;
