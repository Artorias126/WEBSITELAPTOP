import React from 'react';
import { Checkbox, Rate } from 'antd';
import { WrapperLableText, WrapperTextValue, WrapperTextPrice, WrapperContent } from './style'; // Import các styled components của bạn

const NavBarComponent = () => {
  const onChange = (value) => {
    console.log(value);
  };

  const renderContent = (type, options) => {
    switch (type) {
      case 'text':
        return options.map((option, index) => (
          <WrapperTextValue key={index}>{option}</WrapperTextValue>
        ));

      case 'checkbox':
        return (
          <Checkbox.Group
            style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}
            onChange={onChange}
          >
            {options.map((option) => (
              <Checkbox key={option.value} style={{ marginLeft: 0 }} value={option.value}>
                {option.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );

      case 'star':
        return options.map((option, index) => (
          <div key={index} style={{ display: 'flex' }}>
            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
            <span> {`${option} sao`}</span>
          </div>
        ));

      case 'price':
        return options.map((option, index) => (
          <WrapperTextPrice key={index}>{option}</WrapperTextPrice>
        ));

      default:
        return null;
    }
  };

  return (
    <div>
      <WrapperLableText>Lable</WrapperLableText>
      <WrapperContent>
        {renderContent('text', ['VGA', 'RAM', 'CPU'])}
      </WrapperContent>
    </div>
  );
};

export default NavBarComponent;
