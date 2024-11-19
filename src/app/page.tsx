import Link from "next/link";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div className="items-center justify-items-center">
      <main className="flex flex-col gap-8 ">
        <Typography
          variant="h1"
          className="mt-60 text-4xl font-bold text-center bg-black rounded-full p-8"
        >
          Welcome to Beer Club Colombia
        </Typography>
        <Link className="min-w-full" href="/order">
          <Typography
            variant="h2"
            className="text-2xl font-bold text-center bg-black rounded-full p-8"
          >
            Order Now
          </Typography>
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
