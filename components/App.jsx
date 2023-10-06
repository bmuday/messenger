"use client";

import LeftBar from "@/components/LeftBar";
import Sidebar from "@/components/SideBar";
import Image from "next/image";
import Link from "next/link";

export default function App({ users, groups }) {
  // <LeftBar />
  // <Sidebar users={users} groups={groups} />
  const menuLinks = [1, 1, 1];
  return (
    <div className="h-full">
      {/* LeftBar */}
      <div className="justify-between hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:w-20 xl:px-6 lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col lg:overflow-y-auto">
        <nav
          role="list"
          className="flex flex-col items-center mt-4 space-y-2"
        ></nav>
        <nav className="flex flex-col items-center justify-between w-full mt-4">
          <div className="transition cursor-pointer hover:opacity-75">
            <div className="relative">
              <div className="relative inline-block overflow-hidden rounded-full w-9 h-9">
                <Image
                  src={""}
                  alt="user"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
                <span className="absolute inline-block rounded-full bg-green-500 top-0 right-0 h-2 w-2 md:h-2.5 md:w-2.5 ring-2 ring-white"></span>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Fixed */}
      <div className="fixed bottom-0 z-40 flex items-center justify-between w-full bg-white border-t lg:hidden">
        <ul>
          {menuLinks?.map((l) => (
            <Link
              href={""}
              className="flex justify-center w-full p-4 font-semibold leading-6 text-gray-500 group gap-x-3 hover:text-gray-800 hover:bg-gray-100 false"
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-5 h-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </Link>
          ))}
        </ul>
      </div>
      {/* Aside */}
      <main className="h-full lg:pl-20">
        <div className="h-full">
          <aside className="fixed inset-y-0 left-0 z-50 block w-full pb-20 overflow-y-auto border-r border-gray-200 lg:pb-0 lg:left-20 lg:w-80 lg:block">
            <div className="px-5">
              <div className="flex-col">
                <div className="py-4 text-2xl font-bold text-neutral-800">
                  Peoples
                </div>
              </div>
              <div className="space-y-2">
                <ul>
                  {users?.map((u) => (
                    <div>
                      <div className="relative flex items-center w-full px-3 py-2 space-x-3 transition ease-out bg-white rounded-lg cursor-pointer hover:bg-gray-100">
                        <div className="relative">
                          <div className="relative inline-block overflow-hidden rounded-full w-9 h-9">
                            <Image
                              src={""}
                              alt="user"
                              width={500}
                              height={500}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="focus:outline-none">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-gray-900">
                                Baptiste
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
          {/* MainBar */}
          <div className="hidden h-full lg:block lg:pl-80">
            <section className="w-full h-full">
              <div className="flex items-center justify-center h-screen to-blue-500">
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={""}
                    alt=""
                    width={2000}
                    height={2000}
                    className="object-cover h-auto w-80"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">
                    Connect and chat with friends
                  </h2>
                  <p className="max-w-lg mt-4 text-center text-gray-500">
                    Connect
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
