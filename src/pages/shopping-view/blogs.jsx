import Loading from "@/components/ui/loader";
import { useBlogs } from "@/hooks/useBlogs";
import { ArrowRight, Calendar } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { isLoading, handleGetBlogs } = useBlogs();
  const { blogList } = useSelector((state) => state.Blogs);

  useEffect(() => {
    handleGetBlogs();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between w-full mb-12">
        <h1 className="text-2xl mx-6 font-semibold text-gray-900">All Blogs</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loading className="w-8 h-8 animate-spin text-gray-500" />
        </div>
      ) : !blogList || blogList.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No blogs added</p>
      ) : (
        <>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogList?.map((post) => (
                <article
                  key={post?._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
                >
                  <Link to={`/shop/blogs/${post?._id}`}>
                    <div className="relative overflow-hidden">
                      <img
                        src={post?.images?.[0]}
                        alt={post?.heading}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(post?.createdAt)}
                    </div>

                    <Link to={`/shop/blogs/${post?._id}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {post?.heading}
                      </h2>
                    </Link>

                    <p className="text-gray-800 text-sm font-semibold mb-4 line-clamp-3">
                      {post?.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post?.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {post?.tags?.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-end border-t border-gray-100">
                      <Link to={`/shop/blogs/${post?._id}`}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 group/btn"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Load More Articles
              </button>
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Blogs;