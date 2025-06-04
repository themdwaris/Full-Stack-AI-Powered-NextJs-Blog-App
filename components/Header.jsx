"use client";
import React from "react";
import { RiBloggerFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useBlogContext } from "@/context/BlogContext";

const Header = () => {
  const { openProfile, setOpenProfile,searchQuery,setSearchQuery,user,handleLogout } = useBlogContext();
 
  return (
    <div className="w-full backdrop-blur-sm sticky top-0 z-50 px-5 md:border-b border-b-gray-800 bg-transparent">
      <div className="h-[65px] max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold">
          <span className="text-4xl text-slate-100">
            <RiBloggerFill />
          </span>
        </Link>
        <div className={`flex items-center justify-end gap-3`}>
          <div className="w-[60%] md:w-full py-1.5 px-3 bg-black/80 dark:bg-white/10 rounded-3xl flex items-center justify-between">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e)=>setSearchQuery(e.target.value)}
              className="w-full border-none outline-none text-sm"
            />
            <span className="text-gray-400">
              <FiSearch size={16} />
            </span>
          </div>
          <div className="relative ">
            {user?.name ? (
              <>
                <span
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-900 font-bold text-xl flex items-center justify-center cursor-pointer transition transform active:scale-90"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  {user?.name[0]}
                </span>
                <div
                  className={`w-40 px-5 py-3 absolute rounded-lg bg-black/90 border border-gray-700 ${
                    openProfile ? "flex right-1" : "hidden"
                  } flex-col items-start gap-2.5 z-40 top-13 transition-all transform`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    href={"/"}
                    className="transition transform active:scale-90 hover:text-slate-300"
                    onClick={() => setOpenProfile(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href={"/addBlog"}
                    className="transition transform active:scale-90 hover:text-slate-300"
                    onClick={() => setOpenProfile(false)}
                  >
                    Add blogs
                  </Link>
                  <Link
                    href={"/blogList"}
                    className="transition transform active:scale-90 hover:text-slate-300"
                    onClick={() => setOpenProfile(false)}
                  >
                    Blog list
                  </Link>
                  <button
                    className="cursor-pointer transition transform active:scale-90 hover:text-slate-300"
                    onClick={() => {
                      setOpenProfile(false)
                      handleLogout()
                    }}
                    
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href={"/login"} className="px-3 py-1.5 leading-1.5 rounded-3xl bg-slate-200 text-black/80 cursor-pointer transition transform active:scale-90 text-sm font-semibold">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
