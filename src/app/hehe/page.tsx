import Image from 'next/image'

export default function HehePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center">
      <Image 
        src="https://media.tenor.com/x8v1oNUOmg4AAAAd/rickroll-roll.gif"
        alt="Rick Roll"
        width={400}
        height={300}
        priority
      />
      <p className="mt-8 text-xl text-pink-500 font-semibold">
        Hehehe hahaha! Remove "/hehe" from the URL to access the real website 😉
      </p>
    </main>
  )
} 