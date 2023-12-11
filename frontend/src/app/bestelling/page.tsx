import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { loadColorRings, loadInoxRings, fetchAllUsers } from "@/app/api/api";
import BestelForm from "@/app/components/BestelForm";
import FindUser from "@/app/components/FindUser";

const bestelPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/user/`);
  }

  const users = await fetchAllUsers();
  const collorRings = await loadColorRings();
  const inoxRing = await loadInoxRings();

  return (
    <div>
      <FindUser users={users} />  
    </div>
  );
};

export default bestelPage;
