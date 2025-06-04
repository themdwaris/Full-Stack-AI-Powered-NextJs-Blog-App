import Link from "next/link";
import React from "react";

const BlogCard = ({ blog }) => {
  const { _id, image, title, category, description, createdAt } = blog;

  const date = new Date(createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const readableDate = date.toLocaleDateString("en-US", options);
  return (
    <Link href={`/blogs/${_id}`}>
      <div className="w-full bg-white/10 text-slate-200 border border-gray-700 overflow-hidden hover:shadow-[-7px_7px_0px_#E2E8F0]">
        <div className="w-full md:w-[280px] h-44">
          {image && (
            <img
              src={image}
              alt="blog-image"
              className="w-full h-full object-cover transition-all hover:scale-110"
            />
          )}
        </div>
        <div className="p-3 my-2 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="w-fit px-1.5 py-1 mb-2 rounded-3xl font-semibold bg-slate-200 text-black text-xs">
              {category}
            </span>
            <span className="text-xs text-gray-400 font-semibold">
              {readableDate}
            </span>
          </div>
          <p
            className={`text-base font-semibold max-h-20 ${
              title?.length > 53 && "text-ellipsis truncate"
            }`}
          >
            {title}
          </p>
          <p
            className={`text-sm text-gray-300 ${
              description?.length > 70 && "text-ellipsis truncate"
            }`}
            dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
          ></p>
          <button className="px-3 text-sm font-semibold py-2 rounded-3xl bg-slate-200 text-black mt-4 hover:bg-slate-100">
            Read more
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
