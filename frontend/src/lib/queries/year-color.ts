import { gql } from '@apollo/client';

export const GET_YEAR_COLORS = gql`
  query GetYearColors {
    yearColors {
      data {
        id
        attributes {
          year
          color
        }
      }
    }
  }
`;