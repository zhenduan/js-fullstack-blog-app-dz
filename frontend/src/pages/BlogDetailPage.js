import React from "react";
import { useParams } from "react-router-dom";

const BlogDetailPage = () => {
  const { id } = useParams();
  return <div>BlogDetailPage: {id}</div>;
};

export default BlogDetailPage;
