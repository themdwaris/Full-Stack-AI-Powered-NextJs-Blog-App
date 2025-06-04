import React from 'react';

const BlogLoader = () => {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-4 h-4 rounded-full bg-slate-200 animate-bounce [animation-delay:.7s]" />
      <div className="w-4 h-4 rounded-full bg-slate-200 animate-bounce [animation-delay:.3s]" />
      <div className="w-4 h-4 rounded-full bg-slate-200 animate-bounce [animation-delay:.7s]" />
    </div>
  );
}

export default BlogLoader;
