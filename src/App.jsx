import React, { useEffect, useState } from 'react';
import axios from 'axios'; 

const App = () => {

  const ImageCard = ({ elem }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className="block mb-4 break-inside-avoid-column relative group rounded-lg overflow-hidden bg-gray-800"
     
      style={{
        paddingBottom: `${(elem.height / elem.width) * 100}%`,
      }}
    >

      {!isImageLoaded && (
        <div className="shimmer-bg absolute inset-0"></div>
      )}


      <img
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-2000 ease
          ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        src={elem.download_url}
        alt={`Photo by ${elem.author}`}
        loading="lazy"
      
        onLoad={() => setIsImageLoaded(true)}
      />

 
      {isImageLoaded && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
         
          <div>
            <a
              href={elem.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-white/80 hover:text-white underline"
            >
              View Page
            </a>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-white text-sm font-medium truncate">
              {elem.author}
            </p>

  
            <a
              href={elem.download_url}
              download
              onClick={(e) => e.stopPropagation()} 
              className="w-8 h-8 bg-white/90 rounded-md flex items-center justify-center text-black/70 hover:bg-white transition-colors"
              title="Download photo"
            >
          
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};


  const [imgData, setImgData] = useState([]);
  const [index, setIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true); 

  const getImage = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${index}&limit=80`
      );
      setImgData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
     
    }
    setIsLoading(false); 
  };

  useEffect(() => {
    getImage();
  }, [index]);

  let printImageData = null;

  if (imgData.length > 0) {
    printImageData = imgData.map((elem) => (
      <ImageCard key={elem.id} elem={elem} />
    ));
  }

  return (
     <div className="flex flex-col min-h-screen bg-black text-white font-sans">
     
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }

          .shimmer-bg {
            animation: shimmer 3s infinite ease;
            background: linear-gradient(to right, rgb(31 41 55) 8%, rgb(55 65 81) 18%, rgb(31 41 55) 33%);
            background-size: 2000px 100%;
          }
        `}
      </style>

   
      <header className="shrink-0 flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">Gallery</h1>
        <span className="text-sm text-gray-500">Created by: Krishna Sharma</span>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 relative">
       
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-gray-400 text-lg animate-pulse">
              Loading images...
            </h3>
          </div>
        )}

        {!isLoading && imgData.length > 0 && (
          <div className="columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
            {printImageData}
          </div>
        )}

        {!isLoading && imgData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-gray-400 text-lg">No images found.</h3>
          </div>
        )}
      </main>

 
      <footer className="shrink-0 flex items-center justify-center gap-4 sm:gap-6 py-4 border-t border-gray-800">
        <button
          disabled={index === 1} 
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => {
            if (index > 1) {
              setIndex(index - 1);
            }
          }}
        >
          ⬅️ Previous
        </button>

     
        <h3 className="font-medium text-gray-300 w-20 text-center">
          Page {index}
        </h3>

        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-5 rounded-lg transition-all duration-300 active:scale-95"
          onClick={() => {
            setIndex(index + 1);
          }}
        >
          Next ➡️
        </button>
      </footer>
    </div>
  );
  

};
  

export default App
