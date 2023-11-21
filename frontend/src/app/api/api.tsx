"use server"
import { promises as fs } from 'fs';
import axios from 'axios';

export default async function loadColorRings(): Promise<any> {
  //Read the json data file data.json
  const res = await fs.readFile(process.cwd() + '/src/data/color-rings.json', 'utf8');
  const data: Rings = JSON.parse(res.toString());
  //Return the content of the data file in json format
  return data;  
}

export const fetchUser = async (user: any) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  console.log(user);
  const query = `
  query {
    usersPermissionsUser (id: "${user}") {
      data {
        id
        attributes {
          username
          email
          role{
            data{
              attributes{
                name
              }
            }
          }
        }
      }
    }
  }
  `;
  try {
    const response = await axios.post(url, { query });
    return response.data.data.usersPermissionsUser.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchAllUsers = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
  query {
    usersPermissionsUsers {
      data {
        id
        attributes {
          email
          achternaam
          voornaam
          stamNr
        }
      }
    }
  }
  `;
  console.log(query);
  try {
    const response = await axios.post(url, { query });
    return response.data.data.usersPermissionsUsers.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};