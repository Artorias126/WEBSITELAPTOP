import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct, WrapperButtonMore, WrapperProducts } from './style'; // Đảm bảo đường dẫn đúng
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux'

const HomePage = () => {
  const product = useSelector((state) => state.product) 
  const arr = ['ASUS', 'LENOVO', 'DELL'];

  const fetchProductAll = async () => {
    try {
        const res = await ProductService.getAllProduct();
        console.log('res', res);
        return res;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const { isLoading, data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
});

console.log('data', product);

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
          {products?.data?.map((product) => (
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
            ))}
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