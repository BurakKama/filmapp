import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full bg-black text-white flex justify-between items-center h-20 px-10">
      <div className="flex items-center justify-center gap-5 text-xl font-bold cursor-pointer">
        <Link to="/series">
          <div className="font-semibold md:text-2xl">
            Movi<span className="text-red-500">DB</span>
          </div>
        </Link>
        <Link to="/movie">
          <span className="hidden lg:block">Filmler</span>
        </Link>
        <Link to="/series">
          <span className="hidden lg:block">Diziler</span>
        </Link>
        <Link to="/pricing">
          <span className="hidden lg:block">Paketler</span>
        </Link>
      </div>
      <div className="flex items-center">
        <input
          className="hidden md:hidden lg:block w-80 pl-3 p-2 rounded-s-lg tracking-wider outline-none text-black"
          type="text"
          placeholder="Arama Yapınız..."
        />
        <button className="hidden md:hidden p-2 lg:block rounded-r-lg w-16 bg-gray-300 text-black font-bold text-md">
          ARA
        </button>
        <button className="hidden md:hidden lg:block ml-10 text-xl bg-red-600 text-white rounded-md p-1 hover:bg-opacity-80">
          Oturum Aç
        </button>
        <FaBars
          size={25}
          className="block md:block lg:hidden cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 bottom-0 text-2xl bg-black text-white w-64 py-10 px-5 flex flex-col justify-center items-center z-10">
              <input type="text" placeholder="Ara.." className="w-full outline-none border-none text-black p-2 px-2 mb-20"/>
          <Link to="/movie" className="my-4">
            Filmler
          </Link>
          <Link to="/series" className="my-4">
            Diziler
          </Link>
          <Link to="/pricing" className="my-4">
            Paketler
          </Link>
          <FaTimes
            size={25}
            className="absolute top-5 right-5 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
