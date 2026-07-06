import React, { useEffect, useState } from "react";
import { Bookmark, Plus, ArrowDown } from "lucide-react";
import axios from "axios";

const Gallary = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch Images
  useEffect(() => {
    const fetchImages = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await axios.get(
          `https://picsum.photos/v2/list?page=${page}&limit=20`
        );

        setImages((prev) => [...prev, ...response.data]);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 300 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <section>
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative mb-4 break-inside-avoid shadow group"
          >
            {/* Image */}
            <img
              className="w-full object-cover"
              src={image.download_url}
              alt={image.author}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {/* Top Icons */}
              <div className="flex justify-end gap-2">
                <div className="bg-white p-2 rounded cursor-pointer">
                  <Bookmark />
                </div>

                <div className="bg-white p-2 rounded cursor-pointer">
                  <Plus />
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between text-white">
                <h1 className="font-bold">{image.author}</h1>

                <div className="bg-white text-black p-2 rounded cursor-pointer">
                  <ArrowDown />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <h2 className="text-center text-xl font-semibold my-5">
          Loading...
        </h2>
      )}
    </section>
  );
};

export default Gallary;