import Image from "next/image";
import Link from "next/link";

type navLinks = {
  label: string;
  link: string;
};

const navList: navLinks[] = [
  {
    label: "zustand",
    link: "/zustand",
  },
  {
    label: "formik",
    link: "/formik",
  },
  {
    label: "limit order",
    link: "/limit-order",
  },
];
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          {navList.map(({ label, link }, index) => {
            const extrnalStyles =
              index % 2 == 0
                ? "bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
                : "rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]";
            return (
              <Link
                href={link}
                key={link}
                className={
                  "flex h-12 w-full items-center justify-center gap-2 rounded-full " +
                  extrnalStyles
                }
              >
                {label}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
