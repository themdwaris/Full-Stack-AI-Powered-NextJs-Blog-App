import React from "react";
import { RiBloggerFill } from "react-icons/ri";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className={`w-full bg-white/5`}>
      <div
        className={`px-5 py-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3.5 md:gap-0`}
      >
        <div className=" flex items-center gap-2.5">
          <span>
            <RiBloggerFill size={30} />
          </span>
          <span className="text-xl md:text-2xl font-bold">Blogian</span>
        </div>
        <div className="flex items-center gap-4 ">
          <span
            className={`cursor-pointer transition transform active:scale-90 hover:text-white/80`}
          >
            <FaXTwitter size={24} />
          </span>
          <span
            className={`cursor-pointer transition transform active:scale-90 hover:text-white/80`}
          >
            <FaGithub size={24} />
          </span>
          <span
            className={`cursor-pointer transition transform active:scale-90 hover:text-white/80`}
          >
            <FaLinkedin size={24} />
          </span>
          <span
            className={`cursor-pointer transition transform active:scale-90 hover:text-white/80`}
          >
            <FaInstagram size={24} />
          </span>
        </div>
      </div>
      <div className="px-5 bg-white/5 text-sm border-t border-t-gray-800 text-center flex items-center justify-center h-16  text-slate-200 tracking-wide">
        All Right Reserved - {new Date().getFullYear()} Copyright @Blogian
      </div>
    </div>
  );
};

export default Footer;
