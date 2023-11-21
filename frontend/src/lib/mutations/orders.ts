import { gql } from '@apollo/client';

export const CREATE_ORDER = gql`
  mutation CreateOrder($variables: OrderInput!) {
    createOrder(data: $variables) {
      data {
        id
        attributes {
          price
          user {
            data {
              id
            }
          }
          color_ring
          inox_ring
        }
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, input: $input) {
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

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
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