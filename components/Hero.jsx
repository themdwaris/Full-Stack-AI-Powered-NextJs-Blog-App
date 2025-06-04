import React from "react";
import { BsStars } from "react-icons/bs";

const Hero = () => {
  return (
    <div className="w-full text-center py-8 ">
      <div className="max-w-2xl mx-auto mt-8">
        <p className="text-sm text-slate-200 font-semibold text-center inline-flex items-center cursor-pointer gap-2 bg-white/15 rounded-full py-1 px-3 hover:bg-white/25"><span>Generate with AI</span> <span><BsStars size={18}/></span></p>
        <h1 className="text-5xl md:text-6xl font-semibold py-5 bg-gradient-to-r from-slate-200 to-slate-500 inline-block text-transparent bg-clip-text">
          Explores, our latest blogs
        </h1>
        <p className="text-sm max-w-[500px] mx-auto text-slate-300">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias aliquid, dolorem aut pariatur tenetur vitae porro.
        </p>
        <div className="w-full max-w-xl mt-10">
            <h1 className="text-4xl py-5 font-semibold bg-gradient-to-r from-slate-500 to-slate-200 inline-block text-transparent bg-clip-text">news letter</h1>
           <div className="w-full flex flex-col md:flex-row items-center gap-3">
           <input type="email" placeholder="Enter your email" className="outline-none bg-white/10 w-full p-3 "/>
           <button className="w-full md:w-auto px-4 py-[11px] bg-gradient-to-r from-slate-200 to-slate-500 transition transform active:scale-90 cursor-pointer text-black font-semibold">Subscribe</button>
            </div> 
        </div>
      </div>
    </div>
  );
};

export default Hero;
