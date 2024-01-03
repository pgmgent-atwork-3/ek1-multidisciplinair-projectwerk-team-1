"use client";
import { useEffect, useState } from "react";

const RingOrder = ({rings, setRings}: {rings: Rings, setRings: any}) => {
  const [showComponent, setShowComponent] = useState(true);
  const [ringPrice, setRingPrice] = useState<number>(0);
  const [ringAmount, setRingAmount] = useState<number>(0);

  const renderAdditionalComponent = () => {
    if (ringAmount !== 0) {
      return <RingOrder rings={rings} setRings={setRings}/>;
    }
    return null;
  };

  const handleInternalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setRingAmount(parseInt(value));
    if (rings.find((ring: Ring) => ring.size === parseFloat(event.target.name))) {
      const i = rings.findIndex((ring: Ring) => ring.size === parseFloat(event.target.name));
      rings[i].amount = parseInt(event.target.value);
    } else {
      rings.push({size: parseFloat(event.target.name), amount: parseInt(event.target.value), price: rings.find((ring: Ring) => ring.size === parseFloat(event.target.name))?.price || 0});
    }
    setShowComponent(true);
  };
  
  const changeRingPrice = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const ring = rings.find((ring: Ring) => ring.size === parseFloat(value));
    setRingPrice(ring?.price || 0);
  };

  return (
    <>
    <div className="flex mb-4">
      <div className="mr-4 w-full">
        <label htmlFor="size" className="block mb-2 font-medium">
          Size
        </label>
        <select
          id="size"
          name="size"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={changeRingPrice}
        >
            <option>
              Choose ring size
            </option>
          {rings.map((ring: Ring) => (
            <option key={ring.size} value={ring.size}>
              {ring.size}
            </option>
          ))}
        </select>
      </div>
      <div className="mr-4">
        <label htmlFor="price" className="block mb-2 font-medium">
          Price per ring
        </label>
        <p className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">{ringPrice}</p>
      </div>
      <div className="mr-4">
        <label htmlFor="amount" className="block mb-2 font-medium">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          step={1}
          value={ringAmount}
          onChange={handleInternalInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
    {showComponent && renderAdditionalComponent()}
    </>
  );
};

export default RingOrder;
