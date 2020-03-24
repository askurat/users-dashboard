/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsers
// ====================================================

export interface GetUsers_users_orders_products {
  __typename: "Product";
  name: string;
  price: number;
}

export interface GetUsers_users_orders {
  __typename: "Order";
  id: string;
  date: any;
  products: (GetUsers_users_orders_products | null)[];
  total: number | null;
}

export interface GetUsers_users {
  __typename: "User";
  id: string;
  fullname: string;
  email: string;
  username: string;
  avatar: string;
  orders: (GetUsers_users_orders | null)[] | null;
  points: number | null;
}

export interface GetUsers {
  users: (GetUsers_users | null)[] | null;
}

export interface GetUsersVariables {
  startDate?: any | null;
  endDate?: any | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
