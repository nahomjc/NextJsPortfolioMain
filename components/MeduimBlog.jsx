import React from 'react';
import Image from 'next/image';
import { FaMedium, FaBookmark, FaClock, FaArrowRight } from 'react-icons/fa';

const MediumBlog = () => {
  const blogPosts = [
    {
      title: "💳 Integrating Chapa",
      excerpt: "💳 Integrating Chapa Payment Gateway into a Next.js Project.",
      readTime: "8 min read",
      date: "Jan 15, 2024",
      image: "https://miro.medium.com/v2/resize:fit:640/format:webp/1*ep81vJNBz_bm8R13IfQy2A.png", // Add your blog image
      link: "https://medium.com/@aslandjc7/integrating-chapa-payment-gateway-into-a-next-js-project-8767c278d85f"
    },
    {
      title: "Balancing Code and Faith",
      excerpt: "Balancing Code and Faith: A Guide to Being an Effective Software Engineer and a Good Christian",
      readTime: "10 min read",
      date: "Jan 20, 2024",
      image: "https://miro.medium.com/v2/resize:fit:828/format:webp/1*_KRDj8Ij-cD3sWf3R8QEXQ.png", // Add your blog image
      link: "https://medium.com/@aslandjc7/balancing-code-and-faith-a-guide-to-being-an-effective-software-engineer-and-a-good-christian-df8f8ed370f3"
    },
    {
      title: "Exploring Next.js 15",
      excerpt: "Exploring Next.js 15 with the latest features and improvements.",
      readTime: "6 min read",
      date: "Jan 25, 2024",
      image: "https://miro.medium.com/v2/resize:fit:828/format:webp/1*dmp37aGPKTXSSEJcYjemKA.png", // Add your blog image
      link: "https://medium.com/@aslandjc7/exploring-next-js-15-the-latest-features-and-enhancements-e71235f40179"
    }
  ];

  return (
    <div className="w-full py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaMedium className="text-4xl text-black dark:text-white" />
            <h2 className="text-3xl md:text-4xl font-bold">My Blog Posts</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sharing insights and experiences about web development, programming, and technology.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Post Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Post Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {post.excerpt}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{post.readTime}</span>
                  </div>
                  <span>{post.date}</span>
                </div>

                {/* Read More Link */}
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[#0088cc] hover:text-[#006699] dark:text-[#00a0e6] dark:hover:text-[#0088cc] font-semibold transition-colors duration-300"
                >
                  Read More 
                  <FaArrowRight className="text-sm" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Follow on Medium Button */}
        <div className="text-center mt-12">
          <a
            href="https://medium.com/@aslandjc7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FaMedium className="text-2xl" />
            Follow Me on Medium
          </a>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 dark:text-white">
            Subscribe to My Blog
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get notified when I publish new articles and content.
          </p>
          <div className="flex max-w-md mx-auto gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#0088cc]"
            />
            <button className="px-6 py-3 bg-[#0088cc] text-white rounded-lg hover:bg-[#006699] transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumBlog;