import { Heart, Menu, Search, ShoppingBag, User2, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [ShowMenu, setShowMenu] = useState(false);
  return (
    <>
      <section>
        {/* desktop navber */}
        <nav className="bg-white px-8  h-auto py-4 w-full hidden md:flex justify-between items-center ">
          {/* logo */}
          <div className="flex justify-center items-center gap-x-2">
            <img
              src="/logo.png"
              className="w-20 object-cover"
              alt="Logo"
            />
            <h1 className="font-bold text-2xl">Shopping</h1>
          </div>
          {/* links */}
          <ul className="flex items-center justify-center gap-x-4 text-lg font-normal ">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/collection">Collection</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
          {/* icons */}
          <div className="flex items-center justify-center gap-x-6">
            <Search strokeWidth={1} />
            <Heart strokeWidth={1} />
            <ShoppingBag strokeWidth={1} />
            <User2 strokeWidth={1} />
          </div>
        </nav>
        {/* mobile navber */}
        <nav className="bg-white px-8  py-4 w-full md:hidden flex justify-between items-center ">
          {/* logo */}
          <div className="flex justify-center items-center gap-x-2">
            <img
              src="/logo.png"
              className="w-20 object-cover"
              alt="Logo"
            />
            <h1 className="font-bold text-2xl">Shopping</h1>
          </div>
          {/* icons */}
          <div className="flex items-center justify-center gap-x-6">
            <Heart strokeWidth={1} />
            <ShoppingBag strokeWidth={1} />
            <User2 strokeWidth={1} />
            <Menu
              strokeWidth={1}
              className="active:scale-95 active:text-amber-600"
              onClick={() => {
                setShowMenu(true);
              }}
            />
          </div>
        </nav>

        {/* sidebar and panel */}
        {ShowMenu && (
          <section className="relative md:hidden flex justify-end ">
            <div className="w-[70%] bg-white/25 z-200 backdrop-blur-sm h-screen fixed top-0 flex items-center justify-center shadow-xl right-0">
              <div className="absolute top-2 right-4">
                <X strokeWidth={3} 
                onClick={() => {
                  setShowMenu(false) 
                }} />
              
              </div>
              {/* links */}
              <ul className="flex flex-col items-center justify-center gap-y-14 text-3xl font-semibold ">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/collection">Collection</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default Navbar;
