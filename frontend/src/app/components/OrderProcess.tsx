"use client";
import React, { useState } from "react";
import { updateOrderProcess } from "../api/api";
import { OrderRingCounter } from "./OrderRingCounter";
import { PrintAdres } from "./buttons/PrintAdres";

const OrderProcess = (orderData) => {
  const adres = orderData.user.attributes.straat + " " + orderData.user.attributes.huisNr + " " + orderData.user.attributes.postcode + " " + orderData.user.attributes.gemeente;
  const data = orderData.orderData;
  const length =
    data.attributes.color_ring.length + data.attributes.inox_ring.length;
  const initialCheckboxes = Array(length).fill(false);
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const dataCounter = OrderRingCounter(orderData.orderUser);
  const inoxCounter = dataCounter.inoxOrder;
  const colorCounter = dataCounter.colorOrder;
  console.log("colorCounter", colorCounter);
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
      <p className="flex justify-center font-bold">{data.attributes.year}</p>

      <h2 className="flex justify-center">Totaal aantal per soort</h2>
      <div className="flex gap-8 justify-center">
        {colorCounter[0].length > 0 && (
          <div>
            <h3>Kleur ringen</h3>

            <div className="flex gap-16">
              <div>
                {colorCounter[0].map((size, index) => (
                  <p key={index}>
                    <span className="font-bold">Size:</span> {size}
                  </p>
                ))}
              </div>
              <div>
                {colorCounter[1].map((amount, index) => (
                  <p key={index}>
                    <span className="font-bold">Amount:</span> {amount}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
        {inoxCounter[0].length > 0 && (
          <div>
            <h3>Inox ringen</h3>
            <div className="flex gap-16">
              <div>
                {inoxCounter[0].map((size, index) => (
                  <p key={index}>
                    <span className="font-bold">Size:</span> {size}
                  </p>
                ))}
              </div>
              <div>
                {inoxCounter[1].map((amount, index) => (
                  <p key={index}>
                    <span className="font-bold">Amount:</span> {amount}
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
          <p className="font-bold">Kleur ringen</p>
          {data.attributes.color_ring.map((color, index) => (
            <div key={color.id} className="mb-4">
              <p>
                <span className="font-bold">Amount:</span> {color.amount}
              </p>
              <p>
                <span className="font-bold">Price:</span> {color.price}
              </p>
              <p>
                <span className="font-bold">Size:</span> {color.size}
              </p>
              <input
                onChange={() => handelChange(index, "color")}
                type="checkbox"
                name="checkbox"
              />
            </div>
          ))}
        </div>

        {/* Inox Rings */}
        <div className="w-1/2 p-4 border rounded-lg bg-green-100">
          <p className="font-bold">Inox ringen</p>
          {data.attributes.inox_ring.map((inox, index) => (
            <div key={inox.id} className="mb-4">
              <p>
                <span className="font-bold">Amount:</span> {inox.amount}
              </p>
              <p>
                <span className="font-bold">Price:</span> {inox.price}
              </p>
              <p>
                <span className="font-bold">Size:</span> {inox.size}
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

      <PrintAdres 
      addressText={adres} 
      />

      {/* Submit Button */}
      <button
        className="mt-4 p-2 bg-indigo-500 text-white rounded-md"
        onClick={handelSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default OrderProcess;
