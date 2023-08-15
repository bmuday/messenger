import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-center p-4 space-x-4 transition duration-500 transform bg-white border hover:shadow-lg">
      <div className="flex p-4 space-x-4 bg-gray-100 rounded w-72">
        <SearchIcon />
        <input
          className="bg-gray-100 outline-none"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center p-4 font-semibold text-gray-500 border rounded cursor-pointer">
        <span className="">All categories</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div className="p-4 font-semibold text-white transition bg-black rounded cursor-pointer hover:shadow-lg duration-3000">
        <button>Search</button>
      </div>
    </div>
  );
}
