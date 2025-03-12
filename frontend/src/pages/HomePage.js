import React, { useState, useEffect } from "react";
import useBlogStore from "../stores/blogStore";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";
import useLoadingStore from "../stores/loadingStore";

const HomePage = () => {
  const { blogs, totalPages, page, fetchBlogs, searchQuery, setSearchQuery } =
    useBlogStore();
  const { isLoading, startLoading, stopLoading } = useLoadingStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const defaultFetchBlogsLimit =
    process.env.REACT_APP_DEFAULT_FETCH_BLOGS_LIMIT;

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        startLoading();
        await fetchBlogs(page, defaultFetchBlogsLimit, searchQuery);
      } catch (error) {
        console.error("fetch blogs error:", error);
      } finally {
        stopLoading();
      }
    };

    loadBlogs();
  }, [page, searchQuery, fetchBlogs]);

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handlePageChange = (newPage) => {
    fetchBlogs(newPage);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearchQuery);
    fetchBlogs(1, defaultFetchBlogsLimit, localSearchQuery); // Fetch blogs with the new search query
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");
    setSearchQuery("");
    fetchBlogs(page, defaultFetchBlogsLimit, "");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Blogs</h1>
      <form onSubmit={handleSearchSubmit} className="mb-6">
        <div className="flex relative">
          <input
            type="text"
            placeholder="Search blogs..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
          >
            Search
          </button>
          {localSearchQuery !== "" && (
            <div
              className="cursor-pointer absolute right-[100px] top-[9px] text-gray-500"
              onClick={handleClearSearch}
            >
              Clear X
            </div>
          )}
        </div>
      </form>
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
