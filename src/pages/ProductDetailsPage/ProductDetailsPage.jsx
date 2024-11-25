import React from 'react';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailCompoent';

const ProductDetailsPage = () => {
  console.log('Rendering ProductDetailsPage');
  return (
    <div style={{ padding: '0 120px', background: '#efefef', minHeight: '100vh' }}>
      <h5>Trang chủ</h5>
      <ProductDetailsComponent />
    </div>
  );
};


export default ProductDetailsPage;
