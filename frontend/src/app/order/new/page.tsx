"use client";
import RingOrder from "@/app/components/RingOrder";
import { CREATE_ORDER } from "@/lib/mutations/orders";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { loadColorRings } from "@/app/api/api";
import { loadInoxRings } from "@/app/api/api";

const NewOrder = () => {
  const [colorRings, setColorRings] = useState<Rings>([]);
  const [inoxRings, setInoxRings] = useState<Rings>([]);
  const [order, setOrder] = useState<{price: number, userId: string, colorRing: Rings, inoxRing: Rings}>({ price: 0 , userId: "", colorRing: [], inoxRing: [] });
  const [createOrder] = useMutation(CREATE_ORDER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
    console.log(order);
  };

  const handleRingChange = (rings: Rings) => {
    setOrder({ ...order, colorRing: rings });
    console.log(order);
  }

  const handleSubmit = async () => {
    console.log(order);
    createOrder({
      variables: {
        data: {
          price: order.price,
          user: order.userId,
          color_ring: order.colorRing,
          inox_ring: order.inoxRing,
        }
      }
    })
  };

  useEffect(() => {
    const fetchColorRings = async () => {
      const rings = await loadColorRings();
      setColorRings(rings);
    };
    fetchColorRings();
  }, [colorRings]);

  useEffect(() => {
    const fetchInoxRings = async () => {
      const rings = await loadInoxRings();
      setInoxRings(rings);
    };
    fetchInoxRings();
  }, [inoxRings]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">New Order</h1>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="userId" className="block mb-2 font-medium">UserId</label>
          <input
            type="text"
            id="userId"
            name="userId"
            onChange={handleChange}
            value={order.userId}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2 font-medium">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleChange}
            value={order.price}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <h2>Color rings</h2>
        <RingOrder rings={colorRings} setRings={handleRingChange} />
        <h2>Inox rings</h2>
        <RingOrder rings={inoxRings} setRings={handleRingChange} />
      </form>
    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default NewOrder