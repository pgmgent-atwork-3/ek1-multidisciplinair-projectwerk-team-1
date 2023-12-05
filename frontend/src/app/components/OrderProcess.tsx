"use client";
import React, { useState } from "react";
import { updateOrderProcess } from "../api/api";

const OrderProcess = ({ orderData }: { orderData: { orderData } }) => {
  const length =
    orderData.attributes.color_ring.length +
    orderData.attributes.inox_ring.length;
  const initialCheckboxes = Array(length).fill(false);
  const [checkboxes, setCheckboxes] = useState(initialCheckboxes);

  const handelChange = (index, type) => {
    const checkBox = [...checkboxes];
    const lenght = orderData.attributes.color_ring.length + index;
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
      updateOrderProcess(orderData.id).then((data) => {
        if (data) {
          window.location.href = "/orderoverzicht";
        }
      });
    }
  };

  return (
    <div>
        <p className="font-bold">{orderData.attributes.year}</p>
          <p className="font-bold">Kleur ringen</p>
      <div className="flex justify-between">
        {/* Color Rings */}
        <div className="w-1/2 p-4 border rounded-lg bg-blue-100">
          {orderData.attributes.color_ring.map((color, index) => (
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
          {orderData.attributes.inox_ring.map((inox, index) => (
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
