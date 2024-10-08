import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query GetOrders{
    orders {
      data {
        id
        attributes {
          price
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
          color_ring
          inox_ring
        }
      }
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      data {
        id
        attributes {
          price
          user {
            data {
              id
              attributes {
                username
              }
            }
          }
          color_ring
          inox_ring
        }
      }
    }
  }
`;