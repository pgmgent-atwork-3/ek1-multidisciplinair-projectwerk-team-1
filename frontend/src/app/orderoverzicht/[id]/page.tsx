import { fetchAllOrders } from "@/app/api/api";
import MonthlyOrderView from "@/app/components/MothlyOrderView";
import DeleteOrder from "@/app/components/buttons/DeleteOrder";
import BetaalOrder from "@/app/components/buttons/BetaalOrder";
import DontBetaalOrder from "@/app/components/buttons/DontBetaalOrder";

const orderoverzichtPage = async ({ params }: { params: { id: number } }) => {
  const orderData = await fetchAllOrders();
  const userOrders = orderData.filter(
    (order) => order.attributes.user.data.id === params.id
  );

  return (
    <div className="container lg m-auto my-6">
      <h1 className="text-4xl font-bold flex justify-center">
        Besteloverzicht voor{" "}
        {userOrders[0].attributes.user.data.attributes.voornaam}{" "}
        {userOrders[0].attributes.user.data.attributes.achternaam}{" "}
        {"("}{userOrders[0].attributes.user.data.attributes.stamNr}{")"}
      </h1>
      <MonthlyOrderView data={userOrders} />
      <h2 className="text-xl font-semibold ml-6 mt-6">Geschiedenis</h2>
      <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-7 gap-4 ml-6 mr-6">
        <p className="text-lg font-semibold">Maand</p>
        <p className="text-lg font-semibold">Jaar</p>
        <p className="text-lg font-semibold">Prijs</p>
        <p className="text-lg font-semibold">Betaald</p>
        <p className="text-lg font-semibold">Verwerkt</p>
        <p className="text-lg font-semibold">Heeft betaald</p>
        <p className="text-lg font-semibold">Verwijderen</p>
      </div>

      {userOrders.map((order, index) => (
        <div
          key={order.id}
          className={`grid grid-cols-7 gap-4 ml-6 mr-6 p-4 ${
            index % 2 === 0 ? "bg-white" : "bg-blue-100"
          } mt-2`}
        >
          <p>{order.attributes.month}</p>
          <p>{order.attributes.year}</p>
          <p>{order.attributes.price}</p>
          {order.attributes.paid ? (
            <p className="bg-green-500">Ja</p>
          ) : (
            <p className="bg-red-500">Nee</p>
          )}
          {order.attributes.processed ? (
            <p className="bg-green-500">Ja</p>
          ) : (
            <p className="bg-red-500">Nee</p>
          )}
          {order.attributes.paid ? (
            <DontBetaalOrder id={order.id} />
          ) : (
            <BetaalOrder id={order.id} />
          )}
          <DeleteOrder id={order.id} />
        </div>
      ))}
    </div>
  );
};

export default orderoverzichtPage;
