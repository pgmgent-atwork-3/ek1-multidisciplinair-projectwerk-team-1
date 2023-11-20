import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-4 min-w-full">
      <ul className="flex justify-evenly text-2xl font-bold text-white">
        <li>
          <Link href="/">Home</Link>
        </li>
        {session ? (
          <li>
            <Link href="/api/auth/signout">Sign Out</Link>
          </li>
        ) : (
          <li>
            <Link href="/api/auth/signin">Sign In</Link>
          </li>
        )}
        <li>
          <Link href="/requests">Requests</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/extra">Extra</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
}
