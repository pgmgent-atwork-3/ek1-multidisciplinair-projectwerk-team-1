"use client";

import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS, GET_PRODUCTS_FOR_USER } from "@/lib/queries/products";
import { CREATE_REQUEST } from "@/lib/mutations/request";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
const page = () => {
  const session = useSession();
  // console.log("session", session);
  const { data, loading, error } = useQuery(GET_PRODUCTS)  
	const [amountToRequest, setAmountToRequest] = useState(0);
  const [createRequest] = useMutation(CREATE_REQUEST);

  if (!session) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>No data</p>;

  const handleAmountToRequestChange = (event: any) => {
    setAmountToRequest(event.target.value);
  };

  const requestProduct = async (id: string) => {
    const product = data.products.data.find(
      (product: Product) => product.id === id
    );
    const amountAvailable = product.attributes.amountAvailable;
    const requestedAmount =
      amountToRequest > amountAvailable ? amountAvailable : amountToRequest;
    console.log(`Requesting ${requestedAmount} of ${product.attributes.name}`);
    console.log(`Renter: ${session.data?.id}`);
    createRequest({
      variables: {
        productId: id,
        data: {
          endDate: null,
          hirer: session.data?.id,
          product: id,
          startDate: null,
          status: "pending",
          amountRequested: requestedAmount,
        },
      },
    });
  };

	if(!data.products) return (
		<>
			<p>No data available</p>
			
		</>
	);

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.products.data.map((product: Product) => (
          <li key={product.id} className="bg-white shadow-lg rounded-lg p-4">
            <div className="relative">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}${product.attributes.image.data.attributes.url}`}
                alt={product.attributes.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div
                className={`absolute top-2 right-2 px-2 py-1 rounded-full ${
                  product.attributes.amountAvailable > 0
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {product.attributes.amountAvailable > 0
                  ? "available"
                  : "not available"}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                {product.attributes.name}
              </h3>
              <p className="text-gray-700 mb-2">
                Amount Available: {product.attributes.amountAvailable}
              </p>
              <p className="text-gray-700 mb-2">
								{/* TODO: add */}
                {/* Renter ID:{" "}
                {
                  product.attributes.owner.data.attributes
                    .username
                } */}
              </p>
              {product.attributes.amountAvailable > 0 ? (
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    min="1"
                    max={product.attributes.amountAvailable}
                    defaultValue="1"
                    className="w-16 h-10 border-gray-300 rounded-md"
                    onChange={handleAmountToRequestChange}
                  />
                  <button
                    onClick={() => requestProduct(product.id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600"
                  >
                    Request
                  </button>
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default page;
