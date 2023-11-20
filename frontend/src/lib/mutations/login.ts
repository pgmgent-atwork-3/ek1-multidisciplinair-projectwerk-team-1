import { gql } from '@apollo/client';

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
  mutation RegisterUser($stamNr: String!, $email: String!, $password: String!, $voornaam: String!, $achternaam: String!, $telefoon: String!, $gsm: String!, $land: String!, $postcode: String!, $gemeente: String!, $straat: String!, $huisnummer: String!) {
    register(input: { stamNr: $stamNr, email: $email, password: $password, voornaam: $voornaam, achternaam: $achternaam, telefoon: $telefoon, gsm: $gsm, land: $land, postcode: $postcode, gemeente: $gemeente, straat: $straat, huisnummer: $huisnummer }) {
      user {
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
        huisnummer
      }
    }
  }
`;