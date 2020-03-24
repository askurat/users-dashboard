import React from 'react';
// import { or, explicitNull } from 'airbnb-prop-types';
// import useStyles from 'isomorphic-style-loader/useStyles';
import { Card, Row, Col, Statistic, Skeleton, Avatar } from 'antd';
import { SafetyCertificateTwoTone } from '@ant-design/icons';
// import { Aggregate } from '@gen/apollo-typings';
import './Stats.css';
import { GetUsers_users } from '@/__generated__/types';
// import { formatNumber } from './utils';

const { Meta } = Card;

type ColumnProps = {
  user: GetUsers_users;
  iconColor: string;
  className: string;
};

// const Info: FC<InfoProps> = ({ children, title, bordered, loading }) => (
//   <div className="statsHeaderInfo">
//     <Skeleton
//       loading={loading}
//       title={{ width: '250px' }}
//       paragraph={false}
//       active
//     >
//       <span>{title}</span>
//     </Skeleton>
//     <Skeleton
//       className="statsHeaderInfo-stats"
//       loading={loading}
//       title={{ width: '50px' }}
//       paragraph={false}
//       active
//     >
//       {children}
//     </Skeleton>
//     {bordered && <em />}
//   </div>
// );

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
