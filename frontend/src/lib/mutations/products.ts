import { gql } from "@apollo/client";

export const UPLOAD_MEDIA_MUTATION = gql`
  mutation ($file: Upload!) {
    upload(file: $file) {
      data {
        id
      }
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
 mutation ($imageId: ID!, $productName: String!, $available: Boolean!, $userId: ID!) {
    createProduct(data: { image: $imageId, name: $productName, availableForRental: $available, owner: $userId }) {
      data {
        id
        attributes {
          __typename
          image {
            data {
              attributes {
                name
              }
            }
          }
          createdAt
        }
      }
    }
  }
`;