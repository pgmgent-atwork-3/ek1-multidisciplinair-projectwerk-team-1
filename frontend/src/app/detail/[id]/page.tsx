import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { fetchUser } from "@/app/api/api";

const page = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/user/${params.id}`);
  }

  const user = await fetchUser(params.id);

  let lid: string;
  if (user.attributes.lid == true) {
    lid = "Ja";
  } else {
    lid = "Nee";
  }

  return (
    <div className="ml-32 mr-32 mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Gegevens van {user.attributes.voornaam} {user.attributes.achternaam}
        </h1>
        <div className="flex gap-2">
          <p className="font-semibold">StamNr :</p>
          <p>{user.attributes.stamNr}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Naam :</p>
          <p>
            {user.attributes.voornaam} {user.attributes.achternaam}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Email :</p>
          <p>{user.attributes.email}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Telefoon :</p>
          <p>{user.attributes.telefoon}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Adres :</p>
          <p>
            {user.attributes.straat} {user.attributes.huisNr}
          </p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Postcode :</p>
          <p>{user.attributes.postcode}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Gemeente :</p>
          <p>{user.attributes.gemeente}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Land :</p>
          <p>{user.attributes.land}</p>
        </div>
        <div className="flex gap-2">
          <p className="font-semibold">Lid :</p>
          <p>{lid}</p>
        </div>
        <a
          href={`/user/${user.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded mt-4 block"
        >
          Wijzig
        </a>
      </div>
      <div>
        <a
          className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded mt-4 block"
          href={`/bestelling/${user.id}`}
        >
          Bestelling toevoegen
        </a>
      </div>
      <div>
        <a
          className="bg-blue-500 hover:bg-blue-600 text-white text-center font-bold py-2 px-4 rounded mt-4 block"
          href={`/orderoverzicht/${user.id}`}
        >
          Bestellingen bekijken
        </a>
      </div>
    </div>
  );
};

export default page;
