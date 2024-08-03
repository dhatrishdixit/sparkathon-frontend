import React from 'react';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  link: string;
}

export const Card: React.FC<CardProps> = ({ imageUrl, title, description, link }) => {
  return (
    <div className="w-48 border border-black rounded-lg overflow-hidden shadow-md mb-4">
      <a href={link}>
        <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={title} />
      </a>
      <div className="p-3">
        <a href={link}>
          <h5 className="text-lg font-semibold mb-1 text-center">
            {title}
          </h5>
        </a>
        <p className="text-xs text-black mb-3">
          {description}
        </p>
        <div className="text-center">
          <a
            href={link}
            className="inline-block"
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-1 px-3 rounded">
              Buy Now
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};