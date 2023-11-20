import { gql } from "@apollo/client";

export const GET_REQUESTS = gql`
  query Requests($filters: RequestFiltersInput) {
    requests(filters: $filters) {
      data {
        attributes {
          amountRequested
          status
          hirer {
            data {
              id
              attributes {
                username
              }
            }
          }
          product {
            data {
              id
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

export const GET_REQUESTS_ALL = gql`
  query Requests($filters: RequestFiltersInput) {
    requests(filters: $filters) {
      data {
        attributes {
          hirer {
            data {
              id
              attributes {
                username
              }
            }
          }
          product {
            data {
              id
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
