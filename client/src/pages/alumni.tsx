import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { alumniBatches } from "@/data/alumni-data";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ExternalLink, Linkedin, Github, Twitter, MapPin, Building, Calendar, Trophy } from "lucide-react";

export default function Alumni() {
  const [expandedBatch, setExpandedBatch] = useState<string | null>(null);

  // Founding members data (separate from main alumni batches)
  const foundingMembers = [
    {
      id: "founding1",
      name: "Nikhil Mishra",
      position: "Founder",
      currentCompany: "Magpie AI",
      currentRole: "Founder",
      image: "/images/alumni/NikhilMishra.jpeg",
      linkedin: "https://www.linkedin.com/in/nikhil-zeeq/",
    },
    {
      id: "founding2",
      name: "Jatin Sharma",
      position: "Founder",
      currentCompany: "Jetsons Robotics",
      currentRole: "CEO, Founder",
      image: "/images/alumni/jatin.jpeg",
      linkedin: "https://www.linkedin.com/in/jatin-s-b017692a/",
    },
  ];

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
          <h1 className="font-russo text-3xl sm:text-4xl md:text-5xl mb-6 mb-8 text-[hsl(150,45%,60%)] neon-text">
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
              transition={{ duration: 0.6, delay: index * 0.05 }}
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
                    {batch.image ? (
                      <motion.img
                        src={batch.image}
                        alt={batch.subtitle}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    ) : (
                      // Placeholder for missing images
                      <motion.div
                        className="w-full h-64 bg-gradient-to-br from-[hsl(235,85%,65%,0.1)] to-[hsl(275,85%,70%,0.1)] rounded-lg mb-6 flex flex-col items-center justify-center border-2 border-dashed border-[hsl(235,85%,65%,0.3)]"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{ 
                            rotate: [0, 180, 360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="w-16 h-16 bg-gradient-to-br from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] rounded-full flex items-center justify-center mb-4 opacity-80"
                        >
                          <Calendar className="text-white" size={24} />
                        </motion.div>
                        <h4 className="font-orbitron text-lg font-bold text-[hsl(235,85%,65%)] mb-2">
                          Updating Data Soon
                        </h4>
                        <p className="text-gray-400 text-sm text-center px-4">
                          We're collecting memories from this amazing batch. If you are part of that core, contact us!
                        </p>
                        <div className="flex gap-2 mt-3">
                          <div className="w-2 h-2 bg-[hsl(235,85%,65%)] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-[hsl(275,85%,70%)] rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                          <div className="w-2 h-2 bg-[hsl(235,85%,65%)] rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                        </div>
                      </motion.div>
                    )}
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
                                transition={{ duration: 0.3, delay: memberIndex * 0.05 }}
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

        {/* Founding Batch Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-32 mb-20"
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[hsl(180,100%,50%)]"></div>
              <Badge className="bg-gradient-to-r from-[hsl(180,100%,50%)] to-[hsl(220,100%,50%)] text-black font-bold px-4 py-2 text-sm">
                EST. 2011
              </Badge>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[hsl(180,100%,50%)]"></div>
            </motion.div>
            
            <h2 className="font-russo text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-[hsl(180,100%,50%)] neon-text">
              The Founding Legacy
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
              Where it all began. The visionaries who laid the foundation of Robogyan's journey of excellence.
            </p>
          </div>

          <GlassmorphismCard className="p-8 sm:p-12 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[hsl(180,100%,50%)] to-[hsl(220,100%,50%)]"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[hsl(180,100%,50%,0.1)] rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[hsl(220,100%,50%,0.1)] rounded-full blur-xl"></div>
            
            <div className="relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Story */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="mb-6">
                    <h3 className="font-orbitron text-2xl sm:text-3xl font-bold mb-4 gradient-text">
                      2011 - The Beginning
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-base sm:text-lg mb-6">
                      The visionaries who dared to dream and laid the foundation of Robogyan's legacy.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="secondary" className="bg-[hsl(180,100%,50%,0.2)] text-[hsl(180,100%,50%)]">
                        Pioneers
                      </Badge>
                      <Badge variant="secondary" className="bg-[hsl(220,100%,50%,0.2)] text-[hsl(220,100%,50%)]">
                        Visionaries
                      </Badge>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side - Founding Members */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="grid gap-4">
                    {foundingMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                        className="bg-gradient-to-br from-[hsl(180,100%,50%,0.1)] to-[hsl(220,100%,50%,0.1)] rounded-xl p-3 sm:p-4 border border-[hsl(180,100%,50%,0.3)]"
                      >
                        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-4">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[hsl(180,100%,50%)] to-[hsl(220,100%,50%)] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-[hsl(180,100%,50%,0.3)]">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                target.parentElement!.innerHTML = `<Trophy size={20} className="text-white" />`;
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0 text-center sm:text-left">
                            <h4 className="font-russo text-lg sm:text-xl text-[hsl(150,45%,60%)] truncate">
                              {member.name}
                            </h4>
                            <p className="text-gray-300 text-sm sm:text-base truncate">
                              {member.position}
                            </p>
                            <p className="text-gray-400 text-xs sm:text-sm truncate">
                              {member.currentRole} • {member.currentCompany}
                            </p>
                          </div>
                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[hsl(180,100%,50%)] hover:text-white transition-colors flex-shrink-0 mt-2 sm:mt-0"
                            >
                              <Linkedin size={18} className="sm:w-5 sm:h-5" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Adding more details message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="text-center mt-4"
                    >
                      <p className="text-gray-400 text-m  font-light">
                        Adding more details soon...
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Quote */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 text-center"
              >
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[hsl(180,100%,50%,0.5)] to-transparent mb-6"></div>
                <p className="text-[hsl(180,100%,50%)] font-orbitron text-xl sub:bold">
                  "Every great innovation starts with a bold vision - this is where the future began."
                </p>
              </motion.div>
            </div>
          </GlassmorphismCard>
        </motion.div>

        {/* Data Update Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <GlassmorphismCard className="text-center p-8 sm:p-12">
            <div className="mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-white" size={32} />
              </div>
            </div>
            <h3 className="font-orbitron text-xl sm:text-2xl font-bold mb-4 gradient-text">
              Currently updating...
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              We're currently updating our alumni database with information from previous batches.<br/>
              <span className="block mt-2">If you are an alumni, help us and future generations know who are behind the RG legacy. Your contribution will inspire and connect the Robogyan family for years to come!</span>
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <p className="text-gray-400 text-sm mb-4">
                Share your journey with us!
              </p>
              <a
                href="https://forms.gle/YuEKqtCMMVYvHHmXA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg"
              >
                <ExternalLink size={16} />
                Provide Your Details
              </a>
            </motion.div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
}