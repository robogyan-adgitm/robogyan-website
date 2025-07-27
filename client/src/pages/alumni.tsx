import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alumniBatches } from "@/data/alumni-data";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ExternalLink, Linkedin, Github, Twitter, MapPin, Building, Calendar } from "lucide-react";

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
          <h1 className="font-russo text-3xl sm:text-4xl md:text-5xl mb-6 mb-8 text-[hsl(180,100%,50%)] neon-text">
            Our Esteemed Alumni
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Celebrating the brilliant minds who have shaped the future of robotics and innovation.
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
                                    className="w-24 h-24 rounded-full border-2 border-[hsl(235,85%,65%)]"
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
        
      </div>
    </div>
  );
}