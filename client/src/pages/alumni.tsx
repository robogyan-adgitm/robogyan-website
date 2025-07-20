import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ExternalLink, Linkedin, Github, Twitter, MapPin, Building, Calendar } from "lucide-react";

interface AlumniMember {
  id: string;
  name: string;
  position: string;
  currentCompany: string;
  currentRole: string;
  image: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

interface AlumniBatch {
  year: string;
  subtitle: string;
  description: string;
  image: string;
  members: AlumniMember[];
  achievements: string[];
}

const alumniBatches: AlumniBatch[] = [
  {
    year: "2025",
    subtitle: "Core of 2025",
    description: "Meet the innovative team members who made their mark this year.",
    image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/images//rg202425.png",
    achievements: ["SIH2024 Grand Finalists", "Winners @IITK Techkriti", "Xylem International Winners"],
    members: [
      {
        id: "1",
        name: "Vidhi Gupta",
        position: "Team Lead",
        currentCompany: "Google",
        currentRole: "Software Engineer",
        image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//vidhi.png",
        linkedin: "#",
        github: "#",
      },
      {
        id: "2",
        name: "Jayam Shrivastav",
        position: "AI Specialist",
        currentCompany: "Microsoft",
        currentRole: "ML Engineer",
        image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//jayam.jpg",
        linkedin: "#",
        github: "#",
      },
      {
        id: "3",
        name: "Amogh Saxena",
        position: "Pre Final Year",
        currentCompany: "NA",
        currentRole: "NA",
        image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//amogh.jpg",
        linkedin: "#",
        github: "#",
      },
      {
        id: "4",
        name: "Macle",
        position: "Pre Final Year",
        currentCompany: "NA",
        currentRole: "NA",
        image: "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/members//macle.png",
        linkedin: "#",
        github: "#",
      },
    ],
  },
  {
    year: "2024",
    subtitle: "Class of 2024",
    description: "Meet the innovative team members who made their mark this year",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&crop=faces",
    achievements: ["International Hackathon Winners", "Open Source Contributors", "Industry Innovation Awards"],
    members: [
      {
        id: "4",
        name: "Sneha Reddy",
        position: "Project Manager",
        currentCompany: "Amazon",
        currentRole: "Product Manager",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
      },
      {
        id: "5",
        name: "Vikram Singh",
        position: "Software Developer",
        currentCompany: "Netflix",
        currentRole: "Senior SWE",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
        github: "#",
      },
      {
        id: "6",
        name: "Ananya Gupta",
        position: "Research Head",
        currentCompany: "OpenAI",
        currentRole: "Research Scientist",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
        github: "#",
      },
    ],
  },
  {
    year: "2023",
    subtitle: "Class of 2023",
    description: "Meet the innovative team members who made their mark this year",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop&crop=faces",
    achievements: ["Tech Innovation Summit", "Multiple Patent Holders", "Startup Founders"],
    members: [
      {
        id: "7",
        name: "Dev Malhotra",
        position: "Innovation Lead",
        currentCompany: "Apple",
        currentRole: "Innovation Engineer",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
        github: "#",
      },
      {
        id: "8",
        name: "Riya Jain",
        position: "UI/UX Designer",
        currentCompany: "Figma",
        currentRole: "Senior Designer",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
      },
      {
        id: "9",
        name: "Karan Mehta",
        position: "Embedded Systems",
        currentCompany: "Intel",
        currentRole: "Hardware Engineer",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&h=300&fit=crop&crop=face",
        linkedin: "#",
        github: "#",
      },
    ],
  },
];

export default function Alumni() {
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);

