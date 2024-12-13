import {Table } from 'antd';
import React, { useState } from 'react';

const TableComponent = (props) => {
    const { selectionType = 'checkbox' } = props;
    

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 47,
            address: 'London No. 1 Park Lane',
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Disable checkbox for specific rows
        }),
    };

    return (
        <div>
            <Table
                rowSelection={
                    selectionType === 'checkbox' || selectionType === 'radio'
                        ? { type: selectionType, ...rowSelection }
                        : undefined
                }
                columns={columns}
                dataSource={data}
            />
        </div>
    );
};

export default TableComponent;
