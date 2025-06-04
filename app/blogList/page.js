"use client";

import { useBlogContext } from "@/context/BlogContext";
import React from "react";
import { MdEditDocument } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import BlogLoader from "@/components/BlogLoader";
import axios from "axios";
import toast from "react-hot-toast";
import NavButton from "@/components/NavButton";

const BlogList = () => {
  const { authorBlogs, loading, getAllBlogs,setEditId,router,setImage,setTitle,setDescription,setCategory } = useBlogContext();

  const deleteBlog = async (userId) => {
    try {
      const res = await axios.delete("/api/blogs", {data:{userId}});
      if (res?.data?.success) {
        toast.success(res.data.message);
        getAllBlogs();
        return;
      }
    } catch (error) {
      console.log("Failed to delete blog::", error);
    }
  };
  return (
    <div className="px-5 py-10 w-full">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold mb-10">
          {authorBlogs?.length} Blogs by you
        </h1>
        <NavButton/>
        {loading && authorBlogs?.length === 0 ? (
          <div className="w-full flex items-center justify-center h-[60vh]">
            <BlogLoader />
          </div>
        ) : (
          authorBlogs &&
          authorBlogs?.map((blog) => (
            <div
              key={blog?._id}
              className="py-4 border-b border-b-gray-700 w-full grid grid-cols-[1fr_2fr_.5fr] sm:grid-cols-[0.5fr_1.5fr_.2fr_1fr] gap-1 items-center"
            >
              <div>
                <img
                  src={blog?.image}
                  alt="blog-image"
                  className="w-20 h-12 object-cover rounded"
                />
              </div>
              <div className=" text-black dark:text-slate-200 font-semibold text-ellipsis truncate">
                {blog?.title}
              </div>
              <div className="hidden sm:block text-sm font-semibold">
                {blog?.category}
              </div>
              <div className="flex items-center gap-1.5 md:gap-3.5 justify-end">
                <span className="cursor-pointer transition transform active:scale-90 text-green-300" onClick={()=>{
                  setEditId(blog?._id)
                  setImage(blog?.image)
                  setTitle(blog?.title)
                  setDescription(blog?.description)
                  setCategory(blog?.category)
                  router.push("/addBlog")
                }}>
                  <MdEditDocument size={25} />
                </span>
                <span
                  className="cursor-pointer transition transform active:scale-90 text-red-400"
                  onClick={() => deleteBlog(blog?._id)}
                >
                  <BsTrash3Fill size={25} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;
