import React from 'react';
import { FaPhone } from 'react-icons/fa';

const StickyPhone = () => {
  return (
    <div className='fixed bottom-4 right-4 z-40'>
      <a
        href='tel:+251937287140'
        className='flex items-center justify-center w-14 h-14 bg-[#5651e5] text-white rounded-full shadow-lg hover:bg-[#4640b3] transition-colors duration-300 group'
        aria-label='Call me'
      >
        <FaPhone size={24} />
        <span className='absolute right-16 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap'>
          Call me: +251 937287140
        </span>
      </a>
    </div>
  );
};

export default StickyPhone; 