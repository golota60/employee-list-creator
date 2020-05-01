import React from 'react';
import './EmployeeTable.scss';
import { Employee } from '../utils/interfaces';
import { Table } from 'antd';

interface EmployeeTableProps {
  className?: string;
  arrayToDisplay: Array<Employee>;
  title?: string;
}

const EmployeeTable = ({
  arrayToDisplay,
  title,
  className,
}: EmployeeTableProps) => {
  function createClassName() {
    return className ? className : '';
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="name-column">{text}</span>,
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
      key: 'surname',
      render: (text: string) => <span className="name-column">{text}</span>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Province',
      dataIndex: 'province',
      key: 'province',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
  ];

  return (
    <Table
      className={`employee-table ${createClassName()}`}
      title={title ? () => title : undefined}
      rowKey={employee => employee._id}
      dataSource={arrayToDisplay}
      columns={columns}
      size="large"
      pagination={{ pageSize: 5 }}
      scroll={{ y: 200 }}
    ></Table>
  );
};

export default EmployeeTable;
