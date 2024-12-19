import { Col, Row, Image,Rate } from 'antd';
import { StarFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import imageProduct from '../../assets/images/asus/1.jpg';
import imageProductSmall1 from '../../assets/images/asus/3.jpg';
import imageProductSmall2 from '../../assets/images/asus/4.jpg';
import imageProductSmall3 from '../../assets/images/asus/2.jpg';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'; 
import { WrapperStyleNameProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperAddressProduct, WrapperStyleTextSell, WrapperStyleDescriptionProduct, WrapperInputNumber } from './style';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async ({ queryKey }) => {
    const id = queryKey[1]; // Lấy id từ queryKey
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  const handleChangeCount = (type) => {
    if (type === 'increase') {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct > 1 ? numProduct - 1 : 1); // Giảm số lượng nhưng không được nhỏ hơn 1
    }
  };



  const renderStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<StarFilled key={i} />);
    }
    return stars;
  };

  const { isLoading, data: productDetails } = useQuery({
    queryKey: ['product-details', idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct, // Chỉ bật query khi idProduct tồn tại
  });

  console.log('productDetails', productDetails);

  return (
    <Row style={{ padding: '16px', background: '#fff' }}>
      <Col span={10} style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
        {/* Ảnh sản phẩm chính */}
        <Zoom>
          <Image src={productDetails?.image} alt="image product" preview={false} />
        </Zoom>

        {/* Các ảnh nhỏ */}
        <Row style={{ paddingTop: '10px', display: 'flex', gap: '0', margin: '0' }}>
          {[imageProductSmall1, imageProductSmall2, imageProductSmall3].map((img, idx) => (
            <Col key={idx} span={8} style={{ padding: '0', margin: '0' }}>
              <Zoom>
                <Image
                  src={img}
                  alt={`image small ${idx + 1}`}
                  preview={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    border: '2px solid white',
                    borderRadius: '4px',
                  }}
                />
              </Zoom>
            </Col>
          ))}
        </Row>
      </Col>

      <Col span={14} style={{ paddingLeft: '10px' }}>
        <WrapperStyleNameProduct>
          {productDetails?.name}
          <div></div>
        </WrapperStyleNameProduct>

        <div>
          {renderStars(productDetails?.rating)} 
          <WrapperStyleTextSell> | Đã bán 5</WrapperStyleTextSell>
        </div>

        <WrapperPriceProduct>
          <WrapperPriceTextProduct>{productDetails?.price}</WrapperPriceTextProduct>
        </WrapperPriceProduct>

        <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className="address">{user?.address}</span> -{' '}
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddressProduct>

        {/* Phần mô tả sản phẩm */}
        <WrapperStyleDescriptionProduct>
          <h3>Mô tả sản phẩm</h3>
          <ul></ul>
        </WrapperStyleDescriptionProduct>

        <div
          style={{
            margin: '10px 0 20px',
            padding: '10px 0',
            borderTop: '1px solid #e5e5e5',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          <div style={{ marginBottom: '10px' }}>Số lượng</div>
          <WrapperQualityProduct>
            <button
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => handleChangeCount('decrease')}
            >
              <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
            </button>
            <WrapperInputNumber
              onChange={onChange}
              defaultValue={1}
              value={numProduct}
              size="small"
            />
            <button
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => handleChangeCount('increase')}
            >
              <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
            </button>
          </WrapperQualityProduct>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            style={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '220px',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '15px',
              fontWeight: '700',
            }}
          >
            Chọn mua
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;

