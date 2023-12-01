"use client";
import React, { useState } from "react";
import { createOrder } from "../api/api";

const BestelForm = (data) => {
  const id = data.user;
  const collorRings = data.collorRing;
  const inoxRings = data.inoxRing;
  //collor rings
  const [prijsCollor, setPrijsCollor] = useState([]);
  const [aantalRingenCollor, setAantalRingenCollor] = useState([]);
  const [ringGroteCollor, setRingGroteCollor] = useState([]);

  //inox rings
  const [prijsInox, setPrijsInox] = useState([]);
  const [aantalRingenInox, setAantalRingenInox] = useState([]);
  const [ringGroteInox, setRingGroteInox] = useState([]);

  //bestelling
  const [bestelling, setBestelling] = useState([]);
  const [collorRingsData, setCollorRingsData] = useState([]);
  const [inoxRingsData, setInoxRingsData] = useState([]);
  const [totalRingCheck, setTotalRingCheck] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const deleteBestelling = (size, select) => {
    const updateBestelling = [...bestelling];
    if (select === "color") {
      const index = updateBestelling.findIndex(
        (ring) => ring?.size === size && ring?.type === "color"
      );
      const newPrice =
        Math.floor((totalPrice - updateBestelling[index].price) * 100) / 100;
      setTotalPrice(newPrice);
      updateBestelling.splice(index, 1);
      setBestelling(updateBestelling);
    }
    if (select === "inox") {
      const index = updateBestelling.findIndex(
        (ring) => ring?.size === size && ring?.type === "inox"
      );
      const newPrice =
        Math.floor((totalPrice - updateBestelling[index].price) * 100) / 100;
      setTotalPrice(newPrice);
      updateBestelling.splice(index, 1);
      setBestelling(updateBestelling);
    }
  };

  const handelSelect = (element, select) => {
    const value = element.target.value;
    if (select === "color") {
      setCollorRingsData(collorRings.filter((ring) => ring.size == value));
    }
    if (select === "inox") {
      setInoxRingsData(inoxRings.filter((ring) => ring.size == value));
    }
  };

  const handelChange = (element, index, select) => {
    if (select === "color") {
      //price
      const price =
        Math.floor(
          parseInt(element.target.value) * collorRings[index].price * 100
        ) / 100;
      const updatePrijs = [...prijsCollor];
      updatePrijs[index] = price;
      setPrijsCollor(updatePrijs);
      //amount
      const amount = parseInt(element.target.value);
      if (amount < 0) {
        alert("Geen negatieve ringen aantal");
        totaalRingen[index] = 0;
        return;
      }
      const updateAmount = [...aantalRingenCollor];
      updateAmount[index] = amount;
      setAantalRingenCollor(updateAmount);
      //size
      const size = collorRings[index].size;
      const updateRingGrote = [...ringGroteCollor];
      updateRingGrote[index] = size;
      setRingGroteCollor(updateRingGrote);
    }
    if (select === "inox") {
      //price
      const price =
        Math.floor(
          parseInt(element.target.value) * inoxRings[index].price * 100
        ) / 100;
      const updatePrijs = [...prijsInox];
      updatePrijs[index] = price;
      setPrijsInox(updatePrijs);
      //amount
      const amount = parseInt(element.target.value);
      if (amount < 0) {
        alert("Geen negatieve ringen aantal");
        totaalRingen[index] = 0;
        return;
      }
      const updateAmount = [...aantalRingenInox];
      updateAmount[index] = amount;
      setAantalRingenInox(updateAmount);
      //size
      const size = inoxRings[index].size;
      const updateRingGrote = [...ringGroteInox];
      updateRingGrote[index] = size;
      setRingGroteInox(updateRingGrote);
    }
  };

  const addRing = (index, select) => {
    let amount: number = 0;
    let price: number = 0;
    let size: number = 0;
    const updateBestelling = [...bestelling];
    if (select === "color") {
      amount = aantalRingenCollor[index];
      const updateTotalRingCheck = [...totalRingCheck];
      updateTotalRingCheck[index] = amount;
      setTotalRingCheck(updateTotalRingCheck);
      price = prijsCollor[index];
      size = ringGroteCollor[index];
      updateBestelling[index] = {
        amount: amount,
        price: price,
        size: size,
        type: "color",
        id: index,
      };
    }
    if (select === "inox") {
      amount = aantalRingenInox[index];
      price = prijsInox[index];
      size = ringGroteInox[index];
      updateBestelling[index + 20] = {
        amount: amount,
        price: price,
        size: size,
        type: "inox",
        id: index + 20,
      };
    }
    let colorPrice: number = 0;
    let inoxPrice: number = 0;
    const priceColorArray = prijsCollor.filter((price) => price !== undefined);
    const priceInoxArray = prijsInox.filter((price) => price !== undefined);
    priceColorArray.forEach((price) => {
      colorPrice += price;
    });
    priceInoxArray.forEach((price) => {
      inoxPrice += price;
    });
    const totalPrice = Math.floor((colorPrice + inoxPrice) * 100) / 100;
    setTotalPrice(totalPrice);
    setBestelling(updateBestelling);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    //check
    let ringenAantalCollor: number = 0;
    const totaalRingenCollorArray = totalRingCheck.filter(
      (ring) => ring !== undefined
    );
    totaalRingenCollorArray.forEach((ring) => {
      ringenAantalCollor += ring;
    });
    if (ringenAantalCollor < 10) {
      alert("Minimaal 10 ringen bestellen");
      return;
    }

    if (ringenAantalCollor % 5 !== 0) {
      console.log(ringenAantalCollor);
      alert("Alleen per 5 ringen bestellen");
      return;
    }
    //bestelling
    const order = bestelling.filter((bestelling) => bestelling !== undefined);
    const orderColor = order.filter(
      (bestelling) => bestelling.type === "color"
    );
    const orderInox = order.filter((bestelling) => bestelling.type === "inox");
    const userBestelling = {
      user: id,
      totaal: totalPrice,
      color_ring: orderColor,
      inox_ring: orderInox,
    };
    console.log(userBestelling);
    //createOrder(userBestelling);
    //.then((data) => {
    //if (data === null) {
    //  alert("Er is iets fout gegaan");
    //  return;
    // }
    // alert("Bestelling is geplaatst");
    // window.location.reload();
    //});
  };

  return (
    <div>
      <h1>Verharde jaarkleur ringen</h1>
      <h2>Min 10 stuks daarna 5 stuks oplopend</h2>
      <select
        name="ringSize"
        onChange={(element) => handelSelect(element, "color")}
        className="w-32 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
      >
        <option className="text-gray-700" value="select">
          Select
        </option>
        Maat
        {collorRings.map((ring) => (
          <option key={ring.id} className="text-gray-700" value={ring.size}>
            {ring.size}
          </option>
        ))}
      </select>
      {collorRingsData.length !== 0 && (
        <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-5 gap-4 ml-6 mr-6">
          <p className="text-lg font-semibold">Maat</p>
          <p className="text-lg font-semibold">Aantal</p>
          <p className="text-lg font-semibold">Prijs / Per stuk</p>
          <p className="text-lg font-semibold">Totaal</p>
          <p className="text-lg font-semibold">Toevoegen</p>
        </div>
      )}
      {collorRingsData.length !== 0 &&
        collorRingsData.map((ring: any) => (
          <div
            className="p-4 shadow-md rounded-lg bg-blue-100 grid grid-cols-5 gap-4 ml-6 mr-6"
            key={ring.id}
          >
            <p className="text-lg font-semibold">{ring.size}</p>
            <input
              type="number"
              onChange={(element) => handelChange(element, ring.id, "color")}
            />
            <p className="text-lg font-semibold">{ring.price}</p>
            <p>{prijsCollor[ring.id]}</p>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                addRing(ring.id, "color");
              }}
            >
              Toevoegen
            </button>
          </div>
        ))}

      <h1>RVS(INOX) ringen</h1>
      <h2>Mogelijk per stuk</h2>

      <select
        name="ringSize"
        onChange={(element) => handelSelect(element, "inox")}
        className="w-32 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
      >
        <option className="text-gray-700" value="select">
          Select
        </option>
        Maat
        {inoxRings.map((ring) => (
          <option key={ring.id} className="text-gray-700" value={ring.size}>
            {ring.size}
          </option>
        ))}
      </select>

      {inoxRingsData.length !== 0 && (
        <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-5 gap-4 ml-6 mr-6">
          <p className="text-lg font-semibold">Maat</p>
          <p className="text-lg font-semibold">Aantal</p>
          <p className="text-lg font-semibold">Prijs / Per stuk</p>
          <p className="text-lg font-semibold">Totaal</p>
          <p className="text-lg font-semibold">Toevoegen</p>
        </div>
      )}
      {inoxRingsData.length !== 0 &&
        inoxRingsData.map((ring: any) => (
          <div
            className="p-4 shadow-md rounded-lg bg-blue-100 grid grid-cols-5 gap-4 ml-6 mr-6"
            key={ring.id}
          >
            <p className="text-lg font-semibold">{ring.size}</p>
            <input
              type="number"
              onChange={(element) => handelChange(element, ring.id, "inox")}
            />
            <p className="text-lg font-semibold">{ring.price}</p>
            <p>{prijsInox[ring.id]}</p>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                addRing(ring.id, "inox");
              }}
            >
              Toevoegen
            </button>
          </div>
        ))}

      {bestelling.length !== 0 && (
        <div>
          <h3>In process</h3>
          <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-5 gap-4 ml-6 mr-6">
            <p className="text-lg font-semibold">Maat</p>
            <p className="text-lg font-semibold">Aantal</p>
            <p className="text-lg font-semibold">Prijs</p>
            <p className="text-lg font-semibold">Type</p>
            <p className="text-lg font-semibold">Verwijderen</p>
          </div>
        </div>
      )}
      {bestelling.length !== 0 &&
        bestelling
          .filter((bestelling) => bestelling !== undefined)
          .map((bestelling: any, index: number) => (
            <div
              className="p-4 shadow-md rounded-lg bg-blue-100 grid grid-cols-5 gap-4 ml-6 mr-6"
              key={index}
            >
              <p className="text-lg font-semibold">{bestelling.size}</p>
              <p className="text-lg font-semibold">{bestelling.amount}</p>
              <p className="text-lg font-semibold">{bestelling.price}</p>
              <p className="text-lg font-semibold">{bestelling.type}</p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  deleteBestelling(bestelling.size, bestelling.type)
                }
              >
                Verwijderen
              </button>
            </div>
          ))}
      {bestelling.length !== 0 && (
        <div className="bg-blue-500 p-4 rounded-lg shadow-md mr-6 ml-6">
          <p className="text-white text-lg font-bold">Total: Є{totalPrice}</p>
        </div>
      )}

      {collorRingsData.length !== 0 && (
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handelSubmit}
        >
          submit
        </button>
      )}
    </div>
  );
};
export default BestelForm;
