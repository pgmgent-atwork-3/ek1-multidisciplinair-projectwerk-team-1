"use client"
import { updateOrderPaid } from "@/app/api/api"

const BetaalOrder = ( {id}:number) => {
    const handelBetaalOrder = () =>{
        const boolean = true;
        updateOrderPaid(id, boolean).then(() => {
            alert("Order upgedate");
            window.location.reload();
          });
    }

    return (
        <button
            onClick={() => {
                if (confirm("Ben je zeker dat deze persoon betaald heeft?")) {
                    handelBetaalOrder();
                }
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
            Betaald
        </button>
    );
}

export default BetaalOrder;