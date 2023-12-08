import { fetchAllOrders } from "@/app/api/api";
import OrderFinalizing from "@/app/components/OrderFinalizing";

const orderFinalizingPage = async () => {
  const orderData = await fetchAllOrders();
  const orderToProcess = orderData.filter((order) => order.attributes.paid === true && order.attributes.processed === false)

  return (
    <div>
       <OrderFinalizing data={orderToProcess} />
    </div>
  );
};

export default orderFinalizingPage;
