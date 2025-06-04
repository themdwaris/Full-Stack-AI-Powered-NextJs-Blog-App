"use client";

import { useBlogContext } from "@/context/BlogContext";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { BiSolidTrash } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import toast from "react-hot-toast";
import axios from "axios";
import BlogLoader from "@/components/BlogLoader";
import LikeButton from "@/components/LikeButton";
import { MdCalendarMonth } from "react-icons/md";
import BlogCard from "@/components/BlogCard";

const BlogDetails = () => {
  const { blogs, router, user } = useBlogContext();
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [comments, setAllComments] = useState([]);
  const [commentId, setCommentId] = useState("");
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const [loading, setLoading] = useState(false);

  const getCurrentBlog = () => {
    const currentBlog = blogs?.find((b) => b?._id === id);
    if (currentBlog) {
      setData(currentBlog);
    }
  };
  const getRelatedBlogs = () => {
    if (!blogs || blogs.length === 0) return;
    const rltBlogs = blogs?.filter((blog) => blog?.category === data?.category);

    if (rltBlogs) {
      setRelatedBlogs(rltBlogs);
    }
  };

  const getAllComments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/comment?blogId=${id}`);
      if (res?.data?.success) {
        setAllComments(res.data.comments);
        setLoading(false);
      } else {
        toast.error(res?.data?.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to fetch comments::", error);
    }
  };
  // console.log();

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (commentId) {
      try {
        const res = await axios.put("/api/comment", {
          commentId,
          text: comment,
        });
        if (res?.data?.success) {
          toast.success(res.data.message);
          getAllComments();
          setCommentId("");
          setComment("");
          return;
        }
      } catch (error) {
        console.log("Failed to update comment::", error);
      }
    } else {
      try {
        if (!user) {
          router.push("/login");
          toast.error("Login to add comment");
          return;
        }

        const res = await axios.post("/api/comment", { comment, blogId: id });
        if (res?.data?.success) {
          toast.success(res.data.message);
          setComment("");
          getAllComments();
          return;
        } else {
          toast.error(res?.data?.message);
        }
      } catch (error) {
        toast.error(error?.message || error);
        log("Failed to add comment::", error);
      }
    }
  };

  // console.log(commentId);
  const deleteComment = async (commentId) => {
    try {
      const res = await axios.delete("/api/comment", { data: { commentId } });
      if (res?.data?.success) {
        toast.success(res.data.message);
        getAllComments();
        return;
      } else {
        toast.error(res.data?.message);
      }
    } catch (error) {
      console.log("Failed to delete comment::", error);
    }
  };

  const date = new Date(data?.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const readableDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    getCurrentBlog();
    getAllComments();
  }, [blogs, id]);

  useEffect(() => {
    if (blogs && blogs.length > 0 && data?.category) {
      getRelatedBlogs();
    }
  }, [blogs, id, data?.category]);


  return (
    <div className="w-full min-h-screen">
      <div className="w-full bg-white/10">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 py-24 px-5">
          <h1 className=" text-center text-3xl md:text-4xl font-semibold bg-gradient-to-r from-slate-200 to-slate-300 inline-block text-transparent bg-clip-text">
            {data?.title}
          </h1>
          <div className="flex flex-col items-center">
            <span className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-900 font-bold text-2xl flex items-center justify-center cursor-pointer transition transform active:scale-90">
              {data?.author?.name[0]}
            </span>

            <p className="text-sm text py-2.5 font-semibold">
              {data?.author?.name}
            </p>
          </div>
          {readableDate && (
            <p className="flex items-center self-start md:-ml-6 text-sm font-semibold text-gray-400">
              <span className="text-gray-400 mr-2">
                <MdCalendarMonth size={20} />
              </span>
              {readableDate}
            </p>
          )}
        </div>
      </div>
      <div className="w-full max-w-2xl mx-auto shadow-[-7px_-7px_0px_#000000] -mt-[80px]">
        {data?.image && (
          <img
            src={data.image}
            alt="blog-feature-image"
            className="w-full object-contain"
          />
        )}
      </div>
      <div className="px-5 w-full max-w-6xl mx-auto my-16">
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        ></div>
        {/* <div className="blog-content">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <h1 >Introduction:</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <h2 >
            1914 translation by H. Rackham
          </h2>
          <p>
            "But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because it is
            pleasure, but because those who do not know how to pursue pleasure
            rationally encounter consequences that are extremely painfu
          </p>
          <h2>1914 translation by H. Rackham</h2>
          <p>
            "But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects,
          </p>
          <h2 >
            1914 translation by H. Rackham
          </h2>
          <p >
            "But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system,
          </p>

          <h2 >Conclusion</h2>
          <p >
            "But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the great
            explorer of the truth, the master-builder of human happiness. No one
            rejects,
          </p>
        </div> */}

        <div className="my-16">
          <h1 className="text-2xl font-bold mb-5">Related Blogs</h1>
          <div className="mt-12 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-x-5 gap-y-8">
            {relatedBlogs?.slice(0, 4).map((blog) => (
              <BlogCard key={blog?._id} blog={blog} />
            ))}
          </div>
        </div>

        {/* *********Comment UI******* */}

        <div className="w-full mt-16 mb-10">
          <h1 className="text-xl font-semibold my-5">Leave a comment!</h1>
          <form
            onSubmit={handleAddComment}
            className="max-w-xl mx-auto flex flex-col gap-3.5 justify-center"
          >
            <textarea
              type="text"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment"
              rows={6}
              className="w-full rounded bg-white/10 text-sm text-slate-200 p-3 border-none outline-slate-200"
            />
            <button
              type="submit"
              className="w-full p-3 rounded bg-slate-200 text-black font-semibold cursor-pointer transition transform active:scale-90"
            >
              {commentId ? "Update comment" : "Comment"}
            </button>
          </form>
        </div>
        {/* all comments */}

        {loading && comments?.length === 0 ? (
          <div className="w-full flex items-center justify-center h-[30vh]">
            <BlogLoader />
          </div>
        ) : (
          <div className="my-5">
            {comments &&
              comments?.length > 0 &&
              comments?.map((com) => (
                <div
                  key={com?._id}
                  className="mb-5 flex flex-col justify-center bg-white/10 px-5 py-3 rounded-xl"
                >
                  <div className="flex items-center gap-2.5 ">
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-900 font-bold text-xl flex items-center justify-center cursor-pointer transition transform active:scale-90">
                      {com?.author?.name[0]}
                    </span>
                    <span className="text-sm font-semibold">
                      {com?.author?.email}
                    </span>
                  </div>
                  <p className="pl-10 break-words">{com?.text}</p>
                  <div className="mt-3 flex items-center justify-between">
                    {/* <button
                      className="flex items-center gap-3 cursor-pointer transition transform active:scale-90"
                      onClick={() => {
                        handleLikes(com?._id);
                      }}
                    >
                      {liked ? <BiSolidLike size={25} /> : <BiLike size={25} />}

                      <span className="text-base font-semibold">
                        {likeCount}
                      </span>
                    </button> */}
                    <LikeButton
                      commentId={com?._id}
                      initialCount={com?.likes?.length || 0}
                      initialLiked={com?.likes?.includes(user?._id)}
                    />
                    <div className="flex items-center justify-end gap-3 mt-1.5">
                      <span className="text-gray-300 text-xs font-semibold">
                        {new Date(com?.createdAt).toLocaleDateString()}
                      </span>
                      {user?._id === com?.author?._id && (
                        <div className="flex items-center gap-3 mt-1.5 justify-end">
                          <span
                            className="cursor-pointer transition transform active:scale-90"
                            onClick={() => {
                              setComment(com?.text);
                              setCommentId(com?._id);
                            }}
                          >
                            <TbEdit size={25} />
                          </span>
                          <span
                            className="cursor-pointer transition transform active:scale-90"
                            onClick={() => deleteComment(com?._id)}
                          >
                            <BiSolidTrash size={25} />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        <div className="my-24 ">
          <p className="my-4 text-base font-semibold">
            Share this article on social media
          </p>
          <div className="flex items-center gap-3">
            <span
              className={`cursor-pointer transition transform active:scale-90 hover:text-white/80`}
            >
              <FaLinkedin size={24} />
            </span>
            <span
              className={`cursor-pointer transition transform active:scale-90 hover:text-white/80`}
            >
              <FaGithub size={24} />
            </span>
            <span
              className={`cursor-pointer transition transform active:scale-90 hover:text-white/80`}
            >
              <FaXTwitter size={24} />
            </span>
            <span
              className={`cursor-pointer transition transform active:scale-90 hover:text-white/80`}
            >
              <FaInstagram size={24} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
