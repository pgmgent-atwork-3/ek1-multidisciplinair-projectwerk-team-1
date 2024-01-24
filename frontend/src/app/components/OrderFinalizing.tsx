"use client";
import { useEffect, useState } from "react";

const OrderFinalizing = ({ data }: { data: any }) => {
  const orderData = data;
  const [currentDate, setCurrentDate] = useState(null);
  useEffect(() => {
    // Haal de huidige datum en tijd op
    const now = new Date();

    // Haal dag, maand en jaar op
    const day = now.getDate();
    const month = now.getMonth() + 1; // Maanden beginnen bij 0, voeg 1 toe voor de werkelijke maand
    const year = now.getFullYear();

    // Stel de huidige datum in in de state
    setCurrentDate({ day, month, year });
  }, []);
  if (!currentDate) return <div>Loading...</div>;
  const sortedOrders = orderData.filter(
    (order: any) =>
      order.attributes.month == currentDate.month ||
      order.attributes.year != currentDate.year
  );
  console.log("sortedOrders", sortedOrders);
  const urgentorders = orderData.filter(
    (order: any) =>
      order.attributes.month != currentDate.month &&
      order.attributes.year == currentDate.year
  );

  return (
    <div>
    <h1 className="text-4xl font-bold flex justify-center">
        Bestellingen verwerken
    </h1>
      <h2 className="text-xl font-semibold ml-6 mt-6">Dringende bestellingen</h2>
      <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-5 gap-4 ml-6 mr-6">
        <p className="text-lg font-semibold">Stam-Nr</p>
        <p className="text-lg font-semibold">Maand</p>
        <p className="text-lg font-semibold">Jaar</p>
        <p className="text-lg font-semibold">Prijs</p>
        <p className="text-lg font-semibold">Betaald</p>
      </div>
      {!urgentorders.length && (
        <div className="grid grid-cols-1 ml-6 mr-6 p-4 bg-blue-100 border-t border-slate-300">
          <h3 className="text-lg">Geen dringende bestellingen</h3>
        </div>
      )}
      {urgentorders.map((order, index) => (
        <a
          href={`/orderprocess/${order.id}`}
          key={order.id}
          className={`grid grid-cols-5 gap-4 ml-6 mr-6 p-4 ${
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
        </a>
      ))}
      <h2 className="text-xl font-semibold ml-6 mt-6">Bestellingen te verwerken</h2>
      <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-5 gap-4 ml-6 mr-6">
        <p className="text-lg font-semibold">Stam-Nr</p>
        <p className="text-lg font-semibold">Maand</p>
        <p className="text-lg font-semibold">Jaar</p>
        <p className="text-lg font-semibold">Prijs</p>
        <p className="text-lg font-semibold">Betaald</p>
      </div>

      {!sortedOrders.length && (
        <div className="grid grid-cols-1 ml-6 mr-6 p-4 bg-blue-100 border-t border-slate-300">
          <h3 className="text-lg">Geen bestellingen</h3>
        </div>
      )}
      {sortedOrders.map((order, index) => (
        <a
          href={`/orderprocess/${order.id}`}
          key={order.id}
          className={`grid grid-cols-5 gap-4 ml-6 mr-6 p-4 ${
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
        </a>
      ))}
    </div>
  );
};

export default OrderFinalizing;
