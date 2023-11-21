"use client";
import { CREATE_ORDER } from "@/lib/mutations/orders";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import LoadColorRings from "@/app/api/api";

const NewOrder = () => {
  const [order, setOrder] = useState({ price: 0 , userId: "", colorRing: [], inoxRing: [] });
  const [colorRings, setColorRings] = useState<Ring[]>([]);
  const [createOrder, createOrderState] = useMutation(CREATE_ORDER);

  useEffect(() => {
    const fetchColorRings = async () => {
      const rings = await LoadColorRings();
      setColorRings(rings);
    };
    fetchColorRings();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
    console.log(order);
  };

  const handleRingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (order.colorRing.find((ring: Ring) => ring.size === parseFloat(event.target.name))) {
      const i = order.colorRing.findIndex((ring: Ring) => ring.size === parseFloat(event.target.name));
      order.colorRing[i].amount = parseInt(event.target.value);
      setOrder({ ...order, colorRing: order.colorRing });
    } else {
      order.colorRing.push({size: parseFloat(event.target.name), amount: parseInt(event.target.value), price: colorRings.find((ring: Ring) => ring.size === parseFloat(event.target.name))?.price || 0});
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrder({
      variables: {
        price: order.price,
        userId: order.userId,
        colorRing: order.colorRing,
        inoxRing: order.inoxRing,
      }
    })
  };

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
          {colorRings.map((ring: Ring) => (
          <div className="flex mb-4" key={ring.size}>
            <div className="mr-4">
              <label htmlFor="size" className="block mb-2 font-medium">Size</label>
              <input
              type="number"
              id="size"
              name="size"
              value={ring.size}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
              />
            </div>
            <div className="mr-4">
              <label htmlFor="price" className="block mb-2 font-medium">Price per ring</label>
              <input
              type="number"
              id="price"
              name="price"
              step={0.05}
              value={ring.price}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled
              />
            </div>
            <div className="mr-4">
              <label htmlFor="amount" className="block mb-2 font-medium">Amount</label>
              <input
              type="number"
              id="amount"
              name={(ring.size).toString()}
              onChange={handleRingChange}
              value={ring.amount}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
        </div>
        ))}
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

export default NewOrder