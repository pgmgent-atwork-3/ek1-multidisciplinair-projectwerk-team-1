import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import UserForm from "@/app/components/UserForm";
import { fetchUser } from "@/app/api/api";

const page = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/user/${params.id}`);
  }
  const user = await fetchUser(params.id);
  console.log("test", user);

  return (
    <div className="container lg m-auto">
      <UserForm user={user} />
    </div>
  );
};

export default page;
