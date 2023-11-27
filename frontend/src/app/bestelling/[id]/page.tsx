import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import loadColorRings, { fetchUser } from "@/app/api/api";
import BestelForm from "@/app/components/BestelForm";

const bestelPage = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/user/${params.id}`);
  }

  const collorRings = await loadColorRings();
  console.log(collorRings);

  const user = await fetchUser(params.id);

  return (
    <div>
      <BestelForm 
      data={collorRings}
      user={params.id}
      />
     

      <h1>RVS(INOX) ringen</h1>
      <h2>Mogelijk per stuk</h2>
      <div className="p-4 shadow-md rounded-lg bg-blue-100 mt-5 grid grid-cols-4 gap-4 ml-6 mr-6">
        <p className="text-lg font-semibold">Maat</p>
        <p className="text-lg font-semibold">Aantal</p>
        <p className="text-lg font-semibold">Prijs / Per stuk</p>
        <p className="text-lg font-semibold">Totaal</p>
      </div>
    </div>
  );
};

export default bestelPage;
