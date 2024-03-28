/* eslint-disable react/prop-types */
import  { useState } from 'react';
import data from "./pricing/Pricing.json";

const Pricing = () => {
  return (
    <div className="flex flex-wrap justify-center items-center text-black h-screen bg-gray-100">
      {data.map((item, index) => (
        <PricingCard key={index} item={item} />
      ))}
    </div>
  );
};

const PricingCard = ({ item }) => {
  const [showMonthlyPrice, setShowMonthlyPrice] = useState(true); // Başlangıçta aylık ücreti göster

  return (
    <div className="w-full md:w-1/2 lg:w-1/4 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 py-8">
        <h2 className="text-2xl bg-slate-200 p-2 font-bold mb-4 text-center">{item.name}</h2>
        <div className="text-lg font-semibold mb-4">
          <span className="text-base text-gray-400">{showMonthlyPrice ? 'Aylık ücret' : 'Yıllık ücret'}</span>
          <p>{showMonthlyPrice ? item.price1 : item.price2} TL</p>
          <button className="text-sm text-gray-600 underline mt-2" onClick={() => setShowMonthlyPrice(!showMonthlyPrice)}>
            {showMonthlyPrice ? 'Yıllık ücrete geç' : 'Aylık ücrete geç'}
          </button>
        </div>
        <div className="w-full border-b mb-2"></div>
        <div className="text-lg font-semibold mb-4">
          <span className="text-base text-gray-400">Görüntü ve ses kalitesi</span>
          <p>{item.content1} </p>
        </div>
        <div className="w-full border-b mb-2"></div>

        <div className="text-lg font-semibold mb-4">
          <span className="text-base text-gray-400">Çözünürlük</span>
          <p>{item.content2}</p>
        </div>
        <div className="w-full border-b mb-2"></div>

        <div className="text-lg font-semibold mb-4">
          <span className="text-base text-gray-400">Destekleyen cihazlar</span>

          <p> {item.content3}</p>
        </div>
        <div className="w-full border-b mb-2"></div>

        <div className="text-lg font-semibold mb-4">
          <span className="text-base text-gray-400">
            Evinizde aynı anda izleyebileceğiniz cihaz sayısı
          </span>
          <p>{item.content4}</p>
        </div>
        <div className="w-full border-b mb-2"></div>

        <div className="text-lg font-semibold mb-4">
          <span className="text-base text-gray-400">
            Video indirebilir cihaz sayısı
          </span>
          <p>{item.content5}</p>
        </div>
        <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out">
          Hemen Üye Ol
        </button>
      </div>
    </div>
  );
};

export default Pricing;
