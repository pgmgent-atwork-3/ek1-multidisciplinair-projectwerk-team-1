"use client"
import { deleteUser } from "@/app/api/api"

const DeleteUser = ( id:number) => {
    const handelDeleteUser = () =>{
        deleteUser(id).then(() => {
            alert("User deleted");
          });
    }

    return (
        <button
            onClick={() => {
                if (confirm("Are you sure you want to delete this user?")) {
                    handelDeleteUser();
                }
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
            Delete
        </button>
    );
}

export default DeleteUser;