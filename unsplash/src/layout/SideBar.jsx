import {
  Bookmark,
  Compass,
  Download,
  Files,
  Image,
  Languages,
  Menu,
  PenTool,
  User2,
} from "lucide-react";
import React from "react";

const SideBar = () => {
  return (
    <>
      <div className="px-2 flex flex-col items-center justify-between h-screen py-2 fixed ms-2 border-r pe-4 border-r-gray-300">
        <div className="flex flex-col items-center justify-center gap-y-2 text-gray-600 ">
          <div className="border-b-2 border-gray-300 pb-6 flex-col flex items-center justify-center gap-y-4">
            <img
              src="https://www.svgrepo.com/show/315538/unsplash.svg"
              alt="logo"
              className="w-8 h-8 hover:text-black hover:font-bold"
            />
            <Image className="bg-gray-200 rounded-md p-1.5 w-8 h-8 text-black font-bold" />
            <PenTool className="hover:bg-gray-200 rounded-md p-1.5 w-8 h-8 hover:text-black hover:font-bold" />
          </div>

          <div className="border-b-2 border-gray-300 flex-col flex items-center justify-center gap-y-4 py-6">
            <Compass className="hover:bg-gray-200 rounded-md p-1.5 w-8 h-8 hover:text-black hover:font-bold" />
            <Files className="hover:bg-gray-200 rounded-md p-1.5 w-8 h-8 hover:text-black hover:font-bold" />
            <Download className="hover:bg-gray-200 rounded-md p-1.5 w-8 h-8 hover:text-black hover:font-bold" />
          </div>

          <Bookmark className="hover:bg-gray-200 rounded-md p-1.5 w-8 h-8 hover:text-black hover:font-bold" />
        </div>

        <div className="flex flex-col items-center justify-center gap-y-6">
          <User2 className="hover:bg-gray-200 rounded-md p-1.5 w-8 h-8 hover:text-black hover:font-bold" />
          <Languages className="hover:bg-gray-200 rounded-md p-1.5 w-8 h-8 hover:text-black hover:font-bold" />
          <Menu className="hover:bg-gray-200 rounded-md p-1.5 w-8 h-8 hover:text-black hover:font-bold" />
        </div>
      </div>
    </>
  );
};

export default SideBar;
 