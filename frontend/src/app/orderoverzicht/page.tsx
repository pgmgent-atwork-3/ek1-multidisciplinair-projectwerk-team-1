import { fetchAllOrders } from "@/app/api/api";

const orderoverzichtPage = async () => {
  const orderData = await fetchAllOrders();
  const orderToProcess = orderData.filter((order) => order.attributes.paid === true && order.attributes.processed === false)

  return (
    <div>

      <h2>Orderoverzicht</h2>
      <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-4 gap-4 ml-6 mr-6">
        <p className="text-lg font-semibold">Stam-Nr</p>
        <p className="text-lg font-semibold">Jaar</p>
        <p className="text-lg font-semibold">Prijs</p>
        <p className="text-lg font-semibold">Betaald</p>
      </div>

      {orderData.map((order, index) => (
       
          <div
          key={order.id}
            className={`grid grid-cols-4 gap-4 ml-6 mr-6 p-4 ${
              index % 2 === 0 ? "bg-white" : "bg-blue-100"
            } mt-2`}
          >
            <p>{order.attributes.user.data.attributes.stamNr}</p>
            <p>{order.attributes.year}</p>
            <p>{order.attributes.price}</p>
            {order.attributes.paid ? (
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
