import { fetchAllOrders, fetchOrderById, fetchUser } from "@/app/api/api";
import OrderProcess from "@/app/components/OrderProcess";

const processOrder = async ({ params }: { params: { id: number } }) => {
  const orderData = await fetchOrderById(params.id);
  const orderTotalUser = await fetchAllOrders();
  const orderTotal = orderTotalUser.filter((order) => order.attributes.user.data.id === orderData.attributes.user.data.id)
  const ordersToProcessUser = orderTotal.filter((order) => order.attributes.paid === true && order.attributes.processed === false)
  const ordersToProcessUserMonth = ordersToProcessUser.filter((order) => order.attributes.month === orderData.attributes.month && order.attributes.year === orderData.attributes.year)
  const user = await fetchUser(orderData.attributes.user.data.id);
  return (
    <div>
      <OrderProcess  
      orderData={orderData}
      orderUser={ordersToProcessUserMonth}
      user={user}
      />
      
    </div>
  );
};

export default processOrder;
