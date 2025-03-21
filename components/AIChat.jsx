import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I am Nahoms AI assistant. I can tell you about his experience, skills, and projects. What would you like to know?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBoxRef = useRef(null);

  // Enhanced knowledge base
  const knowledge = {
    quickLinks: {
        github: "https://github.com/nahomjc",  // Replace with your actual GitHub URL
        linkedin: "https://www.linkedin.com/in/nahom-jc-35b97420b/", // Replace with your actual LinkedIn URL
        portfolio: "https://nahom-portfolio.vercel.app/" // Replace with your actual portfolio URL
      },
    experience: [
      "Full Stack Web Engineer with expertise in Next.js, React, and Node.js",
      "At Muyalogy: Developed full-stack features using Next.js, created Telegram bot, implemented UI with TailwindCSS and Mantine, integrated Supabase for backend",
      "At Jiret LMS: Built learning management system using Next.js, Drizzle ORM, PostgreSQL, and Supabase",
      "At Afriwork Learn: Developed job readiness platform using Next.js and Supabase",
      "Currently working on Loop, a crowdfunded real estate app using Next.js, Supabase, Clerk, deployed on Vercel",
      "Developed e-wallet system at Bazra using React.js and Spring Boot",
      "Created and teaching web development basics course on Muyalogy platform"
    ],
    education: [
      "Bachelor's Degree in Computer Science from Admas University with 3.9 GPA - Very Great Distinction Award",
      "UN Data Science Certificate",
      "Meta Advanced React Certificate",
      "Multiple certifications in web development",
      "Continuous learning through online platforms"
    ],
    teaching: {
      course: {
        title: "Build Your First Website: A Step-by-Step Guide to Web Development",
        platform: "Muyalogy",
        link: "https://www.muyalogy.com/course/1bcd4432-4f5e-4984-8572-c90648d637bb",
        details: [
          "Comprehensive web development course in Amharic",
          "Covers HTML, CSS, JavaScript fundamentals",
          "Includes responsive design and modern web practices",
          "Project-based learning with practical examples",
          "43 activities across 8 modules"
        ]
      }
    },
    skills: {
      frontend: [
        "React.js & Next.js (Advanced)",
        "TailwindCSS & Mantine UI",
        "Redux & Context API",
        "Responsive Design",
        "TypeScript"
      ],
      backend: [
        "Node.js & Spring Boot",
        "Supabase & Firebase",
        "RESTful APIs",
        "GraphQL",
        "Authentication & Authorization (Clerk)"
      ],
      database: [
        "PostgreSQL",
        "MongoDB",
        "Drizzle ORM",
        "Database Design",
        "Query Optimization"
      ],
      devops: [
        "Vercel Deployment",
        "Git & GitHub",
        "Docker",
        "CI/CD Pipelines",
        "AWS Services"
      ]
    },
    projects: [
      {
        name: "Muyalogy",
        description: "Digital learning platform with course management, student tracking, and integrated Telegram bot",
        tech: ["Next.js", "TailwindCSS", "Mantine UI", "Supabase"],
        link: "https://muyalogy.com"
      },
      {
        name: "Jiret LMS",
        description: "Advanced learning management system with interactive features",
        tech: ["Next.js", "Drizzle ORM", "PostgreSQL", "Supabase"],
        link: "https://jiret.com"
      },
      {
        name: "Afriwork Learn",
        description: "Job readiness platform with skill assessments",
        tech: ["Next.js", "Supabase", "Mantine UI"],
        link: "https://learn.afriworket.com"
      },
      {
        name: "Loop Real Estate",
        description: "Crowdfunded real estate platform",
        tech: ["Next.js", "Supabase", "Clerk", "Vercel"],
        status: "In Development"
      },
      {
        name: "Bazra E-Wallet",
        description: "Digital payment and e-wallet system",
        tech: ["React.js", "Spring Boot"],
        type: "Enterprise Solution"
      }
    ]
  };
  // Suggested questions for quick access
  const suggestedQuestions = [
    "What are your main skills?",
    "Tell me about your projects",
    "What's your work experience?",
    "Educational background?",
    "Technical interests?"
  ];

  const generateResponse = async (input) => {
    const lowercaseInput = input.toLowerCase();
    
    // Simulate typing delay
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    setIsTyping(false);

    if (lowercaseInput.includes('experience') || lowercaseInput.includes('work')) {
      return `Heres Nahoms professional experience:\n\n• ${knowledge.experience.join('\n• ')}`;
    }
    
    if (lowercaseInput.includes('skill') || lowercaseInput.includes('tech')) {
      return `Here are Nahoms technical skills:\n\nFrontend:\n• ${knowledge.skills.frontend.join('\n• ')}\n\nBackend:\n• ${knowledge.skills.backend.join('\n• ')}\n\nDatabase:\n• ${knowledge.skills.database.join('\n• ')}\n\nDevOps:\n• ${knowledge.skills.devops.join('\n• ')}`;
    }
    
    if (lowercaseInput.includes('project') || lowercaseInput.includes('portfolio')) {
      return knowledge.projects.map(project => 
        `${project.name}:\n• ${project.description}\n• Technologies: ${project.tech.join(', ')}\n• Link: ${project.link}\n`
      ).join('\n');
    }

    if (lowercaseInput.includes('education') || lowercaseInput.includes('study')) {
      return `Education Background:\n\n• ${knowledge.education.join('\n• ')}`;
    }

    if (lowercaseInput.includes('interest') || lowercaseInput.includes('passion')) {
      return `Technical Interests:\n\n• ${knowledge.interests.join('\n• ')}`;
    }
    
    if (lowercaseInput.includes('contact') || lowercaseInput.includes('reach')) {
      return `You can reach Nahom through:\n\n• GitHub: ${knowledge.quickLinks.github}\n• LinkedIn: ${knowledge.quickLinks.linkedin}\n• Portfolio: ${knowledge.quickLinks.portfolio}`;
    }
    if (lowercaseInput.includes('experience') || lowercaseInput.includes('work')) {
        return `Here's Nahoms detailed professional experience:\n\n• ${knowledge.experience.join('\n• ')}\n\nTeaching:\n• Currently teaching web development on Muyalogy platform\n• Course Link: ${knowledge.teaching.course.link}`;
      }
      
      if (lowercaseInput.includes('education') || lowercaseInput.includes('study')) {
        return `Education and Certifications:\n\n• ${knowledge.education.join('\n• ')}\n\nNotable Achievement: Graduated with 3.9 GPA and Very Great Distinction Award`;
      }
      
      if (lowercaseInput.includes('course') || lowercaseInput.includes('teach')) {
        return `Web Development Course on Muyalogy:\n\n• Title: ${knowledge.teaching.course.title}\n• ${knowledge.teaching.course.details.join('\n• ')}\n\nCourse Link: ${knowledge.teaching.course.link}`;
      }
    if (lowercaseInput.includes('who') || lowercaseInput.includes('about')) {
      return "Nahom is a Full Stack Web Engineer specializing in modern web technologies. He has extensive experience building educational platforms and enterprise applications. His work focuses on creating scalable, user-friendly solutions that make a real impact.";
    }

    return "I can tell you about Nahoms experience, skills, projects, education, interests, or how to contact him. What would you like to know?";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Generate bot response
    const response = await generateResponse(inputMessage);
    const botResponse = { type: 'bot', content: response };
    setMessages(prev => [...prev, botResponse]);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    handleSubmit({ preventDefault: () => {} });
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <AnimatePresence>
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 bg-[#5651e5] text-white p-4 rounded-full shadow-lg hover:bg-[#4640b3] transition-all duration-300 z-50"
          aria-label="Open chat"
        >
          <FaRobot size={24} />
        </motion.button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="fixed bottom-4 container right-4 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-[#5651e5] text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <FaRobot size={20} />
              <h3 className="font-semibold">Nahoms AI Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-200 transition-colors"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatBoxRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-[#5651e5] text-white'
                      : 'bg-gray-100 dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {message.type === 'user' ? (
                      <FaUser size={12} />
                    ) : (
                      <FaRobot size={12} />
                    )}
                    <span className="text-xs font-medium">
                      {message.type === 'user' ? 'You' : 'AI Assistant'}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center space-x-2 text-gray-500"
              >
                <FaRobot size={12} />
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="p-2 border-t dark:border-gray-700">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full whitespace-nowrap hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Nahoms sexperience..."
                className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:border-[#5651e5] dark:focus:border-[#5651e5]"
              />
              <button
                type="submit"
                className="bg-[#5651e5] text-white p-2 rounded-lg hover:bg-[#4640b3] transition-colors duration-300"
              >
                <FaPaperPlane size={20} />
              </button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="p-2 border-t dark:border-gray-700 flex justify-center space-x-4">
            <a
              href={knowledge?.quickLinks?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#5651e5] dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href={knowledge.quickLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#5651e5] dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChat;