"use client";
import { useEffect, useState } from "react";
import { fetchAllUsers } from "../api/api";
import DeleteUser from "./buttons/DeleteUser";

const UserFilter = () => {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const data = await fetchAllUsers();
    if (!data || data.length === 0) {
      return (
        <div>
          <h1>Error bij het ophalen van de users</h1>
        </div>
      );
    }
    setAllUsers(data);
    setUsers(data);
  };

  const handelChange = (value: string) => {
    setSearch(value);
    if(value === ""){
        setUsers(allUsers)
        return
    }
    const filteredUsers = users.filter((user) => {
      return (
        user.attributes.voornaam.toLowerCase().includes(value.toLowerCase()) ||
        user.attributes.achternaam
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        user.attributes.stamNr.toLowerCase().includes(value.toLowerCase()) ||
        user.attributes.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setUsers(filteredUsers);
  };

  return (
    <>
      <div className="flex w-1/2 mt-6">
      <h1 className="text-4xl font-bold ml-6 mr-10">Leden</h1>
        <input
          type="text"
          placeholder="Zoek door de leden..."
          value={search}
          onChange={(e) => handelChange(e.target.value)}
          className="outline-none focus:outline-blue-500 border border-black rounded-md w-full px-2 py-1"
        />
      </div>

      <div className="">
        <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-7 gap-4 ml-6 mr-6">
          <p className="text-lg font-semibold">Stamnummer</p>
          <p className="text-lg font-semibold">Voornaam</p>
          <p className="text-lg font-semibold">Achternaam</p>
          <p className="text-lg font-semibold">Email</p>
          <p className="text-lg font-semibold">Bekijk</p>
          <p className="text-lg font-semibold">Wijzig</p>
          <p className="text-lg font-semibold">Verwijderen</p>
        </div>
        {users.map((user: any, index: number) => (
          <div
            key={user.id}
            className={`grid grid-cols-7 gap-4 ml-6 mr-6 p-4 ${
              index % 2 === 0 ? "bg-white" : "bg-blue-100"
            } mt-2`}
          >
            <p className="text-lg">{user.attributes.stamNr}</p>
            <p className="text-lg">{user.attributes.voornaam}</p>
            <p className="text-lg">{user.attributes.achternaam}</p>
            <p className="text-lg">{user.attributes.email}</p>
            <a
              href={`/detail/${user.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded"
            >
              Bekijk
            </a>
            <a
              href={`/user/${user.id}`}
              className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded"
            >
              Wijzig
            </a>
            <DeleteUser id={user.id} />
          </div>
        ))}
      </div>
    </>
  );
};
export default UserFilter;
