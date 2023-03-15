import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";

function Chip({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={twMerge(
        "border rounded-2xl py-1 px-4 text-slate-500 text-xl mb-5 hover:scale-105 transition duration-300 ease-in-out",
        className
      )}
    />
  );
}

export default Chip;
