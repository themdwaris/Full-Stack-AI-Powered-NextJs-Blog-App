"use client";
import Link from "next/link";

import React from "react";

const NavButton = () => {

  return (
    <div className="w-full flex items-center justify-center gap-6 mb-8">
      <Link
        href={"/"}
        className={`px-3 py-1.5 text-black font-semibold text-sm  rounded bg-slate-200 cursor-pointer transition transform active:scale-90 hover:bg-slate-300 `}
      >
        Home
      </Link>
      <Link
        href={"/addBlog"}
        className="px-3 py-1.5 text-black font-semibold text-sm  rounded bg-slate-200 cursor-pointer transition transform active:scale-90 hover:bg-slate-300"
      >
        Add blog
      </Link>
      <Link
        href={"/blogList"}
        className="px-3 py-1.5 text-black font-semibold text-sm  rounded bg-slate-200 cursor-pointer transition transform active:scale-90 hover:bg-slate-300"
      >
        Blog List
      </Link>
    </div>
  );
};

export default NavButton;
