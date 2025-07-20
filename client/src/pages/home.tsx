import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import CounterAnimation from "@/components/animations/counter-animation";
import { Rocket, Users, Cog, Brain, Target, Lightbulb, ArrowRight, Github, ExternalLink } from "lucide-react";

const achievements = [
  { label: "Active Members", value: 150, color: "text-[hsl(150,45%,60%)]" },
  { label: "Total Winnings", value: 50, color: "text-[hsl(275,85%,70%)]" },
  { label: "Projects Completed", value: 200, color: "text-[hsl(220,70%,55%)]" },
  { label: "Years of Excellence", value: 5, color: "text-[hsl(235,85%,65%)]" },
];

const aboutPoints = [
  {
    icon: Rocket,
    title: "Innovation-Driven Projects",
    color: "text-[hsl(235,75%,65%)]",
  },
  {
    icon: Users,
    title: "Collaborative Community",
    color: "text-[hsl(150,45%,60%)]",
  },
  {
    icon: Cog,
    title: "Hands-on Learning",
    color: "text-[hsl(275,75%,70%)]",
  },
];

const featuredProjects = [
  {
    id: 1,
    title: "Autonomous Rover",
    description: "AI-powered rover for terrain mapping and obstacle avoidance using computer vision.",
    category: "Hardware",
    icon: "🤖",
    gradient: "from-[hsl(235,75%,65%)] to-[hsl(220,70%,55%)]",
  },
  {
    id: 2,
    title: "Smart Campus",
    description: "IoT-based campus management system with real-time monitoring and automation.",
    category: "Software",
    icon: "🧠",
    gradient: "from-[hsl(150,45%,60%)] to-[hsl(275,75%,70%)]",
  },
  {
    id: 3,
    title: "VR Learning Platform",
    description: "Immersive virtual reality platform for engineering education and simulation.",
    category: "Mixed",
    icon: "🎮",
    gradient: "from-[hsl(275,75%,70%)] to-[hsl(235,75%,65%)]",
  },
];

const coreTeam = [
  {
    name: "Arjun Sharma",
    position: "President",
    specialization: "AI/ML Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    borderColor: "border-[hsl(235,75%,65%)]",
  },
  {
    name: "Priya Patel",
    position: "Vice President",
    specialization: "Robotics Engineer",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    borderColor: "border-[hsl(150,45%,60%)]",
  },
  {
    name: "Rahul Kumar",
    position: "Technical Head",
    specialization: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    borderColor: "border-[hsl(275,75%,70%)]",
  },
  {
    name: "Sneha Singh",
    position: "Design Head",
    specialization: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    borderColor: "border-[hsl(220,70%,55%)]",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative tech-pattern pt-20">
        <div className="text-center z-10 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-orbitron text-2xl sm:text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            WELCOME TO
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-orbitron text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black mb-8 gradient-text leading-tight"
          >
            ROBOGYAN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto px-4"
          >
            Where Innovation Meets Excellence. Join the Future of Technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white hover:scale-105 transition-transform font-semibold px-8 py-4 text-lg"
            >
              Explore Our Journey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-orbitron text-4xl font-bold text-center mb-16 gradient-text"
          >
            Our Achievements
          </motion.h3>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassmorphismCard className="text-center">
                  <CounterAnimation
                    target={achievement.value}
                    className={`text-4xl mb-2 ${achievement.color}`}
                  />
                  <div className="text-gray-300">{achievement.label}</div>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-orbitron text-4xl font-bold text-center mb-16 gradient-text"
          >
            About Robogyan
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="font-orbitron text-2xl font-bold mb-6 text-[hsl(150,100%,50%)]">
                Our Mission
              </h4>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                At Robogyan, we bridge the gap between theoretical knowledge and practical innovation.
                Our mission is to foster a community of tech enthusiasts who push the boundaries of what's possible.
              </p>
              <div className="space-y-4">
                {aboutPoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <motion.div
                      key={point.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center space-x-4"
                    >
                      <Icon className={`${point.color} text-xl`} size={24} />
                      <span className="text-white">{point.title}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Students collaborating on tech project"
                className="rounded-xl card-hover"
              />
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Electronic circuit board"
                className="rounded-xl card-hover"
              />
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Code on computer screen"
                className="rounded-xl card-hover"
              />
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                alt="Robotic arm in action"
                className="rounded-xl card-hover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-orbitron text-4xl font-bold text-center mb-16 gradient-text"
          >
            Featured Projects
          </motion.h3>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassmorphismCard>
                  <div className={`bg-gradient-to-br ${project.gradient} rounded-lg p-4 mb-4 text-center`}>
                    <div className="text-3xl text-[hsl(0,0%,4%)]">{project.icon}</div>
                  </div>
                  <h4 className="font-orbitron text-xl font-bold mb-3 text-[hsl(150,45%,60%)]">
                    {project.title}
                  </h4>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="bg-[hsl(235,75%,65%,0.2)] text-[hsl(235,75%,65%)]">
                      {project.category}
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-[hsl(220,70%,55%)] hover:text-white p-0">
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-orbitron text-4xl font-bold text-center mb-16 gradient-text"
          >
            Meet Our Core Team
          </motion.h3>
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {coreTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassmorphismCard className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className={`w-24 h-24 rounded-full mx-auto mb-4 border-2 ${member.borderColor}`}
                  />
                  <h4 className="font-orbitron text-lg font-bold text-[hsl(150,45%,60%)] mb-2">
                    {member.name}
                  </h4>
                  <p className="text-[hsl(235,75%,65%)] text-sm mb-2">{member.position}</p>
                  <p className="text-gray-400 text-xs">{member.specialization}</p>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/team">
              <Button
                variant="outline"
                size="lg"
                className="border-[hsl(235,75%,65%)] text-[hsl(235,75%,65%)] hover:bg-[hsl(235,75%,65%)] hover:text-white transition-all"
              >
                View Full Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
