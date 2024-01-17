import { fetchAllOrders } from "@/app/api/api";
import MonthlyOrderView from "@/app/components/MothlyOrderView";
import DeleteOrder from "@/app/components/buttons/DeleteOrder";
import BetaalOrder from "@/app/components/buttons/BetaalOrder";
import DontBetaalOrder from "@/app/components/buttons/DontBetaalOrder";

const orderoverzichtUserPage = async ({
  params,
}: {
  params: { id: number };
}) => {
  const orderData = await fetchAllOrders();
  console.log("orderCheck", orderData);
  const userOrders = orderData.filter(
    (order) => order.attributes.user.data.id === params.id
  );

  return (
    <div>
      <h1>Orderoverzicht</h1>
      <h2>Geschiedenis</h2>
      <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-4 gap-4 ml-6 mr-6">
        <p className="text-lg font-semibold">Month</p>
        <p className="text-lg font-semibold">Jaar</p>
        <p className="text-lg font-semibold">Prijs</p>
        <p className="text-lg font-semibold">Detail</p>
      </div>

      {userOrders.map((order, index) => (
        <div
          key={order.id}
          className={`grid grid-cols-4 gap-4 ml-6 mr-6 p-4 ${
            index % 2 === 0 ? "bg-white" : "bg-blue-100"
          } mt-2`}
        >
          <p>{order.attributes.month}</p>
          <p>{order.attributes.year}</p>
          <p>{order.attributes.price}</p>
          <a
            href={`/mijnbestellingen/detail/${order.id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
          >
            Detail
          </a>
        </div>
      ))}
    </div>
  );
};

export default orderoverzichtUserPage;
