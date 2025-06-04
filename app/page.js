"use client";
import React, { useEffect } from "react";
import Hero from "@/components/Hero";
import BlogItems from "@/components/BlogItems";
import { useBlogContext } from "@/context/BlogContext";


const Home = () => {
  const { getCurrentUser, getAllBlogs } = useBlogContext();
 
  useEffect(() => {
    getCurrentUser();
    getAllBlogs();
  }, []);
  return (
    <div className="px-5 w-full pb-10 max-w-6xl mx-auto ">
      <Hero />
      <BlogItems />
    </div>
  );
};

export default Home;
