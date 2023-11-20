"use client"
import { useEffect, useState } from "react";
import loadData from "@/app/api/api";
import { GET_ORDERS } from "@/lib/queries/orders";
import { useQuery } from "@apollo/client";

export default function Page() {
  const [data2, setData] = useState<any>([]);
  const { data, loading, error } = useQuery(GET_ORDERS)

  useEffect(() => {
    async function fetchData() {
      const data = await loadData();
      setData(data2);
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <>
      {data.map((item: any) => (
        <div key={item.id}>
          <h1>{item.size}</h1>
          <p>{item.price}</p>
        </div>
      ))}
    </>
  );
}