import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"; // Import GoogleProvider
import { LOGIN_MUTATION } from "@/lib/mutations/login";
import { client } from "@/lib/apolloClient";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email:",
          type: "text",
          placeholder: "your-cool-email",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        try {
          const { data } = await client.mutate({
            mutation: LOGIN_MUTATION,
            variables: {
              identifier: credentials.email,
              password: credentials.password,
            },
          });
          // console.log("data", data)
          const { user, jwt } = data.login;
          return { ...user, jwt };
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session = {...token, ...session};
      return session;
    },
    async jwt({ token, user, account }) {

      const isSignIn = user ? true : false;
      if (isSignIn && account?.provider === "credentials") {
        token = {...user, ...token};
        console.log("User logged in");
      }
      
      return token;
    },
  },
};

