"use client"
import { deleteOrder } from "@/app/api/api"

const DeleteOrder = ( id:number) => {
    const handelDeleteOrder = () =>{
        deleteOrder(id).then(() => {
            alert("Order deleted");
            window.location.reload();
          });
    }

    return (
        <button
            onClick={() => {
                if (confirm("Are you sure you want to delete this order?")) {
                    handelDeleteOrder();
                }
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
            Delete
        </button>
    );
}

export default DeleteOrder;