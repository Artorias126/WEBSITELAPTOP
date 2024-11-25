import { Col, Row, Pagination } from 'antd';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperProducts } from './style';
import { WrapperNavbar } from './style';

const TypeProductPage = () => {
  const onChange = (page) => {
    console.log(page); 
  };

  return (
    <div style={{ padding: '0 120px', background: '#efefef', minHeight: '100vh' }}>
      <Row style={{ flexWrap: 'nowrap', paddingTop: '10px' }}>
        <WrapperNavbar span={4}>
          <NavBarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProducts>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
          </WrapperProducts>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Pagination
              defaultCurrent={2}
              total={100}
              onChange={onChange}
              style={{
                marginTop: '10px',
                marginBottom: '0px',
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
