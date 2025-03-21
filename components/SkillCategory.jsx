import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNode, FaDatabase, FaServer, FaTools } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiMongodb, SiPostgresql, SiSupabase, SiFirebase } from 'react-icons/si';

const skills = {
  frontend: [
    { name: "React.js & Next.js", level: 89, icon: SiNextdotjs },
    { name: "TailwindCSS & Mantine UI", level: 90, icon: SiTailwindcss },
    { name: "TypeScript", level: 85, icon: SiTypescript },
    { name: "Redux & Context API", level: 88, icon: FaReact },
    { name: "Responsive Design", level: 80, icon: FaTools },
  ],
  backend: [
    { name: "Node.js & Express", level: 85, icon: FaNode },
    { name: "RESTful APIs", level: 90, icon: FaServer },
   
    { name: "Authentication & Authorization", level: 88, icon: FaTools },
  ],
  database: [
    { name: "PostgreSQL", level: 85, icon: SiPostgresql },
    { name: "MongoDB", level: 82, icon: SiMongodb },
    { name: "Supabase", level: 90, icon: SiSupabase },
    { name: "Firebase", level: 70, icon: SiFirebase },
  ]
};

const SkillCategory = ({ title, skills, icon: Icon }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="text-[#5651e5] text-2xl" />
        <h3 className="text-xl font-bold dark:text-white">{title}</h3>
      </div>
      <div className="space-y-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <skill.icon className="text-[#5651e5] text-xl" />
              <div className="flex justify-between w-full">
                <span className="font-medium dark:text-white">{skill.name}</span>
                <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
              </div>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#5651e5] to-[#709dff] relative"
              >
                <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SkillsProgress = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Technical Skills</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels in various technologies and tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <SkillCategory title="Frontend Development" skills={skills.frontend} icon={FaReact} />
            <SkillCategory title="Backend Development" skills={skills.backend} icon={FaServer} />
          </div>
          <div>
            <SkillCategory title="Database & Cloud" skills={skills.database} icon={FaDatabase} />
            {/* You can add more categories here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsProgress;