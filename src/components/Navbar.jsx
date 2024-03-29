import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const key = import.meta.env.VITE_TMBD_KEY;
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [initialResults, setInitialResults] = useState([]);
  const searchRef = useRef(null);

  function onChange(e) {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results.slice(0, 3));
          if (searchTerm === "") {
            setResults(initialResults.slice(0, 3));
          }
        } else {
          setResults([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setResults([]);
      });
  }
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results.slice(0, 3));
          setInitialResults(data.results.slice(0, 3));
        }
      })
      .catch((error) => {
        console.error('Error fetching initial results:', error);
        setResults([]);
        setInitialResults([]);
      });
  }, [key]);

  useEffect(() => {
    // Event listener ekleyerek tıklama dışındaki bir yere tıklandığında arama sonuçlarını kapat
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-black text-white flex justify-between items-center h-20 px-10 relative">
      <div className="flex items-center justify-center gap-5 text-xl font-bold cursor-pointer">
        <Link
          to="/"
          className={`font-semibold md:text-2xl ${
            location.pathname === "/" && "opacity-70"
          } `}
        >
          Movi<span className="text-red-500">DB</span>
        </Link>
        <Link
          to="/movie"
          className={`hidden lg:block ${
            location.pathname === "/movie" && "text-red-300"
          }`}
        >
          Filmler
        </Link>
        <Link
          to="/series"
          className={`hidden lg:block ${
            location.pathname === "/series" && "text-red-300"
          }`}
        >
          Diziler
        </Link>
        <Link
          to="/pricing"
          className={`hidden lg:block ${
            location.pathname === "/pricing" && "text-red-300"
          }`}
        >
          Paketler
        </Link>
      </div>
      <div className="flex items-center">
        <input
          className="hidden md:hidden lg:block w-80 pl-3 p-2 rounded-s-lg tracking-wider outline-none text-black"
          type="text"
          placeholder="Arama Yapınız..."
          onChange={onChange}
          value={query}
          onFocus={() => setResults(results.slice(0, 3))}
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
          <input
            type="text"
            placeholder="Ara.."
            className="w-full outline-none border-none text-black p-2 px-2 mb-20"
          />
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
      
      {/* Arama sonuçlarını göster */}
      {query && (
        <div ref={searchRef} className="flex flex-col gap-2 absolute top-16 right-36 p-2 z-10 w-[25%] bg-blue-100 cursor-pointer rounded-lg">
          {results.map((movie) => (
            <div key={movie.id} className="flex gap-2 items-center bg-white text-black">
              <Link to={`/detail/${movie.id}`}>
                <div className="flex items-center justify-center">
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="h-12 w-auto" />
                  <span className="ml-2">{movie.title}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
