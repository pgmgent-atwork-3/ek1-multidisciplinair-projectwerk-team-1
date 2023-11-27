"use client";
import React, { useState } from "react";
import { createOrder } from "../api/api";

const BestelForm = (data) => {
  const collorRings = data.data;
  const id = data.user;
  const [prijs, setPrijs] = useState([]);
  const [aantalRingen, setAantalRingen] = useState([]);
  const [ringGrote, setRingGrote] = useState([]);
  const [totaalRingen, setTotaalRingen] = useState([]);



  const [bestelling, setBestelling] = useState([]);
  const [collorRingsData, setCollorRingsData] = useState([]);

  const handelSelect = (element) => {
    const value = element.target.value;
    setCollorRingsData(collorRings.filter((ring) => ring.size == value));
  };

  const handelChange = (element, index) => {
    const amount = parseInt(element.target.value);
    const price = Math.floor((parseInt(element.target.value) * collorRings[index].price) * 1000)/1000;
    const size = collorRings[index].size;
    if (amount < 0) {
      alert("Geen negatieve ringen aantal");
      totaalRingen[index] = 0;
      return;
    }
    setAantalRingen(totaalRingen);
    const updateAmount = [...aantalRingen];
    updateAmount[index] = amount;
    setAantalRingen(updateAmount);
    const updatePrijs = [...prijs];
    updatePrijs[index] = price;
    setPrijs(updatePrijs);
    const updateRingGrote = [...ringGrote];
    updateRingGrote[index] = size;
    setRingGrote(updateRingGrote);
  }

  const addRing = (index) => {
    const amount = aantalRingen[index];
    const price = prijs[index];
    const size = ringGrote[index];
    const updateBestelling = [...bestelling];
    updateBestelling.push({amount: amount, price: price, size: size})
    setBestelling(updateBestelling)

  };

  const handelSubmit = (e) => {
    e.preventDefault();
    let prijsTotaal: number = 0;
    let ringenAantal: number = 0;
    const totaalRingenArray = aantalRingen.filter((ring) => ring !== undefined);
    const prijsTotaalArray = totaal.filter((totaal) => totaal !== undefined);
    const bestellingArray = bestelling.filter(
      (bestelling) => bestelling !== undefined
    );

    const updateBestelling = [].concat(...bestellingArray);
    prijsTotaalArray.forEach((prijs) => {
      prijsTotaal += prijs;
    });
    prijsTotaal = Math.floor(prijsTotaal * 100) / 100;

    totaalRingenArray.forEach((ring) => {
      ringenAantal += ring;
    });

    if (ringenAantal < 10) {
      alert("Minimaal 10 ringen bestellen");
      return;
    }

    if (ringenAantal % 5 !== 0) {
      console.log(ringenAantal);
      alert("Alleen per 5 ringen bestellen");
      return;
    }

    const userBestelling = {
      user: id,
      totaal: prijsTotaal,
      color_ring: updateBestelling,
      inox_ring: [],
    };
    console.log(userBestelling);
    createOrder(userBestelling);
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
        onChange={handelSelect}
        className="w-32 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
      >
        <option className="text-gray-700" value="select">
          Select
        </option>
          Maat
        {collorRings.map((ring, index) => (
          <option key={index} className="text-gray-700" value={ring.size}>
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
      {collorRingsData.length !== 0 && ( collorRingsData.map((ring: any, index: number) => (
        <div
          className="p-4 shadow-md rounded-lg bg-blue-100 grid grid-cols-5 gap-4 ml-6 mr-6"
          key={index}
        >
          <p className="text-lg font-semibold">{ring.size}</p>
          <input
            type="number"
            onChange={(element) => handelChange(element, index)}
          />
          <p className="text-lg font-semibold">{ring.price}</p>
          <p>{prijs[index]}</p>
          <button onClick={()=>{
            addRing(index)
          }}>Toevoegen</button>
        </div>
      )))}
      {collorRingsData.length !== 0 && (
      <button className="bg-red-400 text-4xl" onClick={handelSubmit}>
        submit
      </button>
      )}
    </div>
  );
};
export default BestelForm;
