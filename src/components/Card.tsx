import React from 'react';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({ imageUrl, title, description }) => {
  return (
    <div className="w-48 border border-gray-700 rounded-lg overflow-hidden shadow-md mb-4 bg-gray-800">
      <a onClick={(e)=>e.preventDefault()}>
        <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={title} />
      </a>
      <div className="p-3">
        <a onClick={(e)=>e.preventDefault()}>
          <h5 className="text-lg font-semibold mb-1 text-center text-white">
            {title}
          </h5>
        </a>
        <p className="text-xs text-gray-300 mb-3">
          {description}
        </p>
        <div className="text-center">
          <a
            onClick={(e)=>e.preventDefault()}
            className="inline-block"
          >
            <button className="bg-white hover:bg-gray-200 text-black text-sm font-medium py-1 px-3 rounded">
              Buy Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};