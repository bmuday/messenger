import { SearchIcon } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center p-6 space-x-6 transition duration-500 transform bg-white shadow-lg rounded-xl hover:shadow-xl hover:scale-105">
      <div className="flex p-4 space-x-4 bg-gray-100 rounded-lg w-72">
        <SearchIcon />
        <input
          className="bg-gray-100 outline-none"
          type="text"
          placeholder="Search..."
        />
      </div>
      <div className="flex px-4 py-3 font-semibold text-gray-500 rounded-lg cursor-pointer">
        <span>All categories</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div className="px-5 py-3 font-semibold text-white transition bg-red-600 rounded-lg cursor-pointer hover:shadow-lg duration-3000">
        <button className="bg-red-500">Search</button>
      </div>
    </div>
  );
}
