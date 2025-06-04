"use client";
import { useState } from "react";
import axios from "axios";
import { BiLike, BiSolidLike } from "react-icons/bi";
import toast from "react-hot-toast";


const LikeButton = ({ commentId, initialLiked, initialCount }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(initialCount);


  const handleLikes = async () => {
    try {
      const res = await axios.post(`/api/comment/like`, { commentId });
      if (res?.data?.success) {
        setLiked(res.data.liked);
        setLikeCount(res.data.likesCount);
      } else {
        toast.error("You have to first login");
        return;
      }
    } catch (error) {
      console.error("Error liking comment", error);
    }
  };

  return (
    <button
      className="flex items-center gap-3 cursor-pointer transition transform active:scale-90"
      onClick={handleLikes}
    >
      {liked ? <BiSolidLike size={25} /> : <BiLike size={25} />}
      <span className="text-base font-semibold">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
