import { fetchAllOrders } from "@/app/api/api";

const orderoverzichtUserPage = async ({
  params,
}: {
  params: { id: number };
}) => {
  const orderData = await fetchAllOrders();
  const userOrders = orderData.filter(
    (order) => order.attributes.user.data.id === params.id
  );

  return (
    <div className="container lg m-auto mt-6">
      <h1 className="text-3xl font-bold flex justify-center">Orderoverzicht</h1>
      <div className="mt-6">
        <h2 className="text-xl font-semibold ml-6">Geschiedenis</h2>
        <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-4 gap-4 ml-6 mr-6">
          <p className="text-lg font-semibold">Maand</p>
          <p className="text-lg font-semibold">Jaar</p>
          <p className="text-lg font-semibold">Prijs</p>
          <p className="text-lg font-semibold">Detail</p>
        </div>
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
