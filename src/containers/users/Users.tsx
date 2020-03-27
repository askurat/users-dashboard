import React, { useState, useEffect, FC } from 'react';
import { Table, Result, Button } from 'antd';
import { useQuery } from '@apollo/client';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ColumnsType } from 'antd/es/table';
import {
  GetUsers,
  GetUsers_users,
  GetUsers_users_orders,
} from '@/__generated__/types';
import Layout from '@/components/Layout/Layout';
import PageHeader from '@/components/PageHeader/PageHeader';
import Stats from '@/components/Stats/Stats';
import DatePicker from '@/components/DatePicker/DatePicker';
import { formatPrice, formatNumber, sortText, sortNumber } from '@/utils/utils';
import { GetUsers as QUERY } from './queries';
// import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

type UserProps = {};
export const Users: FC<UserProps> = () => {
  const [data, setData] = useState<GetUsers['users']>([]);
  const [startDate, setStartDate] = useState('2019-01');
  const [endDate, setEndDate] = useState('2019-03');
  const [topUsers, setTopUsers] = useState<GetUsers_users[]>([]);

  const { loading, data: queryData, error } = useQuery<GetUsers>(QUERY, {
    // Let's add a month to the end date, when sending back to graphql.
    // This allows us to show orders for each month selected.
    variables: { startDate, endDate: dayjs(endDate).add(1, 'month') },
    notifyOnNetworkStatusChange: true,
    partialRefetch: true,
    returnPartialData: true,
    fetchPolicy: 'network-only', // Issue with cache when changing date. We must always return data from server.
  });

  useEffect(() => {
    if (!loading && queryData?.users && queryData.users.length > 0) {
      const { users } = queryData;
      const filteredUsers = users
        .slice()
        .sort((a, b) => b.points - a.points)
        .slice(0, 3);

      setTopUsers(filteredUsers);
      setData(users);
    }
    // }
  }, [loading, queryData]);

  const expandedRowRender = (record: GetUsers_users) => {
    const { orders } = record;
    const columns: ColumnsType<GetUsers_users_orders> = [
      {
        title: 'Orders',
        children: [
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => sortText(a.date, b.date),
            render: (value: string) => (
              <>{dayjs(value).format('MMMM Do YYYY h:hh A')}</>
            ),
          },
          {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            defaultSortOrder: 'descend',
            sorter: (a, b) => sortNumber(a.total, b.total),
            render: (value: number) => <>{formatPrice.format(value)}</>,
          },
        ],
      },
    ];

    return (
      <Table
        rowKey={(order: GetUsers_users_orders) => order.id}
        columns={columns}
        dataSource={orders}
        bordered
        pagination={false}
      />
    );
  };

  const rowExpandable = (record: GetUsers_users) =>
    !!(record?.orders && record.orders.length > 0);

  const columns: ColumnsType<GetUsers_users> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
      sorter: (a, b) => sortText(a.fullname, b.fullname),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      defaultSortOrder: 'descend',
      sorter: (a, b) => sortNumber(a.points, b.points),
      render: (value: number) => <>{formatNumber.format(value)}</>,
    },
  ];

  const onDateChange = (
    _dates: [Dayjs, Dayjs],
    dateStrings: [string, string],
  ) => {
    const [startDt, endDt] = dateStrings;
    setStartDate(startDt);
    setEndDate(endDt);
  };

  const renExtra = () => (
    <>
      <RangePicker
        style={{ verticalAlign: 'middle' }}
        picker="month"
        defaultValue={[dayjs(startDate, 'YYYY-MM'), dayjs(endDate, 'YYYY-MM')]}
        allowEmpty={[false, false]}
        allowClear={false}
        onChange={onDateChange}
      />
    </>
  );

  const renSubTitle = () => {
    const rneder = `${dayjs(startDate).format('MMM')} - ${dayjs(endDate).format(
      'MMM',
    )}`;
    return rneder;
  };

  if (error)
    return (
      <Result
        // status="500"
        title="Query Error"
        subTitle="Oh no, it looks like something went wrong. Try reloading the page."
        extra={<Button type="primary">Back Home</Button>}
      />
    );

  return (
    <Layout>
      <PageHeader subTitle={renSubTitle()} extra={renExtra()}>
        <Stats loading={loading} users={topUsers} />
      </PageHeader>
      <Table
        rowKey={(user: GetUsers_users) => user.id}
        loading={loading}
        dataSource={data}
        columns={columns}
        pagination={{ size: 'small', showSizeChanger: true }}
        expandable={{
          expandedRowRender,
          rowExpandable,
          expandRowByClick: true,
          // expandIcon: ({ expanded, onExpand, record }) =>
          //   expanded ? (
          //     <MinusSquareOutlined onClick={e => onExpand(record, e)} />
          //   ) : (
          //     <PlusSquareOutlined onClick={e => onExpand(record, e)} />
          //   )
        }}
      />
    </Layout>
  );
};

export default Users;
