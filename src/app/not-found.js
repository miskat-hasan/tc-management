import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist or you do not have permission to view this page.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}