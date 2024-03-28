import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import YouTube from "react-youtube";

const Detail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const youtubeRef = useRef(null);

  const key = import.meta.env.VITE_TMBD_KEY;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: key, 
            append_to_response: "videos"
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, key]);

  const playTrailer = () => {
    setShowTrailer(true);
  };

  const closeTrailer = () => {
    setShowTrailer(false);
  };

  const handleOutsideClick = (e) => {
    if (youtubeRef.current && !youtubeRef.current.contains(e.target)) {
      closeTrailer();
    }
  };

  useEffect(() => {
    if (showTrailer) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showTrailer]);

  if (!movie) {
    return <div className="flex justify-center items-center w-full min-h-screen">Loading...</div>;
  }

  const fragmanID = movie.videos?.results[0]?.key;

  // Mobil cihazlarda farklı boyutlar belirlemek için bir fonksiyon
  const getYoutubeOpts = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 767) { 
      return { width: '350px', height: '350px' }; 
    } else if (windowWidth <= 1024) { 
      return { width: '650px', height: '500px' }; 
    } else {
      return { width: '1000px', height: '600px' }; 
    }
  }

  return (
    <div className="relative container mx-auto p-5 sm:p-10 flex flex-col lg:flex-row justify-center items-center bg-cover bg-center min-h-[100vh] " style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
      <div className="bg-black bg-opacity-60 rounded-lg p-5 lg:mr-5 mb-5 lg:mb-0 lg:w-1/2 sm:absolute lg:right-4 lg:bottom-32 mt-[100%]">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg mb-4">{movie.overview}</p>
        <p className="font-bold">Çıkış Tarihi:</p>
        <p>{movie.release_date}</p>
        <p className="font-bold">Rating:</p>
        <p>{movie.vote_average.toFixed(1)}</p>
        <p className="font-bold">Orjinal dil:</p>
        <p>{movie.original_language}</p>
        <div className="flex items-center justify-center lg:justify-end">
          <span className="mr-2 text-lg font-bold">Fragmanı izle:</span>
          <FaPlayCircle size={35} className="cursor-pointer" onClick={playTrailer}/>
        </div>
      </div>
      {showTrailer && (
        <>
          <div 
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 z-40" 
            onClick={closeTrailer} 
          />
          <div 
            ref={youtubeRef} 
            className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <YouTube videoId={fragmanID} className="z-10" opts={getYoutubeOpts()} />
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
