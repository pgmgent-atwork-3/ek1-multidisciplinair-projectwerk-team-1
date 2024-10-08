import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { loadColorRings, loadInoxRings } from "@/app/api/api";
import BestelForm from "@/app/components/BestelForm";

const bestelPage = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/`);
  }

  const collorRings = await loadColorRings();
  const inoxRing = await loadInoxRings();

  return (
    <div className="container lg">
      <BestelForm 
      collorRing={collorRings}
      inoxRing={inoxRing}
      user={params.id}
      betaling={"admin"}
      />
      
    </div>
  );
};

export default bestelPage;
