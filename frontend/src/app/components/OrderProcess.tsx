"use client";
import React, { useState } from "react";
import { updateOrderProcess } from "../api/api";
import { OrderRingCounter } from "./OrderRingCounter";
import { PrintAdres } from "./buttons/PrintAdres";

const OrderProcess = (orderData) => {
  const adres =
    orderData.user.attributes.straat +
    " " +
    orderData.user.attributes.huisNr +
    " " +
    orderData.user.attributes.postcode +
    " " +
    orderData.user.attributes.gemeente;
  const data = orderData.orderData;
  const length =
    data.attributes.color_ring.length + data.attributes.inox_ring.length;
  const initialCheckboxes = Array(length).fill(false);
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const dataCounter = OrderRingCounter(orderData.orderUser);
  const inoxCounter = dataCounter.inoxOrder;
  const colorCounter = dataCounter.colorOrder;
  const handelChange = (index, type) => {
    const checkBox = [...checkboxes];
    const lenght = data.attributes.color_ring.length + index;
    if (type === "color") {
      checkBox[index] = !checkBox[index];
      setCheckboxes(checkBox);
      return;
    }
    if (type === "inox") {
      checkBox[lenght] = !checkBox[lenght];
      setCheckboxes(checkBox);
      return;
    }
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    const checkBoolean = checkboxes.every((check) => check === true);
    if (checkBoolean) {
      updateOrderProcess(data.id).then((data) => {
        if (data) {
          window.location.href = "/orderfinalizing";
        }
      });
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold flex justify-center">
        Bestelling id: {data.id}
      </h1>
      <h2 className="text-lg flex font-semibold justify-center mt-6">
        Totaal aantal per soort
      </h2>
      <div className="flex gap-8 justify-center">
        {colorCounter[0].length > 0 && (
          <div>
            <h3 className="text-xl font-semibold">Kleur ringen</h3>

            <div className="flex gap-16">
              <div>
                {colorCounter[0].map((size, index) => (
                  <p key={index}>
                    <span className="font-bold">Grootte:</span> {size}
                  </p>
                ))}
              </div>
              <div>
                {colorCounter[1].map((amount, index) => (
                  <p key={index}>
                    <span className="font-bold">Aantal:</span> {amount}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
        {inoxCounter[0].length > 0 && (
          <div>
            <h3 className="text-xl font-semibold">Inox ringen</h3>
            <div className="flex gap-16">
              <div>
                {inoxCounter[0].map((size, index) => (
                  <p key={index}>
                    <span className="font-bold">Grootte:</span> {size}
                  </p>
                ))}
              </div>
              <div>
                {inoxCounter[1].map((amount, index) => (
                  <p key={index}>
                    <span className="font-bold">Aantal:</span> {amount}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        {/* Color Rings */}
        <div className="w-1/2 p-4 border rounded-lg bg-blue-100">
          <p className="text-lg font-bold">Kleur ringen</p>
          <div className="flex flex-wrap gap-6">
            {data.attributes.color_ring.map((color, index) => (
              <div key={color.id} className="mb-4 w-32">
                <p>
                  <span className="font-bold">Aantal:</span> {color.amount}
                </p>
                <p>
                  <span className="font-bold">Prijs:</span> {color.price}
                </p>
                <p>
                  <span className="font-bold">Grootte:</span> {color.size}
                </p>
                <input
                  onChange={() => handelChange(index, "color")}
                  type="checkbox"
                  name="checkbox"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Inox Rings */}
        <div className="w-1/2 p-4 border rounded-lg bg-green-100">
          <p className="font-bold text-lg">Inox ringen</p>
          <div className="flex flex-wrap gap-6">
            {data.attributes.inox_ring.map((inox, index) => (
              <div key={inox.id} className="mb-4 w-32">
                <p>
                  <span className="font-bold">Aantal:</span> {inox.amount}
                </p>
                <p>
                  <span className="font-bold">Prijs:</span> {inox.price}
                </p>
                <p>
                  <span className="font-bold">Grootte:</span> {inox.size}
                </p>
                <input
                  onChange={() => handelChange(index, "inox")}
                  type="checkbox"
                  name="checkbox"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-6 my-6">
        <PrintAdres addressText={adres} />
        <button
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded"
          onClick={handelSubmit}
        >
          Bevestigen
        </button>
      </div>
    </div>
  );
};

export default OrderProcess;
