import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { fetchAllUsers } from "@/app/api/api";
import FindUser from "@/app/components/FindUser";

const bestelPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/user/`);
  }

  const users = await fetchAllUsers();

  return (
    <div className="container lg">
      <FindUser users={users} />  
    </div>
  );
};

export default bestelPage;
