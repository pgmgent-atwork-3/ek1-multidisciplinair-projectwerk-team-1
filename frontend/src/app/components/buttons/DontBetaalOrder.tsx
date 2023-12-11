"use client"
import { updateOrderPaid } from "@/app/api/api"

const DontBetaalOrder = ( {id}:number) => {
    const handelDontBetaalOrder = () =>{
        const boolean = false;
        updateOrderPaid(id, boolean).then(() => {
            alert("Order upgedate");
            window.location.reload();
          });
    }

    return (
        <button
            onClick={() => {
                if (confirm("Ben je zeker dat deze persoon niet betaald heeft?")) {
                    handelDontBetaalOrder();
                }
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
            Niet betaald
        </button>
    );
}

export default DontBetaalOrder;