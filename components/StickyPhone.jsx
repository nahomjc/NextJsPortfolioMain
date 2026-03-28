import React from 'react';
import { FaPhone } from 'react-icons/fa';

const StickyPhone = () => {
  return (
    <div className="fixed bottom-2.5 right-4 z-40 sm:bottom-3 sm:right-6">
      <a
        href="tel:+251937287140"
        className="group flex h-9 w-9 items-center justify-center rounded-full bg-[#5651e5] text-white shadow-lg transition-colors duration-300 hover:bg-[#4640b3] sm:h-10 sm:w-10"
        aria-label="Call me"
      >
        <FaPhone className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]" />
        <span className="absolute right-12 whitespace-nowrap rounded-lg bg-white px-3 py-2 text-sm text-gray-800 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 sm:right-14 sm:px-4">
          Call me: +251 937287140
        </span>
      </a>
    </div>
  );
};

export default StickyPhone; 