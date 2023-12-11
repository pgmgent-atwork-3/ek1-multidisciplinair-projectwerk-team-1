"use client";
import React, { useState } from "react";

const FindUser = ({ users }) => {
  const [stamNr, setStamNr] = useState("");

  const handelChangeStamNr = (element) => {
    setStamNr(element.target.value);
  };

  const submitStamNr = (event) => {
    event.preventDefault();
    const user = users.find((user) => user.attributes.stamNr === stamNr);
    if (user?.id) {
      const confirmAction = window.confirm(
        `Ben je zeker dat je voor ${user.attributes.voornaam} ${user.attributes.achternaam} wilt bestellen ?`
      );

      if (confirmAction) {
        window.location.href = `/bestelling/admin/${user.id}`;
      }
    } else {
      alert("StamNr niet gevonden");
    }
  };

  return (
    <div className="bg-white p-4">
      <h1 className="text-2xl font-bold">stamNr</h1>
      <input
        type="text"
        onChange={(element) => handelChangeStamNr(element)}
        className="mt-2 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={(event) => submitStamNr(event)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        submit
      </button>
    </div>
  );
};

export default FindUser;
