import React, { useEffect, useRef, useState } from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct, WrapperButtonMore, WrapperProducts } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import styled from 'styled-components';

// Styled components cho Spinner
const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Màu nền */
  border-top: 4px solid #3498db; /* Màu spinner */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct);
  const refSearch = useRef();
  const [stateProducts, setStateProducts] = useState([]);
  const arr = ['ASUS', 'LENOVO', 'DELL'];

  const fetchProductAll = async (search) => {
    const res = await ProductService.getAllProduct(search);
    if (res?.data) {
      return res?.data; // Trả về data để sử dụng trong useQuery
    }
    return [];
  };

  const { isLoading, data: products } = useQuery({
    queryKey: ['products', searchDebounce],
    queryFn: () => fetchProductAll(searchDebounce),
    retry: 3,
    retryDelay: 1000,
  });

  useEffect(() => {
    if (products) {
      setStateProducts(products);
    }
  }, [products]);

  return (
    <>
      {/* Phần loại sản phẩm */}
      <div style={{ padding: '0 120px' }}>
        <WrapperTypeProduct>
          {arr.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTypeProduct>
      </div>

      {/* Phần slider và sản phẩm */}
      <div id="container" style={{ backgroundColor: '#efefef', padding: '0 120px' }}>
        {/* Slider */}
        <SliderComponent arrImages={[slider1, slider2, slider3]} />

        {/* Sản phẩm */}
        <WrapperProducts>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px 0' }}>
              <Spinner /> {/* Hiển thị spinner khi đang tải */}
            </div>
          ) : stateProducts?.length > 0 ? (
            stateProducts.map((product) => (
              <CardComponent
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
              />
            ))
          ) : (
            <div>Không tìm thấy sản phẩm nào phù hợp.</div>
          )}
        </WrapperProducts>

        {/* Nút "Xem thêm" */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <WrapperButtonMore
            textButton="Xem thêm"
            type="outline"
            styleButton={{
              border: '1px solid rgb(11, 116, 229)',
              color: 'rgb(11, 116, 229)',
              width: '240px',
              height: '38px',
              borderRadius: '4px',
            }}
            styleTextButton={{ fontWeight: 500 }}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
