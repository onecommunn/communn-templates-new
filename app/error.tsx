"use client";

import { useEffect } from "react";
import Link from "next/link";
// import './error.css';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-screen max-h-screen">
      <div className="mx-auto flex flex-col justify-center items-center relative">
        <img
          src={
            "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          }
          alt="bg_vido"
        />
        <h1 className="absolute md:bottom-20 text-xl font-inter font-semibold">Oops! Something went wrong</h1>
      </div>
    </section>
  );
}
