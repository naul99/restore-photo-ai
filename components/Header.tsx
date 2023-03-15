import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  return (
    <header className="w-full mt-5 border-b-2 pb-4 sm:pb-7 sm:px-4 px-2 flex sm:flex-row space-y-4 flex-col justify-between items-center">
      <Link href="/" className="flex space-x-2 items-center">
        <Image
          alt="header text"
          src="/icon-192.png"
          className="sm:w-14 sm:h-14 w-9 h-9"
          width={36}
          height={36}
        />
        <h1 className="sm:text-2xl text-xl font-bold ml-2 tracking-tight">
          Khôi Phục Ảnh
        </h1>
      </Link>
      <Navigation />
    </header>
  );
}

function Navigation() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap items-center space-x-2 text-sm font-medium text-center text-gray-500">
      {[
        ["Khôi phục mặt", "/khoi-phuc-khuon-mat", ""],
        ["Khôi phục màu", "/khoi-phuc-mau-sac", "Mới"],
      ].map(([navLabel, navPath, badge]) => (
        <Link
          key={navPath}
          href={navPath}
          className={clsx([
            "inline-block px-4 py-3 rounded-lg",
            router.asPath === navPath
              ? "text-white bg-gradient-to-br to-[#6A3DE8] from-[#536DFE]"
              : "hover:text-gray-900 hover:bg-gray-100",
          ])}
        >
          {navLabel}{" "}
          {badge && (
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
