import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-b from-green-50 to-green-100">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 tracking-tight text-center sm:text-left mb-2 drop-shadow-lg">
          STORYNEST
        </h1>
        <p className="text-lg text-gray-700 max-w-xl text-center sm:text-left">
          Discover, read and review stories. Explore all authors. Use the links below to get started.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <Link
            href="/stories"
            className="rounded-full border border-transparent bg-green-600 text-white font-medium text-lg px-6 py-3 transition hover:bg-green-700 shadow-lg"
          >
            📚 Browse Stories
          </Link>
          <Link
            href="/author"
            className="rounded-full border border-green-600 text-green-700 bg-white font-medium text-lg px-6 py-3 transition hover:bg-green-50 hover:border-green-800 shadow"
          >
            🧑‍💻 Meet the Authors
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mt-16">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn Next.js
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          More Templates
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Next.js Docs
        </a>
      </footer>
    </div>
  );
}
