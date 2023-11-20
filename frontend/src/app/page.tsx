import { authOptions } from '@/lib/authOptions';
import { get } from 'http'
import { getServerSession } from 'next-auth';
import Image from 'next/image'

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between min-w-full">
      {session ? (
        <div>
          <h1>Logged in</h1>
          <p>{session.user?.name}</p>
        </div>
      )
       : (
        <p>Not logged in</p>  
      )
      }
    </main>
  )
}
