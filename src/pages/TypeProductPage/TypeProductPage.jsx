import { Col, Row, Pagination } from 'antd';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperProducts, WrapperNavbar } from './style';
import * as ProductService from '../../services/ProductService';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';

const TypeProductPage = () => {
  const { state } = useLocation();
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct);
  const [products, setProducts] = useState([]);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });

  // Hàm lấy dữ liệu sản phẩm từ API
  const fetchProductType = async (type, page, limit) => {
    try {
      const res = await ProductService.getProductType(type, page, limit);
      if (res?.status === 'OK') {
        console.log('Fetched products:', res?.data);  // Kiểm tra dữ liệu sản phẩm
        setProducts(res?.data);
        setPanigate({ ...panigate, total: res?.totalPage });
      } else {
        console.error('Failed to fetch product type');
      }
    } catch (error) {
      console.error('Error fetching product type:', error);
    }
  };

  // useEffect để fetch dữ liệu mỗi khi `state`, `panigate.page` hoặc `panigate.limit` thay đổi
  useEffect(() => {
    console.log('Fetching products for type:', state, 'page:', panigate.page, 'limit:', panigate.limit); // Log state và phân trang
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);

  // Hàm thay đổi phân trang
  const onChange = (current, pageSize) => {
    console.log('Page changed:', current, 'Page size:', pageSize);  // Log giá trị của page và pageSize
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

  // Kiểm tra dữ liệu sản phẩm khi render
  console.log('Products:', products);  // Kiểm tra giá trị của products

  return (
    <div style={{ width: '100%', background: '#efefef', height: 'calc(100vh - 64px)' }}>
      <div style={{ width: '1270px', margin: '0 auto', height: '100%' }}>
        <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', height: 'calc(100% - 20px)' }}>
          <WrapperNavbar span={4}>
            <NavBarComponent />
          </WrapperNavbar>
          <Col span={20}>
            <WrapperProducts>
            {products?.filter((pro) => {
                if (searchDebounce) {
                  return pro?.name?.toLowerCase()?.includes(searchDebounce.toLowerCase());
                }
                return true; // Nếu không có tìm kiếm thì giữ lại tất cả sản phẩm
              })?.map((product) => {
                return (
                  <CardComponent
                    key={product._id}
                    countInStock={product.countInStock}
                    description={product.description}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    rating={product.rating}
                    type={product.type}
                    selled={product.selled}
                    discount={product.discount}
                    id={product._id}
                  />
                );
              })}
            </WrapperProducts>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50%' }}>
              <Pagination
                defaultCurrent={panigate.page + 1}
                total={panigate?.total}
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
    </div>
  );
};

export default TypeProductPage;
