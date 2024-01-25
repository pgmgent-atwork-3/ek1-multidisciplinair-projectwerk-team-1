"use server";
import { promises as fs } from "fs";
import axios from "axios";

export async function loadColorRings(): Promise<Rings> {
  const res = await fs.readFile(
    process.cwd() + "/src/data/color-rings.json",
    "utf8"
  );
  const data: Rings = JSON.parse(res.toString());
  return data;
}

export async function loadInoxRings(): Promise<Rings> {
  const res = await fs.readFile(
    process.cwd() + "/src/data/inox-rings.json",
    "utf8"
  );
  const data: Rings = JSON.parse(res.toString());
  return data;
}

export async function saveColorRings(rings: Rings): Promise<void> {
  //Write the modified data back to the file
  await fs.writeFile(
    process.cwd() + "/src/data/color-rings.json",
    JSON.stringify(rings),
    "utf-8"
  );
}

export async function saveInoxRings(rings: Rings): Promise<void> {
  //Write the modified data back to the file
  await fs.writeFile(
    process.cwd() + "/src/data/inox-rings.json",
    JSON.stringify(rings),
    "utf-8"
  );
}

export const fetchUser = async (id: String) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
  query {
    usersPermissionsUser (id: "${id}") {
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
          lid
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
    usersPermissionsUsers (pagination: { limit : 100 }) {
      data {
        id
        attributes {
          email
          achternaam
          voornaam
          stamNr
          lid
        }
      }
    }
  }
  `;
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
  let query: string;
  console.log(user);
  if (user.lid) {
    query = `
              mutation{
                updateUsersPermissionsUser(
                  id: ${user.id}, 
                  data:{lid: ${user.lid}}){
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
  } else {
    query = `
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
  }

  try {
    const response = await axios.post(url, { query });
    return response.data.data.updateUsersPermissionsUser.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteOrder = async ({ id }: { id: number }) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
  mutation {
    deleteOrder(id: "${id}") {
      data {
        id
      }
    }
  }
  `;
  try {
    const response = await axios.post(url, { query });
    return response.data.data.deleteOrder.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteUser = async ({ id }: { id: number }) => {
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
  const colorRingString = JSON.stringify(order.color_ring).replace(/"/g, "");
  const inoxRingString = JSON.stringify(order.inox_ring).replace(/"/g, "");
  const query = `
    mutation {
      createOrder(data: { month:"${order.month}",processed: false, paid: ${order.payment} , color_ring: ${colorRingString}, user: ${order.user}, price: ${order.totaal}, inox_ring: ${inoxRingString}, year: "${order.year}" }) {
        data {
          id
          attributes {
            price
            year
            month
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
  try {
    const response = await axios.post(url, { query });
    return response.data.data.createOrder.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchAllOrders = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
  query {
    orders(pagination: { limit : 100 }) {
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
                email
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
    return response.data.data.orders.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const fetchOrderById = async (id: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
  query {
    order(id: ${id}) {
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
  try {
    const response = await axios.post(url, { query });
    return response.data.data.order.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateOrderProcess = async (id: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  const query = `
  mutation {
    updateOrder(id: ${id}, data: { processed: true }) {
      data {
        id
        attributes {
          processed
        }
      }
    }
  }
  `;
  try {
    const response = await axios.post(url, { query });
    return response.data.data.updateOrder.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateOrderPaid = async (id: number, boolean: boolean) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/graphql`;
  let query;
  if (boolean) {
    query = `
        mutation {
          updateOrder(id: ${id}, data: { paid: true }) {
            data {
              id
              attributes {
                paid
              }
            }
            }
          }`;
  } else {
    query = `
        mutation {
          updateOrder(id: ${id}, data: { paid: false }) {
            data {
              id
              attributes {
                paid
              }
            }
            }
          }`;
  }
  try {
    const response = await axios.post(url, { query });
    return response.data.data.updateOrder.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
