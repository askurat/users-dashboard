import React from 'react';
import { render } from 'react-dom';
import {
  gql,
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
// import {
//   makeExecutableSchema,
//   addMockFunctionsToSchema,
//   MockList
// } from 'graphql-tools';
// import { graphql, GraphQLScalarType, Kind } from 'graphql';
// import faker from 'faker';
import sumBy from 'lodash.sumby';
import isEqual from 'lodash.isequal';
import memoizeOne from 'memoize-one';

import { App } from '@/App';

// Fill this in with the schema string
// const schemaString = `
//   scalar Date
//   type User { id: ID, name: String }
//   type Customer { id: ID, name: String, transactions: [Transaction] }
//   type Transaction {
//     id: ID
//     customer: Customer
//     products: [Product]
//     total: Float
//     date: Date
//   }
//   type Product {
//     id: Int
//     name: String
//     price: Float
//   }
//   type Query { user(id: ID): User, customers: [Customer], customer(id: ID): Customer, product(id: ID): Product, products: [Product], transactions: [Transaction] }
// `;

// const total = (arr: [], field: string) => sumBy(arr, field);
// const memoizeTotal = memoizeOne(total, isEqual);

// const resolverMap = {
//   // Query: {
//   //   customers: () => {
//   //     const customer = []
//   //     for(let i=0;i<20;i++) {
//   //       customer.push({ id: i, name: faker.name.findName(), transactions: new MockList(5) });
//   //     }
//   //   }
//   // },
//   // Transaction: {
//   //   total: ({ products }: { products: [] }) => {
//   //     debugger;
//   //     return memoizeTotal(products, 'price');
//   //   }
//   // },
//   Date: new GraphQLScalarType({
//     name: 'Date',
//     description: 'Date custom scalar type',
//     parseValue(value) {
//       return new Date(value); // value from the client
//     },
//     serialize(value) {
//       return new Date(value).getTime(); // value sent to the client
//     },
//     parseLiteral(ast) {
//       if (ast.kind === Kind.INT) {
//         return parseInt(ast.value, 10); // ast value is always in string format
//       }
//       return null;
//     }
//   })
// };

// Make a GraphQL schema with no resolvers
// const schema = makeExecutableSchema({
//   typeDefs: schemaString,
//   resolvers: resolverMap
// });

// const mocks = {
//   Query: () => ({
//     user: (o: any, { id }: any) => ({ id }),
//     customers: () => new MockList(20),
//     products: () => new MockList(20),
//     transactions: () => new MockList(20)
//   }),
//   User: () => ({
//     name: () => faker.name.findName()
//   }),
//   Customer: () => ({
//     name: () => faker.name.findName(),
//     transactions: () => new MockList(5)
//   }),
//   Product: () => ({
//     name: () => faker.commerce.productName(),
//     price: () => faker.finance.amount(1)
//   }),
//   Transaction: () => ({
//     products: () => new MockList(5),
//     date: () => faker.date.recent()
//   })
// };

// Add mocks, modifies schema in place
// addMockFunctionsToSchema({ schema, mocks });

// const query = `{
//   user(id: 6) { id, name }
// }`;

// const query = `{
//   customers { id, name, transactions { products { name, price }, total, date } }
// }`;

// const query = `{
//   products { id, name }
// }`;

// const query = `{
//   transactions { id, customer { name }, product { name }, date }
// }`;

// graphql(schema, query).then(result => console.log('Got result', result));

const typeDefs = gql`
  extend type User {
    points: Float
  }

  extend type Order {
    total: Float
  }
`;

const calculateTotal = (arr: [], field: string) => sumBy(arr, field);
const memoizeTotal = memoizeOne(calculateTotal, isEqual);

const calculatePoints = (total: number) => {
  if (total > 50) {
    if (total > 100) {
      return 2 * (total - 100) + 50;
    }

    return total - 50;
  }

  return 0;
};

const memoizePoints = memoizeOne(calculatePoints, isEqual);

const resolvers = {
  User: {
    points: ({ orders }: { orders: any }) => {
      let total = 0;
      orders.forEach((order: any) => {
        total += memoizeTotal(order.products, 'price');
      });
      return memoizePoints(total);
    },
  },
  Order: {
    total: ({ products }: { products: any }) => memoizeTotal(products, 'price'),
  },
};

const httpLink = new HttpLink({
  uri: 'https://fakeql.com/graphql/78ca6bf8e79dc3c3f80a68c609cdbb0e',
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  // link: new SchemaLink({ schema })
  link: httpLink,
  typeDefs,
  resolvers,
  connectToDevTools: true,
});

const WrappedApp = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(WrappedApp, document.getElementById('root'));
