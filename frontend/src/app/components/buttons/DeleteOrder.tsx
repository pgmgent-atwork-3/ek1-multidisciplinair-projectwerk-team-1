"use client";
import { deleteOrder } from "@/app/api/api";

const DeleteOrder = (id: number) => {
  const handelDeleteOrder = () => {
    deleteOrder(id).then(() => {
      alert("Bestelling verwijderd");
      window.location.reload();
    });
  };

  return (
    <button
      onClick={() => {
        if (confirm("Ben je zeker dat je deze bestelling wilt verwijderen?")) {
          handelDeleteOrder();
        }
      }}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Verwijderen
    </button>
  );
};

export default DeleteOrder;
