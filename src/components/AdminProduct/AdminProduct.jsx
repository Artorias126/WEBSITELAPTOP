import { getBase64 } from '../../utils';
import * as ProductService from '../../services/ProductService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useEffect, useRef, useState } from 'react';
import { Button, Form, Upload,Space,Spin } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined,SearchOutlined } from '@ant-design/icons';
import * as message from '../../components/Message/Message';
import TableComponent from '../../components/TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { WrapperHeader } from './style';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import { useQueryClient, } from '@tanstack/react-query'; // Import useQueryClient
import ModalComponent from '../ModalComponent/ModalComponent';

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState('');
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const user = useSelector((state) => state?.user);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  });

  const [stateProductDetails, setStateProductDetails] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  });

  const [form] = Form.useForm();

  // Khai báo và sử dụng mutation cho việc tạo sản phẩm
  const mutation = useMutationHooks((data) => {
    const { name, price, description, rating, image, type, countInStock } = data;
    return ProductService.createProduct({
      name, price, description, rating, image, type, countInStock
    });
  });

  // Khai báo mutation cho việc cập nhật sản phẩm
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, rests);
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks(
    (data) => {
      const { token, ...ids } = data;
      const res = ProductService.deleteManyProduct(ids, token);
      return res;
    }
  );
  

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  });

  const fetchGetDetailsProduct = async (rowSelected) => {
    if (!rowSelected) {
      return;
    }

    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);

  const handleDetailsProduct = () => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected); // Ensure rowSelected is passed
    }
    setIsOpenDrawer(true);
  };

  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} onClick={() => setIsModalOpenDelete(true)} />
        <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} onClick={handleDetailsProduct} />
      </div>
    );
  };



  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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

  const { data, isLoading, isSuccess, isError } = mutation;
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
      ...getColumnSearchProps ('name')
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
        filters: [
          {
            text: 'Lớn hơn 10 triệu',
            value: 'greater',
          },
          {
            text: 'Nhỏ hơn 10 triệu',
            value: 'less',
          },
        ],
        onFilter: (value, record) => {
          if (value === 'greater') {
            return record.price >= 10000000; // Lọc giá >= 10 triệu
          } else if (value === 'less') {
            return record.price < 10000000; // Lọc giá < 10 triệu
          }
          return true; // Không lọc nếu không thỏa điều kiện
        },
        render: (price) => `${price.toLocaleString()} VND`, // Định dạng giá tiền
      },
      
    {
      title: 'Rating',
      dataIndex: 'rating',
      sorter: (a, b) => a.rating - b.rating
    },
    {
      title: 'Type',
      dataIndex: 'type',
      filters: [
        { text: 'Dell', value: 'Dell' },
        { text: 'ASUS', value: 'ASUS' },
        { text: 'Lenovo', value: 'Lenovo' },
      ],
      onFilter: (value, record) => record.type === value, // Lọc đúng type
      render: (type) => type, // Hiển thị tên type
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: renderAction,
    },
  ];

  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  const queryClient = useQueryClient(); // Initialize queryClient

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Product added successfully');
      queryClient.invalidateQueries(['products']); // Làm mới danh sách sản phẩm
      handleCancel();
    } else if (isError) {
      message.error('Error adding product');
    }
  }, [isSuccess, isError, data, queryClient]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: ''
    });
    form.resetFields();
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  }

  const handleDeleteManyProducts = (ids) => {
    if (Array.isArray(ids) && ids.length > 0) {
      mutationDeletedMany.mutate(
        { ids: ids, token: user?.access_token },
        {
          onSettled: () => {
            queryClient.invalidateQueries(['products']); // Làm mới danh sách sản phẩm
            setDeletedSuccessfully(true);
          },
        }
      );
    } else {
      message.error('Please select at least one product to delete');
    }
  };

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryClient.invalidateQueries(['products']); // Làm mới danh sách sản phẩm
        },
      }
    );
  };
  
  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview
    });
  };

  const handleOnChangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails((prevState) => ({
      ...prevState,
      image: file.preview,  // Correct way to update the state
    }));
  };

  const onFinish = () => {
    mutation.mutate(stateProduct);
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === 'OK') {
      message.success('Cập nhật sản phẩm thành công');
      queryClient.invalidateQueries(['products']); // Make sure to invalidate queries after update
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error('Có lỗi xảy ra khi cập nhật sản phẩm');
    }
  }, [isSuccessUpdated, dataUpdated, queryClient]);

  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === 'OK') {
      message.success('Cập nhật sản phẩm thành công');
      queryClient.invalidateQueries(['products']); // Make sure to invalidate queries after update
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error('Có lỗi xảy ra khi cập nhật sản phẩm');
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
    setStateProductDetails({
      name: '',
      price: '',
      description: '',
      rating: '',
      image: '',
      type: '',
      countInStock: ''
    });
    form.resetFields();
  };

  const onUpdateProduct = () => {
    mutationUpdate.mutate({
      id: rowSelected,
      token: user?.access_Token,
      ...stateProductDetails // Sử dụng dấu ba chấm để phân tán các thuộc tính của stateProductDetails vào đối tượng
    });
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: '10px' }}>
        <Button
          style={{
            height: '150px',
            width: '150px',
            borderRadius: '6px',
            borderStyle: 'dashed',
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: '60px' }} />
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        
        <TableComponent
          deletedSuccessfully={deletedSuccessfully}
          handleDeleteManyProducts = {handleDeleteManyProducts}
          columns={columns}
          data={dataTable}
          pageType="AdminProduct.jsx"
          onRow={(record) => {
            return {
              onClick: () => {
                setRowSelected(record._id);  // Ensure rowSelected is updated correctly
              },
            };
          }}
        />
      </div>
      <ModalComponent
        forceRender
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={onFinish}
        okText="Tạo"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]} >
            <InputComponent
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="Loại sản phẩm"
            name="type"
            rules={[{ required: true, message: 'Please input your type!' }]} >
            <InputComponent
              value={stateProduct.type}
              onChange={handleOnChange}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]} >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]} >
            <InputComponent
              value={stateProduct.description}
              onChange={handleOnChange}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please input your rating!' }]} >
            <InputComponent
              value={stateProduct.rating}
              onChange={handleOnChange}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: 'Please upload an image!' }]} >
            <Upload
              onChange={handleOnChangeAvatar}
              maxCount={1}
              showUploadList={false}
            >
              <Button>Select File</Button>
              {stateProduct?.image && (
                <img
                  src={stateProduct?.image}
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px',
                  }}
                  alt="avatar"
                />
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Số lượng trong kho"
            name="countInStock"
            rules={[{ required: true, message: 'Please input product stock count!' }]} >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
            />
          </Form.Item>
        </Form>
      </ModalComponent>

      <DrawerComponent 
        title="Chi tiết sản phẩm"
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
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]} >
            <InputComponent
              value={stateProductDetails.name}
              onChange={handleOnChangeDetails}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="Loại sản phẩm"
            name="type"
            rules={[{ required: true, message: 'Please input your type!' }]} >
            <InputComponent
              value={stateProductDetails.type}
              onChange={handleOnChangeDetails}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]} >
            <InputComponent
              value={stateProductDetails.price}
              onChange={handleOnChangeDetails}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]} >
            <InputComponent
              value={stateProductDetails.description}
              onChange={handleOnChangeDetails}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please input your rating!' }]} >
            <InputComponent
              value={stateProductDetails.rating}
              onChange={handleOnChangeDetails}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: 'Please upload an image!' }]} >
            <Upload
              onChange={handleOnChangeAvatarDetail}
              maxCount={1}
              showUploadList={false}
            >
              <Button>Select File</Button>
              {stateProductDetails?.image && (
                <img
                  src={stateProductDetails?.image} // Ensure image has a valid value
                  style={{
                    height: '60px',
                    width: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginLeft: '10px',
                  }}
                  alt="avatar"
                />
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="Số lượng trong kho"
            name="countInStock"
            rules={[{ required: true, message: 'Please input product stock count!' }]} >
            <InputComponent
              value={stateProductDetails.countInStock}
              onChange={handleOnChangeDetails}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Apply
            </Button>
          </Form.Item>
        </Form>
      </DrawerComponent>

      <ModalComponent 
        forceRender
        title="Xoá Sản Phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk = {handleDeleteProduct}
      >
        <div>Bạn có chắc xoá sản phẩm này không ?</div>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
