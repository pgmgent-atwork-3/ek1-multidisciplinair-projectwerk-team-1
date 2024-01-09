import { gql } from "@apollo/client";
export const ALL_ORDERS = gql`
query {
    orders {
      data {
        id
        attributes {
          price
          year
          paid
          month
          processed
          color_ring 
          inox_ring 
          user {
            data {
              id
              attributes {
                voornaam
                achternaam
                stamNr
              }
            }
          }
        }
      }
    }
  }
    `;
