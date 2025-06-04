"use client";
import Loader from "@/components/Loader";
import { useBlogContext } from "@/context/BlogContext";
import axios from "axios";

import React, { useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [login, setLogin] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {router}=useBlogContext()
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (login === "register") {
        setLoading(true);
        const res = await axios.post(`/api/signup`, { name, email, password });
        if (res?.data?.success) {
          setLoading(false);
          toast.success(res.data.message);
          setLogin("login");
        }else{
          toast.error(res?.data?.message)
          setLoading(false)
        }
      } else {
        setLoading(true);
        const res = await axios.post("/api/login", { email, password });
        if (res?.data?.success) {
          
          toast.success(res.data.message);
          router.push("/");
          setName("");
          setEmail("");
          setPassword("");
          setLoading(false);
        }else{
          setLoading(false)
          toast.error(res?.data?.message)
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to authenticate::", error);
    }
  };

  return (
    <div className="px-5 w-full flex justify-center items-center h-[calc(100vh-60px)]">
      <form
        onSubmit={handleFormSubmit}
        className="w-full max-w-[450px] mx-auto p-4 bg-white/10 flex flex-col gap-3.5 items-center"
      >
        <div className="py-4 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-200 to-slate-500 inline-block text-transparent bg-clip-text">
            {login === "login" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="py-3.5">
            {login === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            {login === "login" ? (
              <span
                className="underline text-sm cursor-pointer transition transform active:scale-90"
                onClick={() => setLogin("register")}
              >
                &nbsp;Sign Up
              </span>
            ) : (
              <span
                className="underline text-sm cursor-pointer transition transform active:scale-90"
                onClick={() => setLogin("login")}
              >
                &nbsp;Login
              </span>
            )}
          </p>
        </div>

        {login === "register" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 bg-black text-slate-200 border-b border-b-slate-200 outline-none outline-slate-200"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 outline-none bg-black text-slate-200 border-b border-b-slate-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 outline-none bg-black text-slate-200 border-b border-b-slate-200"
        />
        <button
          type="submit"
          disabled={loading}
          className={`mt-5 w-full p-3 flex items-center justify-center gap-3 bg-slate-200 text-base font-semibold cursor-pointer transition text-black transform active:scale-90 hover:bg-slate-100 ${
            loading && "opacity-65"
          }`}
        >
          {login === "login" ? "Login" : "Sign Up"} {loading && <Loader />}
        </button>
      </form>
    </div>
  );
};

export default Login;
