"use client"

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AnimatedLetters from './AnimatedLetters';
import StaggerContainer from './StaggerContainer';
import AnimationItem from './AnimationItem';
import Card3D from './Card3D';

// Import team member images
import memberImage1 from '../../public/images/team/team-member-1.jpg';
import memberImage2 from '../../public/images/team/team-member-2.jpg';
import memberImage3 from '../../public/images/team/team-member-3.jpg';
import memberImage4 from '../../public/images/team/team-member-4.jpg';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: any;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

export default function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);    const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Dr. Harinda  Fernando ",
      role: "Supervisor",
      bio: "Department of Computer Systems Engineering",
      image: memberImage1,
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com",
        website: "https://example.com"
      }
    },
    {
      id: 2,
      name: "Ms. Manori Gamage",
      role: "Co-Supervisor",
      bio: "Department of Data Science Faculty of Computing.",
      image: memberImage2,
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    },
    {
      id: 3,
      name: "Silva W.I.S.",
      role: "Researcher",
      bio: "Department of Information Technology Faculty of Computing",
      image: memberImage3,
      socialLinks: {
        twitter: "https://twitter.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      id: 4,
      name: "Liyanage K.L.R. N.",
      role: "Researcher",
      bio: "Department of Information Technology Faculty of Computing",
      image: memberImage4,
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com"
      }
    },
    {
      id: 5,
      name: "Dananjaya H.B.I.", 
      role: "Researcher",
      bio: "Department of Information Technology Faculty of Computing",
      image: memberImage2, // Reusing image, should be replaced with actual image
      socialLinks: {
        twitter: "https://twitter.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com"
      }
    },
    {
      id: 6,
      name: "Perera L. S.",
      role: "Researcher",
      bio: "Department of Information Technology Faculty of Computing",
      image: memberImage3, // Reusing image, should be replaced with actual image
      socialLinks: {
        linkedin: "https://linkedin.com",
        website: "https://example.com",
        github: "https://github.com"
      }
    }
  ];
  
  return (
    <section id="team" className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <AnimatedLetters text="Research " staggerDuration={0.05} />
            <span className="gradient-text">Team</span>
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Meet the researchers and Supervisors behind the MIRROR project publication.
          </p>
        </motion.div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
          {teamMembers.map((member) => (
            <AnimationItem key={member.id} className="h-full">
              <Card3D 
                className="h-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100"
                intensity={10}
                glareOpacity={0.15}
              >
                <div 
                  className="relative h-64 overflow-hidden"
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredMember === member.id ? 1.1 : 1,
                      filter: hoveredMember === member.id ? "brightness(1.1)" : "brightness(1)"
                    }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={member.image}
                      alt={`Photo of ${member.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                      priority={member.id === 1}
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0"
                    animate={{ opacity: hoveredMember === member.id ? 0.7 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Role badge */}
                  <div className="absolute top-3 right-3">
                    <motion.div 
                      className="bg-white/90 text-primary text-xs font-medium py-1 px-3 rounded-full shadow-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: 0.3, duration: 0.4 }
                      }}
                    >
                      {member.role}
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-semibold mb-1 text-foreground"
                    animate={{ 
                      color: hoveredMember === member.id ? "var(--primary)" : "", 
                      transition: { duration: 0.3 } 
                    }}
                  >
                    {member.name}
                  </motion.h3>
                  <motion.div 
                    className="w-12 h-1 bg-primary rounded mb-3"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: hoveredMember === member.id ? 48 : 24,
                      transition: { duration: 0.3 }
                    }}
                  />
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  
                  {member.socialLinks && (
                    <motion.div 
                      className="flex space-x-4"
                      initial={{ opacity: 0.6 }}
                      animate={{ 
                        opacity: hoveredMember === member.id ? 1 : 0.6,
                        y: hoveredMember === member.id ? [0, -3, 0] : 0
                      }}
                      transition={{ 
                        opacity: { duration: 0.3 },
                        y: { 
                          repeat: hoveredMember === member.id ? Infinity : 0,
                          duration: 2
                        }
                      }}
                    >
                      {member.socialLinks.twitter && (
                        <motion.a 
                          href={member.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-primary transition-colors"
                          aria-label={`${member.name}'s Twitter`}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </motion.a>
                      )}
                      
                      {member.socialLinks.linkedin && (
                        <motion.a 
                          href={member.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-primary transition-colors"
                          aria-label={`${member.name}'s LinkedIn`}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                          </svg>
                        </motion.a>
                      )}
                      
                      {member.socialLinks.github && (
                        <motion.a 
                          href={member.socialLinks.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-primary transition-colors"
                          aria-label={`${member.name}'s GitHub`}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </motion.a>
                      )}
                      
                      {member.socialLinks.website && (
                        <motion.a 
                          href={member.socialLinks.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-primary transition-colors"
                          aria-label={`${member.name}'s Website`}
                          whileHover={{ scale: 1.2, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                        </motion.a>
                      )}
                    </motion.div>
                  )}
                </div>
              </Card3D>
            </AnimationItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}