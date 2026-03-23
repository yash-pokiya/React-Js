import React, { useEffect, useState } from "react";
import { Bookmark, Plus, ArrowDown } from "lucide-react";
import axios from "axios";

const Gallary = () => {
  // API Fetch
  const [img, setImg] = useState([]);
  const [Page, setPage] = useState(1)
  const [Loading, setLoading] = useState(false)
  useEffect(() => {
      const fetchImages = async() => {
        if (Loading) return;
      try {
          let response = await axios.get(
            `https://picsum.photos/v2/list?page=${Page}&limit=100`
          );
          setImg((prev) => [...prev , ...response.data]);
      } catch (error) {
        console.log(error.message)
      }
      };
      fetchImages()
  },[Page]);
  useEffect(() => {
    const handleScroll = () => {
      console.log(Page)
        if(window.innerHeight + window.screenY  >= document.documentElement.scrollHeight - 300){
            setPage((prev) => {
                return prev+1;
            })
        }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
        window.removeEventListener("scroll", handleScroll);
    }
  },[])
// monday
  return (
    <>
      <section>
        {/* Fetch images from Api  */}
          <div key={img.id} className="columns-1 sm:columns-2 md:columns-3 gap-4 p-4">
        {img.map((img) => {
            return (
                   
          <div className="relative mb-4 break-inside-avoid shadow group ">
            {/* img */}
            <img
              className="w-full object-cover "
              src={img.download_url}
              alt=""
            />
            {/* overlay div */}
            <div className="absolute top-0 bg-black/50 inset-0 flex flex-col  justify-between p-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              {/* top icons */}
              <div className="flex justify-end gap-2">
                <div className="bg-white p-2 rounded">
                  {/* bookMark icon */}
                  <Bookmark />
                </div>
                <div className="bg-white p-2 rounded">
                  {/* plus icon  */}
                  <Plus />
                </div>
              </div>
              {/* bottom icon */}
              <div className="flex items-center justify-between ">
                <h1 className="font-bold">{img.author}</h1>
                <div className="bg-white p-2 rounded">
                  {/* downarrow icon */}
                  <ArrowDown />
                </div>
              </div>
            </div>
          </div>
            )
        })}
        
        </div>
      </section>
    </>
  );
};

export default Gallary;
