import { fetchOrderById } from "@/app/api/api";

const orderDetailUserPage = async ({ params }: { params: { id: number } }) => {
  const orderData = await fetchOrderById(params.id);

  return (
    <div className="flex justify-center mt-6">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Order Detail</h1>
        <div>
          <h3 className="text-xl font-bold">Kleur ringen</h3>
          {orderData.attributes.color_ring.length > 0 ? (
            orderData.attributes.color_ring.map((ring) => (
              <div key={ring.id} className="mb-4">
                <h4 className="text-lg font-semibold">Grootte</h4>
                <p className="text-base">{ring.size}</p>
                <h4 className="text-lg font-semibold">Aantal</h4>
                <p className="text-base">{ring.amount}</p>
              </div>
            ))
          ) : (
            <p className="text-base">Geen kleur ringen</p>
          )}
          <h3 className="text-xl font-bold">Inox ringen</h3>
          {orderData.attributes.inox_ring.length > 0 ? (
            orderData.attributes.inox_ring.map((ring) => (
              <div key={ring.id} className="mb-4">
                <h4 className="text-lg font-semibold">Grootte</h4>
                <p className="text-base">{ring.size}</p>
                <h4 className="text-lg font-semibold">Aantal</h4>
                <p className="text-base">{ring.amount}</p>
              </div>
            ))
          ) : (
            <p className="text-base">Geen inox ringen</p>
          )}
          </div>
      </div>
    </div>
  );
};

export default orderDetailUserPage;
