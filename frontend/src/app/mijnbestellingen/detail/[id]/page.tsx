import { fetchOrderById } from "@/app/api/api";

const orderDetailUserPage = async ({ params }: { params: { id: number } }) => {
  const orderData = await fetchOrderById(params.id);

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Order Detail</h1>

        <div>
          <p>Kleur ringen</p>
          {orderData.attributes.color_ring.length > 0 ? (
            orderData.attributes.color_ring.map((ring) => (
              <div key={ring.id} className="mb-4">
                <p>Grote</p>
                <p>{ring.size}</p>
                <p>Aantal</p>
                <p>{ring.amount}</p>
              </div>
            ))
          ) : (
            <p>Geen kleur ringen</p>
          )}

          <p>Inox ringen</p>
          {orderData.attributes.inox_ring.length > 0 ? (
            orderData.attributes.inox_ring.map((ring) => (
              <div key={ring.id} className="mb-4">
                <p>Grote</p>
                <p>{ring.size}</p>
                <p>Aantal</p>
                <p>{ring.amount}</p>
              </div>
            ))
          ) : (
            <p>Geen inox ringen</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default orderDetailUserPage;
