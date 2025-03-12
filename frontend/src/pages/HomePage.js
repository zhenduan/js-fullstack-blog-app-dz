import React, { useState, useEffect } from "react";
import useBlogStore from "../stores/blogStore";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import useLoadingStore from "../stores/loadingStore";

const HomePage = () => {
  const { blogs, totalPages, page, fetchBlogs } = useBlogStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();

  useEffect(() => {
    try {
      startLoading();
      fetchBlogs(page);
      stopLoading();
    } catch (error) {
      console.error("fetch blogs error:", error);
    }
  }, [page, fetchBlogs]);

  const handlePageChange = (newPage) => {
    fetchBlogs(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
