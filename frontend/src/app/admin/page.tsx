import { fetchUser } from "@/app/api/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { fetchAllUsers } from "@/app/api/api";
import DeleteUser from "@/app/components/buttons/DeleteUser";

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/admin");
  }
  const activeUser = await fetchUser(session.id);
  if (activeUser.attributes.role?.data.attributes.name !== "admin") {
    return <h1 className="text-4xl ">Not authorized</h1>;
  }
  const users = await fetchAllUsers();

  return (
    <>
      <h2>Aanpasbare waarden</h2>
      <div className="flex justify-center gap-4 items-center mt-16">
      <a href="/admin/rings" className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded">
        Ringen
      </a>
      <a href="/admin/year-colors" className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded">
        Jaar kleuren en post prijzen
      </a>
    </div>
    <h2>Verkoop</h2>
      <div className="flex justify-center gap-4 items-center mt-16">
      <a href="/orderfinalizing" className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded">
        Maand verkoop
      </a>
      <a href="/orderoverzicht" className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded">
        Order geschiedenis
      </a>
    </div>
      <h2 className="text-4xl mt-4 ml-4">Users</h2>
      <div>
        <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-7 gap-4 ml-6 mr-6">
          <p className="text-lg font-semibold">Stamnummer</p>
          <p className="text-lg font-semibold">Voornaam</p>
          <p className="text-lg font-semibold">Achternaam</p>
          <p className="text-lg font-semibold">Email</p>
          <p className="text-lg font-semibold">Bekijk</p>
          <p className="text-lg font-semibold">Wijzig</p>
          <p className="text-lg font-semibold">Verwijder</p>
        </div>
        {users.map((user: any, index: number) => (
          <div
            key={user.id}
            className={`grid grid-cols-7 gap-4 ml-6 mr-6 p-4 ${
              index % 2 === 0 ? "bg-white" : "bg-blue-100"
            } mt-2`}
          >
            <p className="text-lg">{user.attributes.stamNr}</p>
            <p className="text-lg">{user.attributes.voornaam}</p>
            <p className="text-lg">{user.attributes.achternaam}</p>
            <p className="text-lg">{user.attributes.email}</p>
            <a
              href={`/detail/${user.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded"
            >
              Bekijk
            </a>
            <a
              href={`/user/${user.id}`}
              className="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded"
            >
              Wijzig
            </a>
            <DeleteUser id={user.id} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Admin;
