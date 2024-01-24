"use client";
import {
  loadColorRings,
  loadInoxRings,
  saveColorRings,
  saveInoxRings,
} from "@/app/api/api";
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

  const handleChangeColor = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event || !event.target || !event.target.value) {
      return;
    }
    const { value, name } = event.target;
    const newSize = parseFloat(value);

    const updatedColorRings = [...colorRings];
    const existingRing = updatedColorRings.find(
      (ring, i) => i !== index && ring.size === newSize
    );

    if (existingRing) {
      // Handle the case where the size already exists (e.g., show an error message)
      console.error("Size already exists");
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

  const handleChangeInox = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event || !event.target || !event.target.value) {
      return;
    }
    const { value, name } = event.target;
    const newSize = parseFloat(value);

    const updatedInoxRings = [...inoxRings];
    const existingRing = updatedInoxRings.find(
      (ring, i) => i !== index && ring.size === newSize
    );

    if (existingRing) {
      // Handle the case where the size already exists (e.g., show an error message)
      console.error("Size already exists");
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
  };

  const addInoxRing = () => {
    const updatedInoxRings = [...inoxRings];
    updatedInoxRings.push({ size: 0, price: 0, amount: 0 });
    setInoxRings(updatedInoxRings);
  };

  const handleDeleteColor = (index: number) => {
    const updatedColorRings = colorRings
      .slice(0, index)
      .concat(colorRings.slice(index + 1));
    setColorRings(updatedColorRings);
  };

  const handleDeleteInox = (index: number) => {
    const updatedInoxRings = inoxRings
      .slice(0, index)
      .concat(inoxRings.slice(index + 1));
    setInoxRings(updatedInoxRings);
  };

  const handleSubmitColor = async () => {
    await saveColorRings(colorRings);
  };

  const handleSubmitInox = async () => {
    await saveInoxRings(inoxRings);
  };

  return (
    <div className="container lg m-auto mt-6 mb-20">
      <h1 className="text-4xl font-bold flex justify-center">
        Ring prijzen en maten
      </h1>
      <div className="flex">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mt-4 ml-4">Gekleurde Ringen</h2>
          <ul className="flex items-start flex-col">
            <li className="grid grid-cols-3 gap-32 py-2 px-4">
              <h3 className="text-lg font-bold pr-2 pl-8">Maat</h3>
              <h3 className="text-lg font-bold pr-2 pl-8">Prijs</h3>
            </li>
            {colorRings.map((ring, index) => (
              <li key={ring.size} className="grid grid-cols-3 gap-4 py-2 px-4">
                <input
                  type="number"
                  className="border-2 border-gray-400 rounded-md px-2 py-1"
                  name="size"
                  step={0.1}
                  value={ring.size}
                  onChange={(event) => handleChangeColor(index, event)}
                  disabled={!editingColor}
                />
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
                  <button
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteColor(index)}
                  >
                    Verwijderen
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
          {editingColor ? (
            <div className="flex space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => setEditingColor(false)}
              >
                Annuleren
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSubmitColor}
              >
                Bevestigen
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={addColorRing}
              >
                Ring toevoegen
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => setEditingColor(true)}
            >
              Bewerken
            </button>
          )}
        </div>
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mt-4 ml-4">Inox ringen</h2>
          <ul className="flex items-start flex-col">
            <li className="grid grid-cols-3 gap-32 py-2 px-4">
              <h3 className="text-lg font-bold pr-2 pl-8">Maat</h3>
              <h3 className="text-lg font-bold pr-2 pl-8">Prijs</h3>
            </li>
            {inoxRings.map((ring, index) => (
              <li key={ring.size} className="grid grid-cols-3 gap-4 py-2 px-4">
                <input
                  type="number"
                  className="border-2 border-gray-400 rounded-md px-2 py-1"
                  name="size"
                  step={0.1}
                  value={ring.size}
                  onChange={(event) => handleChangeInox(index, event)}
                  disabled={!editingInox}
                />
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
                  <button
                    className="ml-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    onClick={() => handleDeleteInox(index)}
                  >
                    Verwijderen
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
          {editingInox ? (
            <div className="flex space-x-4 mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => setEditingInox(false)}
              >
                Annuleren
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleSubmitInox}
              >
                Bevestigen
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={addInoxRing}
              >
                Ring toevoegen
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={() => setEditingInox(true)}
            >
              Bewerken
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rings;
