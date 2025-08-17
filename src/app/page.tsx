import Link from "next/link";
import { Header } from "./header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="font-sans flex flex-col justify-center items-center min-h-screen p-8 pb-20 gap-12 sm:p-20 bg-gradient-to-b from-green-50 to-green-100">
        <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-green-900 tracking-tight text-center sm:text-left mb-2">
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
        <footer className="flex items-center justify-center mt-10 text-sm text-gray-600">
          <a
            className="hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Next.js
          </a>
        </footer>
      </div>
    </>
  );
}
