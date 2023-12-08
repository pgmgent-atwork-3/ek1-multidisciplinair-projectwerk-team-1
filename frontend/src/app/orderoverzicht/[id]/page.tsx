import { fetchAllOrders } from "@/app/api/api";
import MonthlyOrderView from "@/app/components/MothlyOrderView";

const orderoverzichtPage = async ({ params }: { params: { id: number } }) => {
  const orderData = await fetchAllOrders();
  console.log("orderCheck", orderData);
  const userOrders = orderData.filter(
    (order) => order.attributes.user.data.id === params.id
  );
 

  return (
    <div>
      <h1>Orderoverzicht</h1>
      <MonthlyOrderView data={userOrders} />
      <h2>Geschiedenis</h2>
      <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-5 gap-4 ml-6 mr-6">
        <p className="text-lg font-semibold">Month</p>
        <p className="text-lg font-semibold">Jaar</p>
        <p className="text-lg font-semibold">Prijs</p>
        <p className="text-lg font-semibold">Betaald</p>
        <p className="text-lg font-semibold">Verwerkt</p>
      </div>

      {userOrders.map((order, index) => (
          <div
          key={order.id}
            className={`grid grid-cols-5 gap-4 ml-6 mr-6 p-4 ${
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
          </div>
      ))}
    </div>
  );
};

export default orderoverzichtPage;
