import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCode, FaAward } from 'react-icons/fa';

const experiences = [
  {
    id: 1,
    type: 'work',
    title: 'Full Stack Web Engineer',
    organization: 'Muyalogy',
    date: '2023 - Present',
    description: 'Developed full-stack features using Next.js, created Telegram bot, implemented UI with TailwindCSS and Mantine, integrated Supabase for backend.',
    skills: ['Next.js', 'TailwindCSS', 'Mantine UI', 'Supabase'],
    icon: FaBriefcase,
    color: '#5651e5'
  },
  {
    id: 2,
    type: 'education',
    title: 'BSc in Computer Science',
    organization: 'Admas University',
    date: '2019',
    description: 'Graduated with Very Great Distinction, achieving a 3.9 GPA. Focused on software engineering and advanced programming concepts.',
    achievements: ['3.9 GPA', 'Very Great Distinction'],
    icon: FaGraduationCap,
    color: '#10B981'
  },
  {
    id: 3,
    type: 'work',
    title: 'Full Stack Developer',
    organization: 'Jiret LMS',
    date: '2024',
    description: 'Built learning management system using Next.js, Drizzle ORM, PostgreSQL, and Supabase.',
    skills: ['Next.js', 'PostgreSQL', 'Drizzle ORM'],
    icon: FaBriefcase,
    color: '#5651e5'
  },
  {
    id: 4,
    type: 'certification',
    title: 'Meta Advanced React Certification',
    organization: 'Meta (Facebook)',
    date: '2022',
    description: 'Advanced certification in React.js development, covering modern patterns and best practices.',
    icon: FaAward,
    color: '#3B82F6'
  },
  {
    id: 5,
    type: 'work',
    title: 'Web Development Instructor',
    organization: 'Muyalogy',
    date: '2025',
    description: 'Created and teaching comprehensive web development course in Amharic.',
    skills: ['Teaching', 'Web Development', 'Course Creation'],
    icon: FaCode,
    color: '#5651e5'
  }
];

const TimelineItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex gap-8 relative ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline line */}
      <div className="hidden md:block w-1/2" />
      
      {/* Content */}
      <div className="w-full md:w-1/2 relative pb-12">
        {/* Vertical line */}
        <div className="absolute left-[-5px] md:left-auto md:right-[-5px] top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-gray-700" />
        
        {/* Content card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative ml-6 md:ml-0 md:mr-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
          {/* Icon */}
          <div 
            className="absolute left-[-3rem] md:left-auto md:right-[-3rem] top-6 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: item.color }}
          >
            <item.icon className="text-white text-xl" />
          </div>

          {/* Date badge */}
          <div className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-3"
               style={{ backgroundColor: `${item.color}20`, color: item.color }}>
            {item.date}
          </div>

          <h3 className="text-xl font-bold dark:text-white mb-1">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">{item.organization}</p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>

          {/* Skills or Achievements */}
          {item.skills && (
            <div className="flex flex-wrap gap-2">
              {item.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {item.achievements && (
            <div className="flex flex-wrap gap-2">
              {item.achievements.map((achievement, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                >
                  <FaAward className="text-xs" />
                  {achievement}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Experience & Education</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey, educational background, and key achievements.
          </p>
        </div>

        <div className="relative">
          {experiences.map((experience, index) => (
            <TimelineItem key={experience.id} item={experience} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;