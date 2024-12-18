import { Table } from 'antd';
import React, { useState } from 'react';


const TableComponent = (props) => {
  const { selectionType = 'checkbox', data = [], columns = [], handleDeleteManyProducts ,handleDeleteMany, pageType, deletedSuccessfully  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);

  // Row selection configuration
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setRowSelectedKeys(selectedRowKeys); // Cập nhật key đã chọn
    },
  };

  const handleDeleteAll = () => {
    if (rowSelectedKeys.length > 0) {
      if (pageType === 'AdminProduct.jsx') {
        handleDeleteManyProducts(rowSelectedKeys); // Xoá cho AdminProduct.jsx
      } else if (pageType === 'AdminUser.jsx') {
        handleDeleteMany(rowSelectedKeys); // Xoá cho AdminUser.jsx
      }
    }
  };
  return (
    <>
      {rowSelectedKeys.length >= 2 && !deletedSuccessfully && (
        <div
          style={{
            background: '#1d1ddd',
            color: '#fff',
            fontWeight: 'bold',
            padding: '10px',
            cursor: 'pointer',
          }}
          onClick={handleDeleteAll}
        >
          Xóa tất cả
        </div>
      )}

      <Table
        rowSelection={
          selectionType === 'checkbox' || selectionType === 'radio'
            ? { type: selectionType, ...rowSelection }
            : undefined
        }
        columns={columns}
        dataSource={data}
        {...props}
      />
    </>
  );
};

export default TableComponent;
