"use client";

import Loader from "@/components/Loader";
import NavButton from "@/components/NavButton";
import { useBlogContext } from "@/context/BlogContext";
import axios from "axios";
import { parse } from "marked";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsStars } from "react-icons/bs";
import { FaFileUpload } from "react-icons/fa";
// import Quill from "quill";

const AddBlogForm = () => {
  const {
    title,
    description,
    category,
    image,
    setTitle,
    setDescription,
    setCategory,
    setImage,
    editId,
    setEditId,
    getAllBlogs,
  } = useBlogContext();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const handleAddForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("editId", editId);
    formData.append("title", title);
    formData.append(
      "description",
      description ? description : quillRef.current.root.innerHTML
    );
    formData.append("category", category);
    formData.append("oldImage", image);
    image && formData.append("image", image);

    if (editId) {
      try {
        setLoading(true);
        const res = await axios.put("/api/blogs", formData);
        if (res?.data?.success) {
          toast.success(res.data.message);
          getAllBlogs();
          setEditId("");
          setTitle("");
          if (quillRef.current) {
            quillRef.current.setContents([]); // Clears the Quill editor
            quillRef.current.root.innerHTML = "";
          }
          setDescription("");
          setCategory("");
          // setPreview(null);
          setImage(false);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(res?.data?.message);
        }
      } catch (error) {
        setLoading(false);
        console.log("Failed to update blog::", error);
      }
    } else {
      try {
        setLoading(true);
        const res = await axios.post("/api/blogs", formData);
        if (res?.data?.success) {
          toast.success(res.data.message);
          setLoading(false);
          getAllBlogs();
          setTitle("");
          if (quillRef.current) {
            quillRef.current.setContents([]); // Clears the Quill editor
            quillRef.current.root.innerHTML = "";
          }
          setDescription("");
          setCategory("");
          // setPreview(null);
          setImage(false);
        } else {
          toast.error(res?.data?.message || "Error at addBlog at line:47");
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log("Failed to add blog::", error);
      }
    }
  };

  const generateBlogContent = async () => {
    if (!title) return toast.error("Please enter a title");
    try {
      setLoading2(true);
      const res = await axios.post("/api/gemini", { prompt: title });
      if (res?.data?.success) {
        quillRef.current.root.innerHTML = parse(res.data.content);
        setLoading2(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      setLoading2(false);
      toast.error(error);
    }
  };

  //Initiate quill only once
  // useEffect(() => {
  //   const loadQuill = async () => {
  //     if (!quillRef.current && editorRef.current) {
  //       const Quill = (await import("quill")).default;
  //       quillRef.current = new Quill(editorRef.current, {
  //         theme: "snow",
  //       });
  //     }
  //   };

  //   loadQuill();

  //   //   // Clean up to prevent duplicate instances
  //   return () => {
  //     if (quillRef.current) {
  //       quillRef.current.off("text-change");
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   if (!quillRef.current && editorRef.current) {
  //     quillRef.current = new Quill(editorRef.current, { theme: "snow" });
  //   }
  //   quillRef.current.on("text-change", () => {
  //     setDescription(quillRef.current.root.innerHTML);
  //   });
  //   if (editId && quillRef.current) {
  //     quillRef.current.root.innerHTML = description || "";
  //     setDescription(description || "");
  //   }

  //   // Clean up to prevent duplicate instances
  //   return () => {
  //     if (quillRef.current) {
  //       quillRef.current.off("text-change");
  //     }
  //   };
  // }, [editId]);

  useEffect(() => {
    let quillInstance;

    const loadQuill = async () => {
      if (!editorRef.current) return;

      const Quill = (await import("quill")).default;

      if (!quillRef.current) {
        quillInstance = new Quill(editorRef.current, { theme: "snow" });
        quillRef.current = quillInstance;

        quillInstance.on("text-change", () => {
          setDescription(quillInstance.root.innerHTML);
        });
      }

      if (editId && description && quillRef.current) {
        quillRef.current.root.innerHTML = description;
      }
    };

    loadQuill();

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
        quillRef.current = null;

        // OPTIONAL: remove Quill DOM (cleanup UI)
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
      }
    };
  }, []);

  return (
    <div className="w-full p-5">
      <div className="w-full max-w-6xl mx-auto mb-4 md:mb-10">
        <h1 className="text-2xl font-semibold mt-3 mb-8 md:my-8 bg-gradient-to-r from-slate-200 to-slate-500 inline-block text-transparent bg-clip-text">
          Add your interesting blogs.
        </h1>
        <NavButton />
        <div className="w-full bg-white/10 p-5 md:pl-10 rounded">
          <form
            onSubmit={handleAddForm}
            className="w-full h-full flex flex-col gap-6"
          >
            <div>
              <p className="font-semibold mb-2">Upload blog thumbnail</p>
              <label
                htmlFor="image"
                className="inline-block w-20 h-20 relative rounded"
              >
                <input
                  type="file"
                  name="oldImage"
                  id="image"
                  hidden
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {image ? (
                  <img
                    src={
                      typeof image === "object"
                        ? URL.createObjectURL(image)
                        : image
                    }
                    alt="upload-icon"
                    className="rounded w-20 h-20 object-contain cursor-pointer transition transform active:scale-90 absolute"
                  />
                ) : (
                  <span className="bg-black text-slate-200 flex items-center justify-center w-16 h-16 rounded-full absolute cursor-pointer transition transform active:scale-90">
                    <FaFileUpload size={30} />
                  </span>
                )}
              </label>
            </div>
            <div>
              <p className="font-semibold mb-2">Blog Title</p>
              <input
                type="text"
                name="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog Title"
                className="w-full max-w-2xl p-3 rounded border-none outline-slate-200 bg-black "
              />
            </div>
            <div className="mb-20 md:mb-10">
              <p className="font-semibold mb-2">Blog Description</p>
              <div className="w-full h-74 relative">
                <div ref={editorRef}></div>
                {loading2 && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader />
                  </div>
                )}
                <button
                  disabled={loading2}
                  className={`px-2 md:px-3 py-1.5 flex items-center gap-2 bg-slate-200 text-black text-xs md:text-sm font-semibold rounded-sm cursor-pointer absolute right-3 -bottom-14 md:-bottom-7 transition transform active:scale-90 hover:bg-slate-300 ${
                    loading2 && "opacity-65"
                  }`}
                  onClick={generateBlogContent}
                >
                  <span className="hover:underline">Generate with AI</span>
                  <span>
                    <BsStars size={16} />
                  </span>
                </button>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Blog Category</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="px-3 py-2 rounded border-none outline-slate-200 bg-black"
              >
                <option hidden>Select</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Startup">Startup</option>
              </select>
            </div>
            <button
              type="submit"
              className="my-5 px-3 py-2 w-40 flex items-center justify-center gap-3 cursor-pointer rounded bg-slate-200 text-base font-semibold text-black transition transform active:scale-90 hover:bg-slate-300"
            >
              <span>{editId ? "Update Blog" : "Add Blog"}</span>
              {loading && <Loader />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlogForm;
