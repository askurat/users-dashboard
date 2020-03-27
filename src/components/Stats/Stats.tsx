import React from 'react';
import { Card, Row, Col, Statistic, Skeleton, Avatar } from 'antd';
import { SafetyCertificateTwoTone } from '@ant-design/icons';
import { GetUsers_users } from '@/__generated__/types';

const { Meta } = Card;

type ColumnProps = {
  user: GetUsers_users;
  iconColor: string;
  className: string;
};

type PropTypes = {
  loading: boolean;
  users: GetUsers_users[];
};

const Stats = ({ loading, users }: PropTypes) => {
  const [first, second, third] = users;

  const Column = ({ user, iconColor, className }: ColumnProps) => (
    <Col sm={8} xs={24} key={user?.id}>
      <Card bordered={false}>
        <Skeleton loading={loading} avatar active>
          <Meta
            avatar={<Avatar src={user?.avatar} />}
            description={
              <Statistic
                title={user?.fullname}
                value={user?.points}
                precision={0}
                className={className}
                prefix={<SafetyCertificateTwoTone twoToneColor={iconColor} />}
                suffix="points"
              />
            }
          />
        </Skeleton>
      </Card>
    </Col>
  );

  return (
    <Row gutter={16} style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Column className="stat-second" user={second} iconColor="#A7A7AD" />
      <Column className="stat-first" user={first} iconColor="#D6AF36" />
      <Column className="stat-third" user={third} iconColor="#824A02" />
    </Row>
  );
};

export default Stats;
