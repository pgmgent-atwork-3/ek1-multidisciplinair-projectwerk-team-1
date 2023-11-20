import { gql } from "@apollo/client";

export const CREATE_REQUEST = gql`
  mutation Mutation($data: RequestInput!) {
    createRequest(data: $data) {
      data {
        attributes {
          product {
            data {
              attributes {
                name
              }
            }
          }
        }
        id
      }
    }
  }
`;

export const DELETE_REQUEST = gql`
  mutation Mutation($id: ID!) {
    deleteRequest(id: $id) {
      data {
        attributes {
          product {
            data {
              attributes {
                name
              }
            }
          }
        }
        id
      }
    }
  }
`;

export const UPDATE_REQUEST_STATUS = gql`
  mutation Mutation($updateRequestId: ID!, $data: RequestInput!) {
    updateRequest(id: $updateRequestId, data: $data) {
      data {
        attributes {
          status
        }
      }
    }
  }
`;
