import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailCompoent';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div style={{ padding: '0 120px', background: '#efefef', height: '1000px' }}>
      <h5>
        <span 
          style={{
            cursor: 'pointer', 
            fontWeight: 'bold', 
            color: 'rgb(11, 116, 229)' // Màu xanh biển
          }}
          onClick={() => navigate('/')}
        >
          Trang chủ
        </span> 
        - Chi tiết sản phẩm
      </h5>
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
}

export default ProductDetailsPage;