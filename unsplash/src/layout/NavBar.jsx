import { Focus, Search } from "lucide-react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
    {/* Part-1 */}
      <div className="flex px-6 justify-between items-center">
        <div className="bg-gray-200 px-3 py-1.5 flex items-center justify-between gap-x-2 rounded-full w-[75%]">
          <Search className="w-5 h-5 text-gray-600" strokeWidth={2.5} />
          <input
            type="text"
            placeholder="Search photos and illustrations"
            className="w-full focus:outline-none"
          />
          <Focus className="w-5 h-5 text-gray-600" strokeWidth={2.5} />
        </div>

        <div className="flex justify-between items-center w-[25%] text-sm px-6">
          <h1 className="font-bold">Get Unplash+</h1>
          <p className="text-gray-600 font-medium" ><Link to="/login">Log in</Link></p>
          <button className="border border-gray-500 p-1.5 rounded-lg text-gray-700 font-medium shadow-2xl">
            Submit an image
          </button>
        </div>
      </div>

  {/* Part-2 */}
      <nav className="border-b border-gray-400 w-full">
        <ul className="list-none flex items-center justify-between w-[70%] my-4 px-6 text-sm text-gray-400 font-medium">
          <li className="text-black">Featured</li>
          <li>Spring</li>
          <li>Wallpapers</li>
          <li>3D Renders</li>
          <li>Nature</li>
          <li>Textures</li>
          <li>Film</li>
          <li>Architecure</li>
          <li>Street Photograpahy</li>
          <li>Experimental</li>
          <li>Travel</li>
          <li>People</li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
 