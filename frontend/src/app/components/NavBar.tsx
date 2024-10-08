import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { fetchUser } from "@/app/api/api";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  let isAdmin = false;
  if (session) {
    const activeUser = await fetchUser(session.id);
    if (
      activeUser?.attributes &&
      activeUser?.attributes.role?.data.attributes.name == "admin"
    ) {
      isAdmin = true;
    }
  }

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-indigo-800 to-violet-700 p-4">
      <ul className="flex justify-evenly text-2xl font-bold text-white">
        <li>
          <Link
            href="/">
              Home
          </Link>
        </li>
        {session && (
          <>
            <li>
              <Link
                href={session ? `/bestelling/${session.id}` : "/bestelling "}
              >
                Nieuwe bestelling
              </Link>
            </li>
            <li>
              <Link
                href={
                  session
                    ? `/mijnbestellingen/${session.id}`
                    : "/mijnbestellingen"
                }
              >
                Bestellingen bekijken
              </Link>
            </li>
            <li>
              <Link href={session ? `/user/${session.id}` : "/user"}>
                Lid aanpassen
              </Link>
            </li>
          </>
        )}

        {isAdmin && (
          <li>
            <Link href="/admin">Admin Panel</Link>
          </li>
        )}
        {session ? (
          <li>
            <Link href="/api/auth/signout">Log uit</Link>
          </li>
        ) : (
          <li>
            <Link href="/api/auth/signin">Log In</Link>
          </li>
        )}
        {!session && (
          <li>
            <Link href="/register">Registreren</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
