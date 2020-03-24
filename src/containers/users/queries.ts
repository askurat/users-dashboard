import { gql } from '@apollo/client';

export const GetUsers = gql`
  query GetUsers($startDate: DateTime, $endDate: DateTime) {
    users {
      id
      fullname
      email
      username
      avatar
      orders(where: { date_gt: $startDate, date_lt: $endDate }) {
        id
        date
        products {
          name
          price
        }
        total @client
      }
      points @client
    }
  }
`;
