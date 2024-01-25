import { fetchAllOrders } from "@/app/api/api";
import OrderFinalizing from "@/app/components/OrderFinalizing";

const orderFinalizingPage = async () => {
  const orderData = await fetchAllOrders();
  const orderToProcess = orderData.filter((order) => order.attributes.paid === true && order.attributes.processed === false)

  return (
    <div className="container lg m-auto my-6">
      <OrderFinalizing data={orderToProcess} />
    </div>
  );
};

export default orderFinalizingPage;
