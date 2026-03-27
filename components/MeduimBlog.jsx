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
    <div className="relative w-full px-4 py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <FaMedium className="text-4xl text-slate-800 dark:text-cyan-400" />
            <h2 className="font-display text-3xl font-bold text-slate-900 md:text-4xl dark:text-white">
              My Blog Posts
            </h2>
          </div>
          <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400">
            Sharing insights and experiences about web development, programming, and technology.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.link}
              className="glass-panel flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-glow"
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
                <h3 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="mb-4 flex-grow text-slate-600 dark:text-slate-400">
                  {post.excerpt}
                </p>

                {/* Post Meta */}
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
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
                  className="mt-4 inline-flex items-center gap-2 font-semibold text-cyan-600 transition-colors hover:text-violet-600 dark:text-cyan-400 dark:hover:text-violet-300"
                >
                  Read More 
                  <FaArrowRight className="text-sm" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Follow on Medium Button */}
        <div className="mt-12 text-center">
          <a
            href="https://medium.com/@aslandjc7"
            target="_blank"
            rel="noopener noreferrer"
            className="unstyled inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:brightness-110 dark:from-white dark:via-slate-100 dark:to-white dark:text-slate-900"
          >
            <FaMedium className="text-2xl" />
            Follow Me on Medium
          </a>
        </div>

        {/* Newsletter Signup */}
        <div className="glass-panel mt-16 p-8 text-center ring-1 ring-cyan-500/15">
          <h3 className="mb-4 font-display text-2xl font-bold text-slate-900 dark:text-white">
            Subscribe to My Blog
          </h3>
          <p className="mb-6 text-slate-600 dark:text-slate-400">
            Get notified when I publish new articles and content.
          </p>
          <div className="flex max-w-md mx-auto gap-4 md:flex-row flex-col">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-slate-200/90 bg-white/90 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 dark:border-white/10 dark:bg-slate-900/70 dark:text-white"
            />
            <button
              type="button"
              className="unstyled rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-md transition hover:brightness-110"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumBlog;