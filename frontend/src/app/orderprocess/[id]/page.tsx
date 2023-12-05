import { fetchOrderById } from "@/app/api/api";
import OrderProcess from "@/app/components/OrderProcess";

const processOrder = async ({ params }: { params: { id: number } }) => {
  const orderData = await fetchOrderById(params.id);
  
  return (
    <div>
      <OrderProcess  orderData={orderData}/>
      
    </div>
  );
};

export default processOrder;
