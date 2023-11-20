"use client";

import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_FOR_USER } from "@/lib/queries/products";
import { useSession } from "next-auth/react";

const page = () => {
  const session = useSession();
  console.log(session);
  const { data, loading, error } = useQuery(GET_PRODUCTS_FOR_USER, {
    variables: { userId: session?.data?.id },
  });
  if (!session) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>No data</p>;
  return (
    <>
      <Link href="/./products/new">New product</Link>
      <ul>
        {data.products.data.map((product: Product) => (
          <li key={product.id}>
            <h3>{product.attributes.name}</h3>
          </li>
        ))}
      </ul>
    </>
  );
};

export default page;
