"use client";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient";
import ProductUploadForm from "../../components/ProductUploadForm";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  if (!session) return null;
  // const id = session.data.id;
  if (!session!.data?.id) return null;
  const id = session.data.id 
  return (
    <div className="min-h-screen flex items-center justify-center bg-white flex-col rounded-lg shadow-lg glassmorphism-style">
      <ApolloProvider client={client}>
        <ProductUploadForm userId={id}/>
      </ApolloProvider>
    </div>
  );
}
