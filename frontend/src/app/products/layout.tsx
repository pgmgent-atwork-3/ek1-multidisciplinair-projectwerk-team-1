"use client"
import { ApolloProvider } from '@apollo/client'
import { client, createClient } from '@/lib/apolloClient'
import { useSession } from 'next-auth/react'


export default function Layout({ children }: { children: React.ReactNode }) {
	// aangepast naar createClient
	const token = useSession()?.data?.jwt
	const client = createClient(token)
  return (
    <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}
