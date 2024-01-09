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

export const UPDATE_MAIL = gql`
  mutation UpdateMail($id: ID!, $name: String!, $price: Float!) {
    updateMail(id: $id, data: { name: $name, price: $price }) {
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

export const CREATE_MAIL = gql`
  mutation CreateMail($name: String!, $price: Float!) {
    createMail(data: { name: $name, price: $price }) {
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

export const DELETE_MAIL = gql`
  mutation DeleteMail($id: ID!) {
    deleteMail(id: $id) {
      data {
        id
      }
    }
  }
`;