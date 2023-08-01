import Link from "next/link";
import { logIcons } from "@/lib/constants";

export default function LoginSignup({ login, signup }) {
  return (
    <div className="w-full max-w-md p-8 space-y-3 text-gray-800 rounded-xl bg-gray-50">
      <form action="" className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password..."
            className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-md bg-gray-50 focus:border-violet-600"
          />
          <div className="flex justify-end text-xs text-gray-600">
            <Link rel="noopener noreferrer" href="#">
              Forgot Password?
            </Link>
          </div>
        </div>
        <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-violet-600">
          {login && "Log In"}
          {signup && "Sign Up"}
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px bg-gray-300 sm:w-16"></div>
        <p className="px-3 text-sm text-gray-600">Or with social accounts</p>
        <div className="flex-1 h-px bg-gray-300 sm:w-16"></div>
      </div>
      <div className="flex flex-col justify-center space-x-4">
        <div className="flex justify-center m-3 space-x-4">
          {logIcons.map((i) => (
            <button
              key={i.name}
              aria-label={`Log in with ${i.name}`}
              className="p-3 rounded-sm"
            >
              {i.icon}
            </button>
          ))}
        </div>
        {login && (
          <p className="text-xs text-center text-gray-600 sm:px-6">
            <span className="mr-2">Don&apos;t have an account?</span>
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-gray-800 underline"
            >
              Sign up
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
