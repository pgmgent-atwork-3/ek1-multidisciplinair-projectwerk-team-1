"use client";
import { CREATE_ORDER } from "@/lib/mutations/orders";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const NewOrder = () => {
  const [order, setOrder] = useState('');

  return (
    <>
      <h1>New Order</h1>
      <form action="">
        <label htmlFor="stamnr">StamNr</label>
        <input type="text"
        id="stamnr"
        name="stamNr" />
      </form>
    </>
  );
}

export default NewOrder