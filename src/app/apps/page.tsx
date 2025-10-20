"use client";

import { usePathname } from "next/navigation";

export default function Apps() {
  const pathname = usePathname();
  const cleanPathname = pathname.replace(/^\/+/, "");
  return (
    <section>
      <h1 className="text-2xl">Yeah, this is the {cleanPathname} page</h1>
      <h1 className="text-2xl font-bold">
        ... but your have to click on Revenue
      </h1>
    </section>
  );
}
