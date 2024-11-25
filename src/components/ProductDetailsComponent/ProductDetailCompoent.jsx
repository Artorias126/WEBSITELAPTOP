import { Col, Row, Image } from 'antd';
import { StarFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import imageProduct from '../../assets/images/asus/1.jpg';
import imageProductSmall1 from '../../assets/images/asus/3.jpg';
import imageProductSmall2 from '../../assets/images/asus/4.jpg';
import imageProductSmall3 from '../../assets/images/asus/2.jpg';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css'; // Import style cho zoom

import { WrapperStyleNameProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperAddressProduct, WrapperStyleTextSell, WrapperStyleDescriptionProduct } from './style';

const ProductDetailsComponent = () => {
  const onChange = (value) => {
    console.log('Quantity changed:', value);
  };

  return (
    <Row style={{ padding: '16px', background: '#fff' }}>
      <Col span={10} style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
        {/* Ảnh sản phẩm chính */}
        <Zoom>
          <Image src={imageProduct} alt="image product" preview={false} />
        </Zoom>

        {/* Các ảnh nhỏ */}
        <Row style={{ paddingTop: '10px', display: 'flex', gap: '0', margin: '0' }}>
          <Col span={8} style={{ padding: '0', margin: '0' }}>
            <Zoom>
              <Image 
                src={imageProductSmall1} 
                alt="image small 1" 
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
          <Col span={8} style={{ padding: '0', margin: '0' }}>
            <Zoom>
              <Image 
                src={imageProductSmall2} 
                alt="image small 2" 
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
          <Col span={8} style={{ padding: '0', margin: '0' }}>
            <Zoom>
              <Image 
                src={imageProductSmall3} 
                alt="image small 3" 
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
        </Row>

      </Col>

      <Col span={14} style={{ paddingLeft: '10px' }}>
        <WrapperStyleNameProduct>
          LAPTOP ASUS TUF GAMING F15 FX506LH
          <div></div>
        </WrapperStyleNameProduct>

        <div>
          {[...Array(5)].map((_, index) => (
            <StarFilled key={index} style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
          ))}
          <WrapperStyleTextSell> | Đã bán 5</WrapperStyleTextSell>
        </div>

        <WrapperPriceProduct>
          <WrapperPriceTextProduct>11.990.000đ</WrapperPriceTextProduct>
        </WrapperPriceProduct>

        <WrapperAddressProduct>
          <span>Giao đến </span>
          <span className="address">Q. 1, P. Bến Nghé, Hồ Chí Minh</span> -{' '}
          <span className="change-address">Đổi địa chỉ</span>
        </WrapperAddressProduct>

        {/* Phần mô tả sản phẩm */}
        <WrapperStyleDescriptionProduct>
          <h3>Mô tả sản phẩm</h3>
          <ul>
            <li><strong>CPU:</strong> i5 10300H ~2.4Ghz (8 CPUs)</li>
            <li><strong>RAM:</strong> 16 GB DDR4 2667 MHz</li>
            <li><strong>Màn hình:</strong> 15,6 FHD IPS 144Hz 1920x1080</li>
            <li><strong>Ổ Cứng:</strong> SSD 512 GB PCIe NVMe</li>
            <li><strong>VGA:</strong> Intel UHD Graphics + Nvidia GeForce GTX 1650 4GB</li>
            <li><strong>HĐH:</strong> Windows 10/11 bản quyền</li>
            <li><strong>Trọng lượng:</strong> 2,2 kg</li>
            <li><strong>Tích hợp:</strong> HD Webcam, Phím Led RGB</li>
          </ul>
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
            <button style={{ border: 'none', background: 'transparent' }}>
              <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
            </button>
            <input
              type="number"
              defaultValue={3}
              onChange={onChange}
              style={{ width: '40px', textAlign: 'center' }}
            />
            <button style={{ border: 'none', background: 'transparent' }}>
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
