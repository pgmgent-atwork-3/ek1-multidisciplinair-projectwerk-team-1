"use client";
import React, { useState, useEffect } from "react";
import { createOrder } from "../api/api";

const BestelForm = (data) => {
  const id = data.user;
  const collorRings = data.collorRing;
  const inoxRings = data.inoxRing;
  const [betaald, setBetaald] = useState(data.betaling);
  //jaar select
  const [currentDate, setCurrentDate] = useState(null);
  const [selectedJaar, setSelectedJaar] = useState("");

  //collor rings
  const [prijsCollor, setPrijsCollor] = useState([]);
  const [aantalRingenCollor, setAantalRingenCollor] = useState([]);
  const [ringGroteCollor, setRingGroteCollor] = useState([]);
  const [selectedCollorSize, setSelectedCollorSize] = useState("select");

  //inox rings
  const [prijsInox, setPrijsInox] = useState([]);
  const [aantalRingenInox, setAantalRingenInox] = useState([]);
  const [ringGroteInox, setRingGroteInox] = useState([]);
  const [selectedInoxSize, setSelectedInoxSize] = useState("select");

  //bestelling
  const [bestelling, setBestelling] = useState([]);
  const [collorRingsData, setCollorRingsData] = useState([]);
  const [inoxRingsData, setInoxRingsData] = useState([]);
  const [totalRingCheck, setTotalRingCheck] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const setPage = () => {
    if (currentDate.month >= 10) {
      setSelectedJaar("extra");
      console.log("extra");
    } else {
      setSelectedJaar("selected");
      console.log("selected");
    }
  };

  const totaalPriceCalc = () => {
    let colorPrice: number = 0;
    let inoxPrice: number = 0;
    const priceColorArray = prijsCollor.filter((price) => price !== undefined);
    const priceInoxArray = prijsInox.filter((price) => price !== undefined);
    console.log("color", priceColorArray);
    console.log("inox", priceInoxArray);
    priceColorArray.forEach((price) => {
      colorPrice += price;
    });
    priceInoxArray.forEach((price) => {
      inoxPrice += price;
    });
    const totalPrice = Math.round((colorPrice + inoxPrice) * 100) / 100;
    setTotalPrice(totalPrice);
  };

  const deleteBestelling = (size, select) => {
    const updateBestelling = [...bestelling];
    if (select === "color") {
      const index = updateBestelling.findIndex(
        (ring) => ring?.size === size && ring?.type === "color"
      );
      const priceIndex = collorRings.findIndex((ring) => ring?.size === size);
      prijsCollor[priceIndex] = 0;
      console.log(prijsCollor);
      setPrijsCollor(prijsCollor);
      updateBestelling.splice(index, 1);
      setBestelling(updateBestelling);
    }
    if (select === "inox") {
      const index = updateBestelling.findIndex(
        (ring) => ring?.size === size && ring?.type === "inox"
      );
      const priceIndex = inoxRings.findIndex((ring) => ring?.size === size);
      prijsInox[priceIndex] = 0;
      setPrijsInox(prijsInox);
      updateBestelling.splice(index, 1);
      setBestelling(updateBestelling);
    }
    totaalPriceCalc();
  };

  const handelSelect = (element, select) => {
    const value = element.target.value;
    if (select === "color") {
      setCollorRingsData(collorRings.filter((ring) => ring.size == value));
      setInoxRingsData([]);
      setSelectedCollorSize(value);
    }
    if (select === "inox") {
      setInoxRingsData(inoxRings.filter((ring) => ring.size == value));
      setCollorRingsData([]);
      setSelectedInoxSize(value);
    }
  };

  const handelChange = (element, index, select) => {
    if (select === "color") {
      //price
      const price =
        Math.round(
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
        Math.round(
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
      setCollorRingsData([]);
      setSelectedCollorSize("select");
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
      setInoxRingsData([]);
      setSelectedInoxSize("select");
    }
    totaalPriceCalc();
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
    if (ringenAantalCollor < 10 && ringenAantalCollor !== 0) {
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
      year: selectedJaar,
      month: currentDate.month,
      payment: betaald,
    };
    console.log(userBestelling);
    createOrder(userBestelling).then((data) => {
      if (data === null) {
        alert("Er is iets fout gegaan");
        return;
      }
      alert("Bestelling is geplaatst");
      window.location.reload();
    });
  };

  return (
    <div>
      {(betaald === true || betaald === false) && data.betaling == "admin" && (
        <h2>Lid heeft betaald</h2>
      )}
      {selectedJaar == "" && (
        <div className="h-80">
          <div className="flex items-center justify-center">
            {betaald === "admin" && (
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg ml-4"
                  onClick={() => setBetaald(true)}
                >
                  Betaald
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg ml-4"
                  onClick={() => setBetaald(false)}
                >
                  Niet betaald
                </button>
              </div>
            )}
          </div>
          {(betaald == true || betaald == false || betaald == undefined) && (
            <div className="flex items-center justify-center h-80">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg"
                onClick={setPage}
              >
                Nieuwe bestelling
              </button>
            </div>
          )}
        </div>
      )}

      {selectedJaar == "extra" && (
        <div>
          <div className="flex items-center justify-center h-80">
            <button
              className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg mr-4"
              onClick={() => setSelectedJaar(currentDate.year)}
            >
              Dit Jaar
            </button>
            <button
              className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg"
              onClick={() => setSelectedJaar(currentDate.year + 1)}
            >
              Volgend Jaar
            </button>
          </div>
        </div>
      )}
      {selectedJaar == "selected" && (
        <div>
          <div className="flex items-center justify-center h-80">
            <button
              className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg"
              onClick={() => setSelectedJaar(currentDate.year)}
            >
              Dit Jaar
            </button>
          </div>
        </div>
      )}
      {selectedJaar !== "selected" &&
        selectedJaar !== "extra" &&
        selectedJaar !== "" && (
          <div>
            <h1 className="text-3xl font-bold flex justify-center mb-4">Kies uw ringen</h1>
            <div className="flex flex-row justify-center">
              <div className="flex flex-col grow max-w-xs items-center">
                <div className="flex flex-col items-center mb-4">
                  <h1 className="text-xl font-semibold">
                    Verharde jaarkleur ringen
                  </h1>
                  <h2>Min 10 stuks daarna 5 stuks oplopend</h2>
                </div>
                <select
                  name="ringSize"
                  onChange={(element) => handelSelect(element, "color")}
                  className="w-32 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                  value={selectedCollorSize}
                >
                  <option className="text-gray-700" value="select">
                    Select
                  </option>
                  Maat
                  {collorRings.map((ring) => (
                    <option
                      key={ring.id}
                      className="text-gray-700"
                      value={ring.size}
                    >
                      {ring.size}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col grow max-w-sm items-center">
                <div className="flex flex-col items-center mb-4">
                  <h1 className=" text-xl font-semibold">RVS(INOX) ringen</h1>
                  <h2>Mogelijk per stuk</h2>
                </div>
                <select
                  name="ringSize"
                  onChange={(element) => handelSelect(element, "inox")}
                  className="w-32 py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300 focus:border-blue-300"
                  value={selectedInoxSize}
                >
                  <option className="text-gray-700" value="select">
                    Select
                  </option>
                  Maat
                  {inoxRings.map((ring) => (
                    <option
                      key={ring.id}
                      className="text-gray-700"
                      value={ring.size}
                    >
                      {ring.size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addRing(ring.id, "color");
                    }}
                  >
                    <div
                      className="p-4 shadow-md rounded-lg bg-blue-100 grid grid-cols-5 gap-4 ml-6 mr-6"
                      key={ring.id}
                    >
                      <p className="text-lg font-semibold">{ring.size}</p>
                      <input
                        type="number"
                        required
                        onChange={(element) =>
                          handelChange(element, ring.id, "color")
                        }
                      />
                      <p className="text-lg font-semibold">{ring.price}</p>
                      <p>{prijsCollor[ring.id]}</p>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        Toevoegen
                      </button>
                    </div>
                  </form>
                </>
              ))}

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
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      addRing(ring.id, "inox");
                    }}
                  >
                    <div
                      className="p-4 shadow-md rounded-lg bg-blue-100 grid grid-cols-5 gap-4 ml-6 mr-6"
                      key={ring.id}
                    >
                      <p className="text-lg font-semibold">{ring.size}</p>
                      <input
                        type="number"
                        required
                        onChange={(element) =>
                          handelChange(element, ring.id, "inox")
                        }
                        value={aantalRingenInox[ring.id]}
                      />
                      <p className="text-lg font-semibold">{ring.price}</p>
                      <p>{prijsInox[ring.id]}</p>
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        Toevoegen
                      </button>
                    </div>
                  </form>
                </>
              ))}

            {bestelling.length !== 0 && (
              <div className="m-auto mt-10">
                <h3 className="font-bold text-2xl flex justify-center">Gekozen ringen</h3>
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
                <p className="text-white text-lg font-bold flex justify-end">
                  Totaal: Є{totalPrice}
                </p>
              </div>
            )}
            <div className="mt-10 flex justify-end mr-6">
              {bestelling.length !== 0 && (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-3 px-6 rounded"
                  onClick={handelSubmit}
                >
                  submit
                </button>
              )}
            </div>
          </div>
        )}
    </div>
  );
};
export default BestelForm;
