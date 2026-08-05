import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
useParams;
const Post = () => {
  const { id } = useParams();
  console.log(id);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      const data = await res.json();
      setPosts(data);
    };
    fetchApi();
  }, []);
  const findPost = posts.find((a) => {
    return a.id == id;
  });
  // {console.log(posts)}
  {
    console.log(findPost);
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
          {/* Back Button */}
          <Link
            to={"/"}
            className="mb-6  w-25 flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
          >
            ← Back
          </Link>

          {/* User ID Badge */}
          <div className="mb-4">
            <span className="inline-block bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-1 rounded-full">
              User ID: {findPost?.userId}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {findPost?.title}
          </h1>

          {/* Divider */}
          <div className="border-b border-gray-200 mb-6"></div>

          {/* Body */}
          <p className="text-gray-700 text-lg leading-8">{findPost?.body}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
