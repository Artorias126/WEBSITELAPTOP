import React from 'react';
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText} from './style' 
import { StarFilled } from '@ant-design/icons'

const CardComponent = (props) => {
  const {
    countInStock,
    description,
    image,
    name,
    price,
    rating,
    type
  } = props;

  return (
    <WrapperCardStyle
  hoverable
  headStyle={{ width: '200px', height: '200px' }}
  style={{ width: '240px' }}
  bodyStyle={{ padding: '10px' }}
  cover={<img alt="example" src="https://laptopcu24h.vn/storage/products/6016/3S2KXSzZjnXTECdGJAan.jpg" />}
>
  <StyleNameProduct>{name}</StyleNameProduct>
  <WrapperReportText>
    <span style={{ marginRight: '4px' }}>
      <span>{rating} </span> 
      <StarFilled style={{ fontSize: '12px', color: 'yellow' }} />
    </span>
    <span> | Còn hàng </span>
  </WrapperReportText>
  <WrapperPriceText>
    <span style={{ marginRight: "8px" }}>{price}</span>
  </WrapperPriceText>
</WrapperCardStyle>

  );
};

export default CardComponent;
