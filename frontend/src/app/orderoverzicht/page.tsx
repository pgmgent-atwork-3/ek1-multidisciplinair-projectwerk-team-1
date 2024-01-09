"use client";
import { fetchAllOrders } from "@/app/api/api";
import DeleteOrder from "@/app/components/buttons/DeleteOrder";
import BetaalOrder from "@/app/components/buttons/BetaalOrder";
import DontBetaalOrder from "@/app/components/buttons/DontBetaalOrder";
import { useEffect, useState } from "react";
import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_ORDERS } from "@/app/api/order";

const OrderoverzichtPage = () => {
  const { data, loading, error } = useQuery(ALL_ORDERS);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    if (data) {
      setOrderData(data.orders.data);
    }
  }, [data]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(error)</p>;

  return (
    <div>
      <h1>Orderoverzicht</h1>

      <h2>Geschiedenis</h2>
      <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-8 gap-4 ml-6 mr-6">
        <p className="text-lg font-semibold">StamNr</p>
        <p className="text-lg font-semibold">Month</p>
        <p className="text-lg font-semibold">Jaar</p>
        <p className="text-lg font-semibold">Prijs</p>
        <p className="text-lg font-semibold">Betaald</p>
        <p className="text-lg font-semibold">Verwerkt</p>
        <p className="text-lg font-semibold">Heeft betaald</p>
        <p className="text-lg font-semibold">Verwijderen</p>
      </div>

      {orderData.map((order, index) => (
        <div
          key={order.id}
          className={`grid grid-cols-8 gap-4 ml-6 mr-6 p-4 ${
            index % 2 === 0 ? "bg-white" : "bg-blue-100"
          } mt-2`}
        >
          <p>{order.attributes.user.data.attributes.stamNr}</p>
          <p>{order.attributes.month}</p>
          <p>{order.attributes.year}</p>
          <p>{order.attributes.price}</p>
          {order.attributes.paid ? (
            <p className="bg-green-500">Ja</p>
          ) : (
            <p className="bg-red-500">Nee</p>
          )}
          {order.attributes.processed ? (
            <p className="bg-green-500">Ja</p>
          ) : (
            <p className="bg-red-500">Nee</p>
          )}
          {order.attributes.paid ? (
            <DontBetaalOrder id={order.id} />
          ) : (
            <BetaalOrder id={order.id} />
          )}
          <DeleteOrder id={order.id} />
        </div>
      ))}
    </div>
  );
};

export default OrderoverzichtPage;
