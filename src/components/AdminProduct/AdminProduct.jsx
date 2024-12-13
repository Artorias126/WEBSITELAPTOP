import { getBase64 } from '../../utils';
import * as ProductService from '../../services/ProductService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import * as message  from '../../components/Message/Message';
import TableComponent from '../../components/TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent'
import { WrapperHeader } from './style'


const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: '',
    price: '',
    description: '',
    rating: '',
    image: '',
    type: '',
    countInStock: ''
  });

  const mutation = useMutationHooks(
    (data) => {
      const { 
        name, 
        price, 
        description, 
        rating, 
        image, 
        type, 
        countInStock: countInStock 
    } = data;
      return ProductService.createProduct({
        name, price, description, rating, image, type, countInStock
      });
    }
  );

  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      message.success('Product added successfully');
      handleCancel();
    } else if (isError) {
      message.error('Error adding product');
    }
  }, [isSuccess, isError, data]);

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
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value
    });
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

  const onFinish = () => {
    mutation.mutate(stateProduct);
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
        <TableComponent />
      </div>

      <Modal
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
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <InputComponent 
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>
          <Form.Item
            label="Loại sản phẩm"
            name="type"
            rules={[{ required: true, message: 'Please input your type!' }]}
          >
            <InputComponent 
              value={stateProduct.type}
              onChange={handleOnChange}
              name="type"
            />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: 'Please input your price!' }]}
          >
            <InputComponent 
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true, message: 'Please input your description!' }]}
          >
            <InputComponent 
              value={stateProduct.description}
              onChange={handleOnChange}
              name="description"
            />
          </Form.Item>
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: 'Please input your rating!' }]}
          >
            <InputComponent 
              value={stateProduct.rating}
              onChange={handleOnChange}
              name="rating"
            />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
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
            rules={[{ required: true, message: 'Please input product stock count!' }]}
          >
            <InputComponent 
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProduct;
