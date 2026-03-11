import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold">403</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Unauthorized Access
      </h2>

      <p className="mt-2 text-gray-600">
        You do not have permission to view this page.
      </p>

      <Link
        href="/"
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </Link>
    </div>
  );
}