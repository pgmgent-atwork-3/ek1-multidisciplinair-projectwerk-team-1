import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
    data {
      id
      attributes {
        amountAvailable
        image {
          data {
            id
            attributes {
              url
            }
          }
        }
        name
        owner {
          data {
            id
            attributes {
                username
              }
          }
        }
      }
    }
  }
  }
`;
// change permissions in strapi users (find, findOne)
export const GET_PRODUCTS_FOR_USER = gql`
  query GetProducts($userId: ID!) {
    products(filters: { owner: { id: { eq: $userId } } }) {
      data {
        attributes {
          name
          available
          amountAvailable
          owner {
            data {
              id
              attributes {
                username
              }
            }
          }
          image {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      image {
        id
        userId
      }
      name
    }
  }
`;
