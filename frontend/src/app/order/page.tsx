"use client";
import { GET_ORDERS } from "@/lib/queries/orders";
import { useQuery } from "@apollo/client";

const Order = () => {
  const { data, loading, error } = useQuery(GET_ORDERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (!data) return <p>No data</p>;
  return (
    <>
      {data.orders.data.map((item: Order) => (
        <div key={item.id}>
          <h1>{item.id}</h1>
          {item.attributes.color_ring
            .filter((ring: Ring) => ring.amount > 0)
            .map((ring: Ring) => (
              <p key={ring.price}>
                {ring.size} / {ring.amount}
              </p>
            ))}
        </div>
      ))}
    </>
  );
}

export default Order