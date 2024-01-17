"use client"
import { NextAuthProvider } from '@/provider/AuthProvider';
import { ApolloProvider } from '@apollo/client';
import { client } from '@/lib/apolloClient';




type Props = {
  children: React.ReactNode;
};


export default function RootLayout({
  children,
}: 
  Props
) {
  return (
    <ApolloProvider client={client}>
      <NextAuthProvider>
    {children}
      </NextAuthProvider>
    </ApolloProvider>
  )
}
