import { motion } from "framer-motion";
import { teamMembers } from "@/data/team-data";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Linkedin, Github, Twitter, Instagram, Cog } from "lucide-react";

export default function Team() {
  // Filter leadership and general members
  const president = teamMembers.find(member => member.position === "President");
  const vicePresident = teamMembers.find(member => member.position === "Vice President");
  const generalMembers = teamMembers.filter(
    member => member.position !== "President" && member.position !== "Vice President"
  );

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-russo text-5xl font-bold mb-8 text-[hsl(150,45%,60%)] neon-text">
            Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the brilliant minds behind Robogyan's success. Our diverse team of innovators, creators, and leaders.
          </p>
        </motion.div>

        {/* Leadership Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0, delay: 0.2 }}
          className="mb-20"
        >
          <div className="flex flex-wrap justify-center gap-12 max-w-6xl mx-auto">
            {president && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full lg:w-[calc(50%-24px)] max-w-lg"
              >
                <GlassmorphismCard className="text-center group leadership-card">
                  <div className="relative mb-6">
                    <motion.img
                      src={president.image}
                      alt={president.name}
                      className="w-40 h-40 rounded-full mx-auto border-4 border-[hsl(180,100%,50%)] leadership-image object-cover"
                      whileHover={{ scale: 1.08, rotate: 3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <Badge className="mb-4 bg-gradient-to-r from-[hsl(180,100%,50%)] to-[hsl(220,100%,50%)] text-black font-bold px-4 py-1">
                    {president.position}
                  </Badge>
                  <h3 className="font-russo text-2xl gradient-text mb-2">
                    {president.name}
                  </h3>
                  <p className="text-[hsl(180,100%,50%)] mb-2 font-semibold">{president.period}</p>
                  
                  <div className="space-y-3 mb-6">
                    <p className="text-sm text-gray-300 leading-relaxed">{president.description}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {president.techStack.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-[hsl(180,100%,50%,0.2)] text-[hsl(180,100%,50%)]">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {president.social.linkedin && (
                      <motion.a
                        href={president.social.linkedin}
                        whileHover={{ scale: 1.3 }}
                        className="text-[hsl(220,100%,50%)] hover:text-white transition-colors"
                      >
                        <Linkedin size={20} />
                      </motion.a>
                    )}
                    {president.social.github && (
                      <motion.a
                        href={president.social.github}
                        whileHover={{ scale: 1.3 }}
                        className="text-[hsl(180,100%,50%)] hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                  </div>
                </GlassmorphismCard>
              </motion.div>
            )}

            {vicePresident && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="w-full lg:w-[calc(50%-24px)] max-w-lg"
              >
                <GlassmorphismCard className="text-center group leadership-card">
                  <div className="relative mb-6">
                    <motion.img
                      src={vicePresident.image}
                      alt={vicePresident.name}
                      className="w-40 h-40 rounded-full mx-auto border-4 border-[hsl(270,100%,70%)] leadership-image object-cover"
                      whileHover={{ scale: 1.08, rotate: -3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <Badge className="mb-4 bg-gradient-to-r from-[hsl(270,100%,70%)] to-[hsl(300,100%,60%)] text-black font-bold px-4 py-1">
                    {vicePresident.position}
                  </Badge>
                  <h3 className="font-russo text-2xl gradient-text mb-2">
                    {vicePresident.name}
                  </h3>
                  <p className="text-[hsl(270,100%,70%)] mb-2 font-semibold">{vicePresident.period}</p>
                  
                  <div className="space-y-3 mb-6">
                    <p className="text-sm text-gray-300 leading-relaxed">{vicePresident.description}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {vicePresident.techStack.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-[hsl(270,100%,70%,0.2)] text-[hsl(270,100%,70%)]">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    {vicePresident.social.linkedin && (
                      <motion.a
                        href={vicePresident.social.linkedin}
                        whileHover={{ scale: 1.3 }}
                        className="text-[hsl(220,100%,50%)] hover:text-white transition-colors"
                      >
                        <Linkedin size={20} />
                      </motion.a>
                    )}
                    {vicePresident.social.github && (
                      <motion.a
                        href={vicePresident.social.github}
                        whileHover={{ scale: 1.3 }}
                        className="text-[hsl(270,100%,70%)] hover:text-white transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                    )}
                  </div>
                </GlassmorphismCard>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Revealing Soon Section
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-russo text-3xl md:text-4xl lg:text-5xl mb-6 gradient-text">
              Core Team of 2025
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Stay tuned for the new core team.
            </p>
          </div>
          
          <div className="flex justify-center">
            <GlassmorphismCard className="text-center p-12 max-w-md">
              <motion.div
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-6 border-2 border-dashed border-[hsl(180,100%,50%)] flex items-center justify-center bg-[hsl(180,100%,50%,0.1)]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Cog size={48} className="text-[hsl(180,100%,50%)]" />
                  </motion.div>
                </div>
              </motion.div>
              
              <h3 className="font-russo text-2xl gradient-text mb-4">
                Revealing Soon
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                We're working on introducing our new core team. 
                Check back soon for updates!
              </p>
              
              <div className="flex justify-center space-x-2">
                <Badge variant="secondary" className="bg-[hsl(180,100%,50%,0.2)] text-[hsl(180,100%,50%)]">
                  Stay Tuned
                </Badge>
              </div>
            </GlassmorphismCard>
          </div>
        </motion.div> */}

        {/*Core Team Section - Hidden temporarily */}
        { 
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-russo text-3xl md:text-4xl mb-6 gradient-text">
              Core Team 2025
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {generalMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] max-w-sm"
              >
                <GlassmorphismCard className="text-center group h-full p-6">
                  <motion.img
                    src={member.image || "/default-avatar.png"}
                    alt={member.name}
                    className="w-36 h-36 rounded-full mx-auto mb-4 border-3 border-[hsl(180,100%,50%)] object-cover"
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.3 }}
                  />
                  <h3 className="font-russo text-xl gradient-text mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[hsl(180,100%,50%)] mb-2 text-sm font-semibold">{member.position}</p>
                  <p className="text-gray-400 text-xs mb-4">{member.period}</p>
                  
                  <div className="space-y-3 mb-4">
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">{member.description}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {member.techStack.slice(0, 4).map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-[hsl(180,100%,50%,0.1)] text-[hsl(180,100%,50%)]">
                          {tech}
                        </Badge>
                      ))}
                      {member.techStack.length > 4 && (
                        <Badge variant="secondary" className="text-xs bg-[hsl(180,100%,50%,0.1)] text-[hsl(180,100%,50%)]">
                          +{member.techStack.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    {member.social.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        whileHover={{ scale: 1.2 }}
                        className="text-[hsl(220,100%,50%)] hover:text-white transition-colors"
                      >
                        <Linkedin size={18} />
                      </motion.a>
                    )}
                    {member.social.github && member.social.github !== "#" && (
                      <motion.a
                        href={member.social.github}
                        whileHover={{ scale: 1.2 }}
                        className="text-[hsl(180,100%,50%)] hover:text-white transition-colors"
                      >
                        <Github size={18} />
                      </motion.a>
                    )}
                  </div>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
        }

        {/* Join Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <GlassmorphismCard hover={false} className="p-12">
            <h3 className="font-orbitron text-3xl font-bold mb-6 text-[hsl(180,100%,50%)]">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              We're always looking for passionate individuals who want to make a difference in the tech world.
              Join us and be part of something extraordinary.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-[hsl(180,100%,50%,0.2)] text-[hsl(180,100%,50%)]">
                Innovation
              </Badge>
              <Badge variant="secondary" className="bg-[hsl(150,100%,50%,0.2)] text-[hsl(150,100%,50%)]">
                Collaboration
              </Badge>
              <Badge variant="secondary" className="bg-[hsl(220,100%,50%,0.2)] text-[hsl(220,100%,50%)]">
                Learning
              </Badge>
              <Badge variant="secondary" className="bg-[hsl(270,100%,70%,0.2)] text-[hsl(270,100%,70%)]">
                Growth
              </Badge>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[hsl(180,100%,50%)] to-[hsl(220,100%,50%)] text-[hsl(0,0%,4%)] hover:scale-105 transition-transform animate-glow font-semibold px-8 py-4"
              onClick={() => {
                window.open('https://chat.whatsapp.com/GP8hZUbEV8G2b3jb0uIBWY?mode=r_c', '_blank');
              }}
            >
              Join WhatsApp Group
            </Button>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
}
