import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { fetchUser, loadColorRings, loadInoxRings } from "@/app/api/api";
import BestelForm from "@/app/components/BestelForm";

const bestelPage = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/bestelling/${params.id}`);
  }

  const collorRings = await loadColorRings();
  const inoxRing = await loadInoxRings();
  const user = await fetchUser(params.id)

  if(user.attributes.lid === false){
    return(
      <h1>Geen lid van de organizatie, u kan dus geen ringen bestellen!</h1>
    )
  }

  return (
    <div className="container lg m-auto my-4">
      <BestelForm
        collorRing={collorRings}
        inoxRing={inoxRing}
        user={params.id}
        betaling={true}
      />
    </div>
  );
};

export default bestelPage;
