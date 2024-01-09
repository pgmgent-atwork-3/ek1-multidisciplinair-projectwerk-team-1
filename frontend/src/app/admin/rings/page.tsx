"use client";
import { loadColorRings, loadInoxRings, saveColorRings, saveInoxRings } from "@/app/api/api";
import { useEffect, useState } from "react";

const Rings = () => {
  const [colorRings, setColorRings] = useState<Rings>([]);
  const [inoxRings, setInoxRings] = useState<Rings>([]);
  const [editingColor, setEditingColor] = useState(false);
  const [editingInox, setEditingInox] = useState(false);

  useEffect(() => {
    const fetchColorRings = async () => {
      const rings = await loadColorRings();
      setColorRings(rings);
    };
    fetchColorRings();
  }, []);

  useEffect(() => {
    const fetchInoxRings = async () => {
      const rings = await loadInoxRings();
      setInoxRings(rings);
    };
    fetchInoxRings();
  }, []);

  const handleChangeColor = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target || !event.target.value) {
      return;
    }
    const { value, name } = event.target;
    const newSize = parseFloat(value);
  
    const updatedColorRings = [...colorRings];
    const existingRing = updatedColorRings.find((ring, i) => i !== index && ring.size === newSize);
  
    if (existingRing) {
      // Handle the case where the size already exists (e.g., show an error message)
      console.error('Size already exists');
      return;
    }
  
    const updatedRing = { ...updatedColorRings[index] };
  
    if (name === "size") {
      updatedRing.size = newSize;
    }
    if (name === "price") {
      updatedRing.price = parseFloat(value);
    }
  
    updatedColorRings[index] = updatedRing;
    setColorRings(updatedColorRings);
  };
  
  const handleChangeInox = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target || !event.target.value) {
      return;
    }
    const { value, name } = event.target;
    const newSize = parseFloat(value);
  
    const updatedInoxRings = [...inoxRings];
    const existingRing = updatedInoxRings.find((ring, i) => i !== index && ring.size === newSize);
  
    if (existingRing) {
      // Handle the case where the size already exists (e.g., show an error message)
      console.error('Size already exists');
      return;
    }
  
    const updatedRing = { ...updatedInoxRings[index] };
  
    if (name === "size") {
      updatedRing.size = newSize;
    }
    if (name === "price") {
      updatedRing.price = parseFloat(value);
    }
  
    updatedInoxRings[index] = updatedRing;
    setInoxRings(updatedInoxRings);
  };

  const addColorRing = () => {
    const updatedColorRings = [...colorRings];
    updatedColorRings.push({ size: 0, price: 0, amount: 0 });
    setColorRings(updatedColorRings);
  }

  const addInoxRing = () => {
    const updatedInoxRings = [...inoxRings];
    updatedInoxRings.push({ size: 0, price: 0, amount: 0 });
    setInoxRings(updatedInoxRings);
  }

  const handleDeleteColor = (index: number) => {
    const updatedColorRings = colorRings.slice(0, index).concat(colorRings.slice(index + 1));
    setColorRings(updatedColorRings);
  }

  const handleDeleteInox = (index: number) => {
    const updatedInoxRings = inoxRings.slice(0, index).concat(inoxRings.slice(index + 1));
    setInoxRings(updatedInoxRings);
  }

  const handleSubmitColor = async () => {
    await saveColorRings(colorRings);
  };

  const handleSubmitInox = async () => {
    await saveInoxRings(inoxRings);
  };

  return (
    <>
    <h2 className="text-4xl mt-4 ml-4">Ring prices</h2>
    <div className="grid grid-cols-2 mx-auto">
      <div className="w-96">
        <h2 className="text-2xl mt-4 ml-4">Colored rings</h2>
        <ul className="flex justify between flex-col">
          {colorRings.map((ring, index) => (
            <li key={ring.size} className="flex items-center justify-between py-2 px-4">
              <label htmlFor="size">Size</label>
              <input
                type="number"
                className="border-2 border-gray-400 rounded-md px-2 py-1"
                name="size"
                step={0.1}
                value={ring.size}
                onChange={(event) => handleChangeColor(index, event)}
                disabled={!editingColor}
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="border-2 border-gray-400 rounded-md px-2 py-1"
                name="price"
                step={0.01}
                value={ring.price}
                onChange={(event) => handleChangeColor(index, event)}
                disabled={!editingColor}
              />
              {editingColor ? (
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleDeleteColor(index)}>Delete</button>
              ) : null}
            </li>
          ))}
        </ul>
        {editingColor ? (
          <>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => setEditingColor(false)}>Cancel</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmitColor}>Submit</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={addColorRing}>Add ring</button>
          </>
          ) : (
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setEditingColor(true)}>edit</button>
        )}
      </div>
      <div className="w-96">
        <h2 className="text-2xl mt-4 ml-4">Inox rings</h2>
        <ul className="flex justify between flex-col">
          {inoxRings.map((ring, index) => (
            <li key={ring.size} className="flex items-center justify-between py-2 px-4">
              <label htmlFor="size">Size</label>
              <input
                type="number"
                className="border-2 border-gray-400 rounded-md px-2 py-1"
                name="size"
                step={0.1}
                value={ring.size}
                onChange={(event) => handleChangeInox(index, event)}
                disabled={!editingInox}
              />
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="border-2 border-gray-400 rounded-md px-2 py-1"
                name="price"
                step={0.01}
                value={ring.price}
                onChange={(event) => handleChangeInox(index, event)}
                disabled={!editingInox}
              />
              {editingInox ? (
                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => handleDeleteInox(index)}>Delete</button>
              ) : null}
            </li>
          ))}
        </ul>
        {editingInox ? (
          <>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={() => setEditingInox(false)}>Cancel</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmitInox}>Submit</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={addInoxRing}>Add ring</button>
          </>
          ) : (
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setEditingInox(true)}>edit</button>
        )}
      </div>
    </div>
    </>
  );
};

export default Rings;