import { gql } from '@apollo/client';

export const GET_MAILS = gql`
  query GetMails {
    mails {
      data {
        id
        attributes {
          name
          price
        }
      }
    }
  }
`;