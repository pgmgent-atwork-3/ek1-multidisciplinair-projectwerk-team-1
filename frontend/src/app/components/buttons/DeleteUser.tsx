"use client";
import { deleteUser } from "@/app/api/api";

const DeleteUser = (id: number) => {
  const handelDeleteUser = () => {
    deleteUser(id).then(() => {
      alert("Lid verwijderd");
    });
  };

  return (
    <button
      onClick={() => {
        if (confirm("Ben je zeker dat u dit lid wilt verwijderen?")) {
          handelDeleteUser();
        }
      }}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Verwijderen
    </button>
  );
};

export default DeleteUser;
