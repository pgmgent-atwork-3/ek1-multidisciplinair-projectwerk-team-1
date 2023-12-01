"use server"
import { promises as fs } from 'fs';
import axios from 'axios';

export async function loadColorRings(): Promise<Rings> {
  const res = await fs.readFile(process.cwd() + '/src/data/color-rings.json', 'utf8');
  const data: Rings = JSON.parse(res.toString());
  return data;  
}

export async function loadInoxRings(): Promise<Rings> {
  const res = await fs.readFile(process.cwd() + '/src/data/inox-rings.json', 'utf8');
  const data: Rings = JSON.parse(res.toString());
  return data;  
}

export async function saveColorRings(rings: Rings): Promise<void> {
  //Write the modified data back to the file
  await fs.writeFile(process.cwd() + '/src/data/color-rings.json', JSON.stringify(rings), 'utf-8');
}

export async function saveInoxRings(rings: Rings): Promise<void> {
  //Write the modified data back to the file
  await fs.writeFile(process.cwd() + '/src/data/inox-rings.json', JSON.stringify(rings), 'utf-8');
}

export const fetchUser = async (user: User) => {
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

export const updateUser = async (user: UserUpdate) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
  mutation{
    updateUsersPermissionsUser(
      id: ${user.id}, 
      data:{
        username: "${user.email}", email: "${user.email}", stamNr: "${user.stamNr}", voornaam: "${user.voornaam}", achternaam: "${user.achternaam}", telefoon: "${user.telefoon}", gsm: "${user.gsm}", land: "${user.land}", postcode: "${user.postcode}", gemeente: "${user.gemeente}", straat: "${user.straat}", huisNr: "${user.huisnummer}"}){
      data{
        id
        attributes{
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
  }`;
  console.log(query);
  try {
    const response = await axios.post(url, { query });
    return response.data.data.updateUsersPermissionsUser.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const deleteUser = async ({id}:{id : number} ) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
  mutation {
    deleteUsersPermissionsUser(id: "${id}") {
      data {
        id
        attributes {
          email
          username
        }
      }
    }
  }
  `;
  console.log(query);
  try {
    const response = await axios.post(url, { query });
    return response.data.data.deleteUsersPermissionsUser.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createOrder = async (order: OrderQuery) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const colorRingString = JSON.stringify(order.color_ring).replace(/"/g, '');
  const inoxRingString = JSON.stringify(order.inox_ring).replace(/"/g, '');
  const query = `
    mutation {
      createOrder(data: { color_ring: ${colorRingString}, user: ${order.user}, price: ${order.totaal}, inox_ring: ${inoxRingString}, year: "${order.year}" }) {
        data {
          id
          attributes {
            price
            year
            user {
              data {
                id
              }
            }
          }
        }
      }
    }     
`;
console.log(query);
  try {
    const response = await axios.post(url, { query });
    return response.data.data.createOrder.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}