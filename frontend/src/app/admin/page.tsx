import { fetchUser } from "@/app/api/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import UserFilter from "../components/UserFilter";

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }
  const activeUser = await fetchUser(session.id);
  if (activeUser.attributes.role?.data.attributes.name !== "admin") {
    return <h1 className="text-4xl ">Not authorized</h1>;
  }

  return (
    <div className="container lg m-auto">
      <div className="flex justify-between py-4">
        <div className="flex ml-6 items-center">
          <div className="flex justify-around gap-4">
            <a
              href="/orderfinalizing"
              className="bg-blue-700 hover:bg-blue-800 text-white text-center font-bold py-2 px-4 rounded"
            >
              Maand verkoop
            </a>
            <a
              href="/orderoverzicht"
              className="bg-blue-700 hover:bg-blue-800 text-white text-center font-bold py-2 px-4 rounded"
            >
              Bestel geschiedenis
            </a>
            <a
              href="/excel"
              className="bg-blue-700 hover:bg-blue-800 text-white text-center font-bold py-2 px-4 rounded"
            >
              Leden wijzigen met excel
            </a>
          </div>
        </div>
        <div className="flex justify-end mr-6 items-center">
          <div className="flex justify-around gap-4">
            <a
              href="/admin/rings"
              className="bg-slate-500 hover:bg-slate-600 text-white text-center font-bold py-2 px-4 rounded"
            >
              Ringmaten Aanpassen
            </a>
            <a
              href="/admin/year-colors"
              className="bg-slate-500 hover:bg-slate-600 text-white text-center font-bold py-2 px-4 rounded"
            >
              Jaar kleuren en post prijzen
            </a>
          </div>
        </div>
      </div>
      <UserFilter />
    </div>
  );
};
export default Admin;
