import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Number of shifts',
    dataIndex: 'shifts',
    key: 'shifts',
  },
  {
    title: 'Shift direction',
    dataIndex: 'shiftDir',
    key: 'shiftDir',
  },
  {
    title: 'HD value',
    dataIndex: 'hdValue',
    key: 'hdValue',
  },
]

export const MatchingDataTable = ({ matchingResults }) => {
  const tableData = matchingResults.hammingDistances.map((hdValue, index) => ({
    key: index + 1,
    shifts: index === 0 ? 0 : Math.ceil(index/2),
    shiftDir: index === 0 ? '-' : index % 2 ? 'Left' : 'Right',
    hdValue,
  }));

  const dummyRow = {
    key: 0,
    shifts: '',
    shiftDir: '',
    hdValue: '',
  };

  return (
    <Table
      columns={columns}
      dataSource={[dummyRow, ...tableData]}
      pagination={{
        pageSize: 2,
        size: 'small',
      }}/>
  );
};
