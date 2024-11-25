import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrapperTypeProduct, WrapperButtonMore, WrapperProducts } from './style'; // Đảm bảo đường dẫn đúng
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider1 from '../../assets/images/slider1.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import CardComponent from '../../components/CardComponent/CardComponent';


const HomePage = () => {
  const arr = ['ASUS', 'LENOVO', 'DELL'];

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
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
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
