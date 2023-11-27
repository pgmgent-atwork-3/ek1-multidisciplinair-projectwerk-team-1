"use client";
import { fetchUser } from "@/app/api/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { loadColorRings, loadInoxRings, saveColorRings, saveInoxRings } from "@/app/api/api";
import { useEffect, useState } from "react";

const Rings = () => {
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/api/auth/signin?callbackUrl=/admin/rings");
  // }
  // const activeUser = await fetchUser(session?.id);
  // if (activeUser.attributes.role?.data.attributes.name !== "admin") {
  //   return <h1 className="text-4xl ">Not authorized</h1>;
  // }
  const [colorRings, setColorRings] = useState<Rings>([]);
  const [inoxRings, setInoxRings] = useState<Rings>([]);

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
      return; // Ensure event and event.target are defined
    }
    const { value } = event.target;
    const updatedColorRings = [...colorRings]; // Create a copy of the array
  
    // Update the specific object within the array
    updatedColorRings[index] = {
      ...updatedColorRings[index],
      price: parseFloat(value), // Assuming price is a number
    };
  
    setColorRings(updatedColorRings); // Update the state with the modified array
  };

  const handleChangeInox = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event || !event.target || !event.target.value) {
      return; // Ensure event and event.target are defined
    }
    const { value } = event.target;
    const updatedInoxRings = [...inoxRings]; // Create a copy of the array
  
    // Update the specific object within the array
    updatedInoxRings[index] = {
      ...updatedInoxRings[index],
      price: parseFloat(value), // Assuming price is a number
    };
  
    setInoxRings(updatedInoxRings); // Update the state with the modified array
  };

  const handleSubmitColor = async () => {
    await saveColorRings(colorRings);
  };

  const handleSubmitInox = async () => {
    await saveInoxRings(inoxRings);
  }

  return (
    <>
    <h2 className="text-4xl mt-4 ml-4">Ring prices</h2>
    <div className="grid grid-cols-2 mx-auto">
      <div className="w-96">
        <h2 className="text-2xl mt-4 ml-4">Colored rings</h2>
        <ul className="flex justify between flex-col">
          {colorRings.map((ring, index) => (
            <li key={ring.size} className="flex items-center justify-between py-2 px-4">
              <h3>{ring.size}</h3>
              <input
                type="number"
                className="border-2 border-gray-400 rounded-md px-2 py-1"
                step={0.01}
                value={ring.price}
                onChange={(event) => handleChangeColor(index, event)}
              />
            </li>
          ))}
        </ul>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmitColor}>Submit</button>
      </div>
      <div className="w-96">
        <h2 className="text-2xl mt-4 ml-4">Inox rings</h2>
        <ul className="flex justify between flex-col">
          {inoxRings.map((ring, index) => (
            <li key={ring.size} className="flex items-center justify-between py-2 px-4">
              <h3>{ring.size}</h3>
              <input
                type="number"
                className="border-2 border-gray-400 rounded-md px-2 py-1"
                step={0.01}
                value={ring.price}
                onChange={(event) => handleChangeInox(index, event)}
              />
            </li>
          ))}
        </ul>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmitInox}>Submit</button>
      </div>
    </div>
    </>
  );
};

export default Rings;