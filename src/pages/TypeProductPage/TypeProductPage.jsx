import { Col, Row,Pagination } from 'antd';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperProducts } from './style';
import { WrapperNavbar } from './style';

const TypeProductPage = () => {
  const onChange = (page) => {
    console.log(page); // Bạn có thể xử lý logic thay đổi trang ở đây
  };

  return (
    <div style={{ padding: '0 120px', background: '#efefef' }}>
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
          <Pagination
            defaultCurrent={2}
            total={100}
            onChange={onChange}
            style={{ textAlign: 'center', marginTop: '10px',justifyContent: 'center'}}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TypeProductPage;
