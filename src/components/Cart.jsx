/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Cart = ({ movie }) => {
    const imageUrl = `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;
    const title = movie.title || movie.name; // title özelliğini kontrol et, eğer yoksa name özelliğini kullan

    return (
        <div className="bg-white bg-opacity-45 rounded-xl shadow-md overflow-hidden relative min-h-[60vh] ">
            <Link to={`/detail/${movie.id}`}>
                <img className="h-[85%] object-cover cursor-pointer hover:scale-105 duration-500" src={imageUrl} alt={title} />
            </Link>
            <div className="p-8 flex items-center justify-center text-center">
                <Link to={`/detail/${movie.id}`}>
                    <div className="uppercase tracking-wide text-base cursor-pointer hover:text-black text-white font-semibold text-center ">{title}</div>
                </Link> 
            </div>
            <span className="absolute text-black bg-white p-1 rounded-full top-2 right-2">{movie.vote_average.toFixed(1)}</span>
        </div>
    );
};

export default Cart;
