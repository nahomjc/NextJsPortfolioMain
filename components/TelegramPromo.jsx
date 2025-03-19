import React from 'react';
import { FaTelegram, FaUsers, FaNewspaper, FaBolt } from 'react-icons/fa';
import Image from 'next/image';

const TelegramPromo = () => {
  return (
    <div className="w-full py-16 bg-gradient-to-br from-[#0088cc] to-[#00a0e6] text-white">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-white/30 shadow-xl">
            <Image
              src="/assets/channel-admin.jpg" // Update this path to your avatar image
              alt="Channel Admin"
              layout="fill"
              objectFit="cover"
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
          <h3 className="text-xl font-semibold">Nahom JC</h3>
          <p className="text-white/80">Channel Admin • Full Stack Developer</p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Rest of your existing component code... */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4">
              <FaTelegram className="text-5xl" />
              <h2 className="text-3xl md:text-4xl font-bold">Join Our Telegram Community</h2>
            </div>
            
            <p className="text-lg opacity-90">
              Stay updated with the latest tech news, coding tips, and exclusive content. 
              Join our growing community of developers and tech enthusiasts!
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-lg transition-colors duration-300">
                <FaUsers className="text-2xl" />
                <span>Active Community</span>
              </div>
              <div className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-lg transition-colors duration-300">
                <FaNewspaper className="text-2xl" />
                <span>Daily Updates</span>
              </div>
              <div className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-lg transition-colors duration-300">
                <FaBolt className="text-2xl" />
                <span>Instant Notifications</span>
              </div>
              <div className="flex items-center gap-3 hover:bg-white/10 p-3 rounded-lg transition-colors duration-300">
                <FaTelegram className="text-2xl" />
                <span>Exclusive Content</span>
              </div>
            </div>

            {/* CTA Button */}
            <a 
              href="https://t.me/kingdom_code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-4 bg-white text-[#0088cc] rounded-full font-bold text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
            >
              Join Now →
            </a>
          </div>

          {/* Right Side - Stats/Preview with enhanced styling */}
          <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4 hover:bg-white/15 transition-colors duration-300">
            <div className="text-center p-4 border-b border-white/20">
              <h3 className="text-2xl font-bold">Channel Statistics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 hover:bg-white/10 rounded-lg transition-colors duration-300">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm opacity-75">Members</div>
              </div>
              <div className="text-center p-4 hover:bg-white/10 rounded-lg transition-colors duration-300">
                <div className="text-3xl font-bold">Daily</div>
                <div className="text-sm opacity-75">Updates</div>
              </div>
              <div className="text-center p-4 hover:bg-white/10 rounded-lg transition-colors duration-300">
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm opacity-75">Posts</div>
              </div>
              <div className="text-center p-4 hover:bg-white/10 rounded-lg transition-colors duration-300">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm opacity-75">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner with enhanced styling */}
        <div className="mt-12 text-center bg-white/10 rounded-xl p-6 hover:bg-white/15 transition-colors duration-300">
          <p className="text-lg">
            🎉 <span className="font-bold">Special Offer:</span> Join now and get access to exclusive resources!
          </p>
        </div>
      </div>
    </div>
  );
};

export default TelegramPromo;