  const toggleBatch = (year: string) => {
    setExpandedBatch(expandedBatch === year ? null : year);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Our Alumni
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Celebrating the brilliant minds who have shaped the future of robotics and innovation
          </p>
        </motion.div>

        {/* Alumni Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] h-full hidden lg:block"></div>
          
          {alumniBatches.map((batch, index) => (
            <motion.div
              key={batch.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative mb-20"
            >
              {/* Year Badge */}
              <div className="flex justify-center mb-8 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-4 lg:z-10">
                <div className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white font-orbitron font-bold text-xl sm:text-2xl px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg">
                  {batch.year}
                </div>
              </div>

              {/* Content */}
              <div className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 mt-8`}>
                <div className="w-full lg:w-1/2">
                  <GlassmorphismCard className="p-4 sm:p-6 md:p-8">
                    <motion.img
                      src={batch.image}
                      alt={batch.subtitle}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                    <h3 className="font-orbitron text-xl sm:text-2xl font-bold mb-4 gradient-text">
                      {batch.subtitle}
                    </h3>
                    <p className="text-gray-300 mb-6">{batch.description}</p>
                    
                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                      <div className="space-y-2">
                        {batch.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-[hsl(235,85%,65%)] rounded-full"></div>
                            <span className="text-gray-300 text-sm">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={() => toggleBatch(batch.year)}
                      className="w-full bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white hover:scale-105 transition-transform"
                    >
                      {expandedBatch === batch.year ? 'Hide' : 'Explore'} Team Members
                      <ChevronRight 
                        size={20} 
                        className={`ml-2 transition-transform ${expandedBatch === batch.year ? 'rotate-90' : ''}`} 
                      />
                    </Button>
                  </GlassmorphismCard>
                </div>

                <div className="w-full lg:w-1/2">
                  <AnimatePresence>
                    {expandedBatch === batch.year && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.4 }}
                      >
                        <GlassmorphismCard className="p-4 sm:p-6">
                          <h4 className="font-orbitron text-lg sm:text-xl font-bold mb-6 text-center gradient-text">
                            Team Members
                          </h4>
                          <div className="space-y-4">
                            {batch.members.map((member, memberIndex) => (
                              <motion.div
                                key={member.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: memberIndex * 0.1 }}
                                className="bg-[hsl(0,0%,16%)] rounded-lg p-4 hover:bg-[hsl(0,0%,20%)] transition-colors"
                              >
                                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                                  <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-16 h-16 rounded-full border-2 border-[hsl(235,85%,65%)]"
                                  />
                                  <div className="flex-1 text-center sm:text-left">
                                    <h5 className="font-orbitron font-bold text-white text-sm sm:text-base">{member.name}</h5>
                                    <p className="text-[hsl(235,85%,65%)] text-xs sm:text-sm">{member.position}</p>
                                    <div className="flex items-center justify-center sm:justify-start space-x-1 text-xs text-gray-400 mt-1">
                                      <Building size={10} />
                                      <span className="truncate">{member.currentCompany}</span>
                                      <span className="hidden sm:inline">•</span>
                                      <span className="hidden sm:inline truncate">{member.currentRole}</span>
                                    </div>
                                  </div>
                                  <div className="flex space-x-2">
                                    {member.linkedin && (
                                      <a href={member.linkedin} className="text-[hsl(220,70%,55%)] hover:text-white transition-colors">
                                        <Linkedin size={14} />
                                      </a>
                                    )}
                                    {member.github && (
                                      <a href={member.github} className="text-[hsl(235,85%,65%)] hover:text-white transition-colors">
                                        <Github size={14} />
                                      </a>
                                    )}
                                    {member.twitter && (
                                      <a href={member.twitter} className="text-[hsl(275,85%,70%)] hover:text-white transition-colors">
                                        <Twitter size={14} />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </GlassmorphismCard>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20"
        >
          <GlassmorphismCard hover={false} className="p-6 sm:p-8 md:p-12 text-center">
            <h3 className="font-orbitron text-2xl sm:text-3xl font-bold mb-8 gradient-text">
              Success Stories
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto px-4">
              Our alumni continue to make their mark in leading tech companies and innovative startups worldwide.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Success story"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-3 border-[hsl(235,85%,65%)]"
                />
                <h4 className="font-orbitron text-lg font-bold text-white mb-2">
                  Aditya Kumar
                </h4>
                <p className="text-[hsl(235,85%,65%)] text-sm mb-2">Class of 2021</p>
                <p className="text-gray-400 text-sm">Software Engineer at Google</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Success story"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-3 border-[hsl(275,85%,70%)]"
                />
                <h4 className="font-orbitron text-lg font-bold text-white mb-2">
                  Shreya Agarwal
                </h4>
                <p className="text-[hsl(275,85%,70%)] text-sm mb-2">Class of 2020</p>
                <p className="text-gray-400 text-sm">Founder, TechStart Solutions</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"
                  alt="Success story"
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-3 border-[hsl(220,70%,55%)]"
                />
                <h4 className="font-orbitron text-lg font-bold text-white mb-2">
                  Arjun Malhotra
                </h4>
                <p className="text-[hsl(220,70%,55%)] text-sm mb-2">Class of 2019</p>
                <p className="text-gray-400 text-sm">Research Scientist, MIT</p>
              </motion.div>
            </div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
}