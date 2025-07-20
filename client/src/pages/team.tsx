import { motion } from "framer-motion";
import { teamMembers } from "@/data/team-data";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Linkedin, Github, Twitter, Instagram } from "lucide-react";

export default function Team() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-orbitron text-5xl font-bold mb-8 text-[hsl(180,100%,50%)] neon-text">
            Our Team
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the brilliant minds behind Robogyan's success. Our diverse team of innovators, creators, and leaders.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassmorphismCard className="text-center group">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-3 border-[hsl(180,100%,50%)]"
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                />
                <h3 className="font-orbitron text-xl font-bold text-[hsl(150,100%,50%)] mb-2">
                  {member.name}
                </h3>
                <p className="text-[hsl(180,100%,50%)] mb-2">{member.position}</p>
                <p className="text-gray-400 text-sm mb-3">{member.period}</p>
                
                <div className="space-y-2 mb-4">
                  <p className="text-xs text-gray-300">{member.techStack.join(", ")}</p>
                  <p className="text-xs text-gray-400">{member.description}</p>
                </div>

                {/* Contact Info - Hidden by default, shown on hover */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  whileInView={{ opacity: 1, height: "auto" }}
                  className="mb-4 space-y-2"
                >
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <Mail size={14} className="text-[hsl(180,100%,50%)]" />
                    <span className="text-gray-300">{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center justify-center space-x-2 text-sm">
                      <Phone size={14} className="text-[hsl(220,100%,50%)]" />
                      <span className="text-gray-300">{member.phone}</span>
                    </div>
                  )}
                </motion.div>

                {/* Social Links */}
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <motion.a
                      href={member.social.linkedin}
                      whileHover={{ scale: 1.2 }}
                      className="text-[hsl(220,100%,50%)] hover:text-white transition-colors"
                    >
                      <Linkedin size={18} />
                    </motion.a>
                  )}
                  {member.social.github && (
                    <motion.a
                      href={member.social.github}
                      whileHover={{ scale: 1.2 }}
                      className="text-[hsl(180,100%,50%)] hover:text-white transition-colors"
                    >
                      <Github size={18} />
                    </motion.a>
                  )}
                  {member.social.twitter && (
                    <motion.a
                      href={member.social.twitter}
                      whileHover={{ scale: 1.2 }}
                      className="text-[hsl(270,100%,70%)] hover:text-white transition-colors"
                    >
                      <Twitter size={18} />
                    </motion.a>
                  )}
                  {member.social.instagram && (
                    <motion.a
                      href={member.social.instagram}
                      whileHover={{ scale: 1.2 }}
                      className="text-[hsl(270,100%,70%)] hover:text-white transition-colors"
                    >
                      <Instagram size={18} />
                    </motion.a>
                  )}
                </div>
              </GlassmorphismCard>
            </motion.div>
          ))}
        </div>

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
            >
              Apply Now
            </Button>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
}
