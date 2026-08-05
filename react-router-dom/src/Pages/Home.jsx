import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
      //   console.log(res)
      const data = await res.json();
      setPosts(data);
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
            📚 All Posts
          </h1>

          <div className="grid gap-5">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/post/${post.id}`}
                className="group bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl hover:border-orange-500 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  {/* Post ID */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-600 text-white font-bold text-lg">
                    {post.id}
                  </div>

                  {/* Post Content */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-orange-600 transition">
                      {post.title}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Click to read the full post →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
