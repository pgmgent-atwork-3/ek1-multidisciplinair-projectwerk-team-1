import { authOptions } from "@/lib/authOptions";
import { get } from "http";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex flex-col items-center justify-between">
      <Image
        alt="vogels"
        src="/img/welcome.png"
        width={1000}
        height={1000}
        className="absolute top-32 left-0 w-full h-5/6 z-0"
      />
      <header className="bg-blue-500 text-white p-4 w-full text-center z-10">
        <h1 className="text-4xl font-bold">Welkom</h1>
        <p>Dit is een site om ringen te kopen voor je vogels.</p>
      </header>

      <section className="mb-8 mt-80">
        <div className="flex justify-center space-x-4">
          <a
            href={`/bestelling/${session?.id}`}
            className="bg-green-500 text-white py-2 px-4 rounded z-10"
          >
            Nieuwe bestelling
          </a>
          <a
            href={`/mijnbestellingen/${session?.id}`}
            className="bg-green-500 text-white py-2 px-4 rounded z-10"
          >
            Bestellingen bekijken
          </a>
          <a
            href={`/user/${session?.id}`}
            className="bg-green-500 text-white py-2 px-4 rounded z-10"
          >
            Account bijwerken
          </a>
        </div>
      </section>
      <footer className="text-center p-4 bg-gray-500 text-white absolute bottom-0 z-10">
        <p>Dank u voor het vertrouwen in onze site</p>
      </footer>
    </main>
  );
}
