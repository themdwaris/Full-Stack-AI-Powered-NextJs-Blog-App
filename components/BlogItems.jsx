"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import { useBlogContext } from "@/context/BlogContext";
import BlogLoader from "./BlogLoader";


const BlogItems = () => {
  const { searchQuery, blogs, loading, page, setPage, totalPage } =
    useBlogContext();
  const [allBlog, setAllBlog] = useState([]);
  const [category, setCategory] = useState("All");
  

  const filteredBlogs = allBlog?.filter((fb) =>
    fb?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  useEffect(() => {
    if (blogs && blogs?.length > 0) {
      setAllBlog([...blogs]);
    }
  }, [blogs]);
  // console.log(totalPages);

  return (
    <div className="w-full my-10">
      
      <div className="flex items-center justify-center gap-3 md:gap-6 dark:text-black">
        <button
          className={`rounded-3xl px-2.5 py-1 text-xs md:text-sm font-semibold cursor-pointer transition active:scale-90 ${
            category === "All"
              ? "bg-white/10 text-slate-200"
              : "bg-slate-200 text-black"
          }`}
          onClick={() => {
            setPage(1)
            setCategory("All")

          }}
        >
          All
        </button>
        <button
          className={`rounded-3xl px-2.5 py-1 text-xs md:text-sm font-semibold cursor-pointer transition active:scale-90 ${
            category === "Technology"
              ? "bg-white/10 text-slate-200"
              : "bg-slate-200 text-black"
          }`}
          onClick={() => setCategory("Technology")}
        >
          Technology
        </button>
        <button
          className={`rounded-3xl px-2.5 py-1 text-xs md:text-sm font-semibold cursor-pointer transition active:scale-90 ${
            category === "Startup"
              ? "bg-white/10 text-slate-200"
              : "bg-slate-200 text-black"
          }`}
          onClick={() => setCategory("Startup")}
        >
          Startup
        </button>
        <button
          className={`rounded-3xl px-2.5 py-1 text-xs md:text-sm font-semibold cursor-pointer transition active:scale-90 ${
            category === "Lifestyle"
              ? "bg-white/10 text-slate-200"
              : "bg-slate-200 text-black"
          }`}
          onClick={() => setCategory("Lifestyle")}
        >
          Lifestyle
        </button>
      </div>
      {loading && filteredBlogs?.length === 0 ? (
        <div className="w-full flex items-center justify-center h-[60vh]">
          <BlogLoader />
        </div>
      ) : (
        <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-x-5 gap-y-8">
          {filteredBlogs &&
            filteredBlogs?.length > 0 &&
            filteredBlogs
              ?.filter((fb) =>
                category === "All" ? fb : fb.category === category
              )
              ?.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      )}
      <div className="px-5 flex items-center justify-center gap-3.5 mt-16">
        <button
          disabled={page===1}
          className={`px-2.5 py-1.5 rounded bg-slate-200 text-black text-sm font-semibold transition transform active:scale-90 ${page===1?"opacity-65 cursor-not-allowed":"cursor-pointer"}`}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="text-sm font-semibold ">
          {page} / {totalPage}
        </span>
        <button
        disabled={page>=totalPage}
          className={`px-2.5 py-1.5 rounded bg-slate-200 text-black text-sm font-semibold transition transform active:scale-90 ${page>=totalPage?"opacity-65 cursor-not-allowed":"cursor-pointer"}`}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogItems;
