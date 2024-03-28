import axios from "axios";
import { useEffect, useState } from "react";
import Cart from "./Cart";

const Movies = () => {
  // TMDb API anahtarını alın
  const key = import.meta.env.VITE_TMBD_KEY;
  // TMDb API'nin temel URL'ini belirtin
  const baseUrl = "https://api.themoviedb.org/3/discover/tv";

  // Filmleri depolamak için bir state tanımlayın
  const [movies, setMovies] = useState([]);

  // Filmleri getiren bir fonksiyon tanımlayın
  const fetchMovies = async () => {
    try {
      // Axios ile API'den film verilerini alın
      const response = await axios.get(baseUrl, {
        // API anahtarını parametre olarak gönderin
        params: {
          api_key: key,
        },
      });
      // Alınan veriyi state'e kaydedin
      setMovies(response.data.results);
    } catch (error) {
      // Hata durumunda konsola bir hata mesajı yazdırın
      console.error("Filmler alınırken bir hata oluştu:", error);
    }
  };

  // Sayfa yüklendiğinde filmleri getirme işlemini başlatın
  useEffect(() => {
    fetchMovies();
  });

  return (
    <div>
      {/* Her bir film için Cart bileşenini oluşturun */}
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-5 w-full h-full px-[10%] py-[3%]">
        {movies.map((movie, index) => (
          <Cart key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
