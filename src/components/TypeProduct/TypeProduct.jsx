import React from 'react';
import { useNavigate } from 'react-router-dom';

const TypeProduct = ({ name }) => {
  const navigate = useNavigate();

  const handleNavigatetype = (type) => {
    const normalizedType = type
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
      .replace(/ /g, '_'); // Thay khoảng trắng bằng dấu gạch dưới
    navigate(`/product/${normalizedType}`, { state: type });
  };

  return (
    <div
      style={{ padding: '0 10px', cursor: 'pointer' }}
      onClick={() => handleNavigatetype(name)}
    >
      {name}
    </div>
  );
};

export default TypeProduct;
