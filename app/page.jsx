import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="text-gray-800">
      <div className="container flex justify-center p-6 sm:py-12 lg:py-18 ">
        <div className="flex flex-col p-6 m-5 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold sm:text-6xl">Ac mattis</h1>
          <p></p>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Dictum aliquam porta
            <br className="hidden md:inline lg:hidden" />
          </p>
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link rel="noopener noreferrer" href="/posts">
              <button className="px-5 py-3 text-lg font-semibold rounded bg-violet-600 text-gray-50">
                Go to app
              </button>
            </Link>
          </div>
        </div>
        <Image
          src="https://mambaui.com/assets/svg/Business_SVG.svg"
          alt="assets"
          width={400}
          height={400}
          className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
        />
      </div>
    </section>
  );
}
