"use client";
import { useState, useEffect } from "react";
const MonthlyOrderView = ({ data }: { data: any }) => {
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
  const userOrders = data.filter(
    (order: any) =>
      order.attributes.month == currentDate.month &&
      order.attributes.year == currentDate.year
  );
  return (
    <div className="">
      <h2 className="text-xl font-semibold ml-6">Deze maand</h2>
      <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-5 gap-4 ml-6 mr-6">
        <p className="text-lg font-semibold">Maand</p>
        <p className="text-lg font-semibold">Jaar</p>
        <p className="text-lg font-semibold">Prijs</p>
        <p className="text-lg font-semibold">Betaald</p>
        <p className="text-lg font-semibold">Verwerkt</p>
      </div>

      {userOrders.map((order, index) => (
        <div
          key={order.id}
          className={`grid grid-cols-5 gap-4 ml-6 mr-6 p-4 ${
            index % 2 === 0 ? "bg-white" : "bg-blue-100"
          } mt-2`}
        >
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
        </div>
      ))}
    </div>
  );
};

export default MonthlyOrderView;
