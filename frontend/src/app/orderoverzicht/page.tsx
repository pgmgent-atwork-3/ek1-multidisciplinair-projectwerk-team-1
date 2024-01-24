"use client";
import { fetchAllOrders } from "@/app/api/api";
import DeleteOrder from "@/app/components/buttons/DeleteOrder";
import BetaalOrder from "@/app/components/buttons/BetaalOrder";
import DontBetaalOrder from "@/app/components/buttons/DontBetaalOrder";
import { useEffect, useState } from "react";
import React from "react";

const OrderoverzichtPage = () => {
  const [orderData, setOrderData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("naam");
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllOrders();
        setOrderData(data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!orderData) {
    return <div>Loading...</div>;
  }

  const handleChangeSearch = (event) => {
    event.preventDefault();
    setSearchField(event.target.value);
    if (event.target.value === "nietBetaald") {
      console.log("nietBetaald");
      const results = data.filter((order) => {
        const nietBetaald = order.attributes.paid;
        return nietBetaald === false;
      });
      console.log(results);
      setOrderData(results);
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    const search = event.target.value;
    if (searchTerm != "") {
      const results = data.filter((order) => {
        if (searchField === "naam") {
          const naam =
            order.attributes.user.data.attributes.voornaam +
            " " +
            order.attributes.user.data.attributes.achternaam;
          console.log(naam);
          return naam.includes(search.toLowerCase());
        }

        if (searchField === "stamNr") {
          const stamNr = order.attributes.user.data.attributes.stamNr;
          return stamNr.includes(search.toLowerCase());
        }

        if (searchField === "email") {
          const email = order.attributes.user.data.attributes.email;
          console.log(email);
          return email.includes(search.toLowerCase());
        }

        if (searchField === "month") {
          const month = order.attributes.month;
          return month.includes(search.toLowerCase());
        }

        if (searchField === "year") {
          const year = order.attributes.year;
          return year.includes(search.toLowerCase());
        }
      });
      setOrderData(results);
    } else {
      setOrderData(data);
    }
  };

  return (
    <div className="container lg m-auto mt-6">
      <h1 className="text-4xl font-bold flex justify-center">
        Besteloverzicht
      </h1>
      <div className="flex gap-6 items-baseline">
        <h2 className="text-xl font-semibold ml-6 mt-6">Geschiedenis</h2>
        <div className="flex gap-6 ">
          <input
            type="text"
            placeholder="Filter door het overzicht"
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(event) => handleChange(event)}
          />
          <select 
            onChange={(event) => handleChangeSearch(event)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:border-blue-500"
          >
            <option value={"naam"}>Naam</option>
            <option value={"stamNr"}>StamNr</option>
            <option value={"email"}>Email</option>
            <option value={"month"}>Maand</option>
            <option value={"year"}>Jaar</option>
            <option value={"nietBetaald"}>Niet betaald</option>
          </select>
        </div>
      </div>
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
