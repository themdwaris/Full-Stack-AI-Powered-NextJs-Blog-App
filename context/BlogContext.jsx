"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect,useState } from "react";
import toast from "react-hot-toast";

const BlogContext = createContext();

export const BlogContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [authorBlogs, setAuthorBlogs] = useState([]);
  const [openProfile, setOpenProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [editId, setEditId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/currentUser");
      if (res?.data?.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log("Failed to get current user::", error);
    }
  };
  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/logout");
      if (res?.data?.success) {
        toast.success(res.data.message);
        setUser(null);
        router.push("/");
      }
    } catch (error) {
      console.log("Failed to logged out::", error);
    }
  };

  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/blogs/?page=${page}`);
      if (res?.data?.success) {
        setBlogs(res.data.allBlogs);
        setAuthorBlogs(res.data.blogsAddedByYou);
        setLoading(false);
        setTotalPage(res?.data?.totalPages)
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch all blogs");
      console.log("Failed to fetch all blogs::", error);
    }
  };

  
  useEffect(() => {
    getAllBlogs();
  }, [page]);

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        openProfile,
        setOpenProfile,
        searchQuery,
        setSearchQuery,
        user,
        setUser,
        router,
        handleLogout,
        getCurrentUser,
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        image,
        setImage,
        blogs,
        loading,
        setLoading,
        authorBlogs,
        getAllBlogs,
        editId,
        setEditId,
        page,
        setPage,
        totalPage, setTotalPage
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => useContext(BlogContext);
