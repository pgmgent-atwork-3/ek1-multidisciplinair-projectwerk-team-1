import { ApolloClient, DefaultOptions, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// @ts-ignore
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";


let token = null;
// if we want no cache
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const getAuthorization = (token) => {
  console.log("TOKEN", token)
  // const token  = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk5ODg5MTg4LCJleHAiOjE3MDI0ODExODh9.5yRy5pJwEoV-Bnz1LQaGKUCofe3AItTI_SijHGN1KAw";
  return token ? `Bearer ${token}` : "";
}

const authLink = setContext((_, { headers }) => {
    return {
    headers: {
      ...headers,
    },
  };
});

const createAuthLink = (token) => {
  return setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: getAuthorization(token), 
      },
    };
  });
}


const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  headers: {
    // "keep-alive": "true"
  }
});


export const client = new ApolloClient({
  link: authLink.concat(uploadLink), // Replace with your Strapi GraphQL endpoint
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
  connectToDevTools: true,
  credentials: 'same-origin'
});

export const createClient = (token) => {
  const newAuthLink = createAuthLink(token);
  return new ApolloClient({
    link: newAuthLink.concat(uploadLink), // Replace with your Strapi GraphQL endpoint
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions,
    connectToDevTools: true,
    credentials: 'include',
    headers: {
      authorization: getAuthorization(token), 
    },
  });;
}
