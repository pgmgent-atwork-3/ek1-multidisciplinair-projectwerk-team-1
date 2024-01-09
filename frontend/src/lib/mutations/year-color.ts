import { gql } from '@apollo/client';

export const GET_YEAR_COLOR_BY_YEAR = gql`
  query GetYearColorByYear($year: Int!) {
    year_color_by_year(year: $year) {
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

export const CREATE_YEAR_COLOR = gql`
  mutation CreateYearColor($year: Int!, $color: String!) {
    createYearColor(data: { year: $year, color: $color }) {
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

export const UPDATE_YEAR_COLOR = gql`
  mutation UpdateYearColor($id: ID!, $year: Int!, $color: String!) {
    updateYearColor(id: $id, data: { year: $year, color: $color }) {
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

export const DELETE_YEAR_COLOR = gql`
  mutation DeleteYearColor($id: ID!) {
    deleteYearColor(input: { id: $id }) {
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