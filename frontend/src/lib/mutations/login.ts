import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: {
        username: $username
        email: $email
        password: $password
      }
    ) {
      user {
        id
        email
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUsersPermissionsUser(
    $stamNr: String!
    $voornaam: String!
    $achternaam: String!
    $telefoon: String!
    $gsm: String!
    $land: String!
    $postcode: String!
    $gemeente: String!
    $straat: String!
    $huisnummer: String!
    $id: ID!
  ) {
    updateUsersPermissionsUser(
      id: $id
      data: {
        stamNr: $stamNr
        voornaam: $voornaam
        achternaam: $achternaam
        telefoon: $telefoon
        gsm: $gsm
        land: $land
        postcode: $postcode
        gemeente: $gemeente
        straat: $straat
        huisNr: $huisnummer
      }
    ) {
      data {
        attributes {
          stamNr
          email
          voornaam
          achternaam
          telefoon
          gsm
          land
          postcode
          gemeente
          straat
          huisNr
        }
      }
    }
  }
`;
