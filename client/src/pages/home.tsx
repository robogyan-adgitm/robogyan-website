import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import CounterAnimation from "@/components/animations/counter-animation";
import { Rocket, Users, Cog, Brain, Target, Lightbulb, ArrowRight, Github, ExternalLink, Trophy, Award, Medal, Star, Zap, Crown, ChevronLeft, ChevronRight } from "lucide-react";

const achievements = [
  { label: "Active Members", value: "130+", color: "text-[hsl(150,45%,60%)]" },
  { label: "Competition Winnings", value: "100+", color: "text-[hsl(275,85%,70%)]" },
  { label: "Projects Completed", value: "50+", color: "text-[hsl(220,70%,55%)]" },
  { label: "Years of Excellence", value: 14, color: "text-[hsl(235,85%,65%)]" },
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
  {
    icon: Trophy,
    title: "Participate in Competetions",
    color: "text-[hsl(180,100%,50%)]",
  },
];

const featuredProjects = [
  {
    id: 1,
    title: "AgroSmart",
    description: "An IoT Device for Smart Irrigation combined with easy to use software",
    category: "IoT",
    image: "/images/projects/agrosmart.png",
    gradient: "from-[hsl(150,45%,60%)] to-[hsl(275,75%,70%)]",
  },
  {
    id: 2,
    title: "RC Plane",
    description: "A custom built rc plane, using various electronic components and tools.",
    category: "Hardware",
    image: "/images/projects/rcplane.jpg",
    gradient: "from-[hsl(235,75%,65%)] to-[hsl(220,70%,55%)]",
  },
  {
    id: 3,
    title: "Manoeuvre Bot",
    description: "A powerful bot with special clamps to hold objects and manouvre through obstacles.",
    category: "Hardware",
    image: "/images/projects/maneuvre.jpg",
    gradient: "from-[hsl(275,75%,70%)] to-[hsl(235,75%,65%)]",
  },
];

const coreTeam = [
  {
    name: "Amogh Saxena",
    position: "President",
    specialization: "Android Specialist",
    image: "/images/coreTeam/amoghsaxena.jpg",
    borderColor: "border-[hsl(235,75%,65%)]",
  },
  {
    name: "Aditya Goel",
    position: "Vice President",
    specialization: "Embedded Master",
    image: "/images/coreTeam/macle.jpg",
    borderColor: "border-[hsl(150,45%,60%)]",
  },
  {
    name: "Abhishek Singh Chauhan",
    position: "IoT Head",
    specialization: "IoT innovator",
    image: "/images/coreTeam/abhishek.jpeg",
    borderColor: "border-[hsl(220,70%,55%)]",
  },
  {
    name: "Ayush Kumar Jha",
    position: "Firmware & Research Head",
    specialization: "Problem Solving Wizard",
    image: "/images/coreTeam/ayush.jpg",
    borderColor: "border-[hsl(220,70%,55%)]",
  },
];

const latestAchievements = [
  {
    icon: Trophy,
    title: "Smart India Hackathon",
    subtitle: "National Winner",
    description: "Developed an AI-powered IoT solution for smart irrigation and aggriculture, impressing judges with a cost effective real-world implementation.",
    date: "Dec 2025",
    image: "/images/events/sihWin.JPG",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    icon: Crown,
    title: "Techkriti IIT Kanpur",
    subtitle: "1st Position",
    description: "Dominated the embedded arena with innovative design and flawless execution in multiple competition rounds.",
    date: "Mar 2024",
    image: "/images/events/Techkriti.jpg",
    gradient: "from-green-400 to-emerald-500",
  }
  // {
  //   icon: Zap,
  //   title: "Innovation Challenge",
  //   subtitle: "Best Project Award",
  //   description: "Recognized for groundbreaking work in assistive robotics, creating solutions for differently-abled individuals.",
  //   date: "Jan 2024",
  //   image: "/images/events/innovation.jpg",
  //   gradient: "from-red-400 to-rose-500",
  // },
  // {
  //   icon: Star,
  //   title: "National Robotics Fest",
  //   subtitle: "Championship",
  //   description: "Emerged victorious among 100+ teams with our advanced line-following and obstacle-avoidance robot.",
  //   date: "Nov 2023",
  //   image: "/images/events/robotfest.jpg",
  //   gradient: "from-indigo-400 to-violet-500",
  // },
];

export default function Home() {
  const [currentAchievement, setCurrentAchievement] = useState(0);

  // Auto-advance achievement every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAchievement((prev) => (prev + 1) % latestAchievements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextAchievement = () => {
    setCurrentAchievement((prev) => (prev + 1) % latestAchievements.length);
  };

  const prevAchievement = () => {
    setCurrentAchievement((prev) => (prev - 1 + latestAchievements.length) % latestAchievements.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative tech-pattern pt-20">
        <div className="text-center z-10 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-russo text-2xl sm:text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            WELCOME TO
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-russo text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black mb-8 gradient-text leading-tight"
          >
            ROBOGYAN
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto px-4"
          >
            Engineering comes alive at Robogyan. Dive into hands-on innovation, master your skills, and build what's next.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white hover:scale-105 transition-transform font-semibold px-8 py-4 text-lg"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Join Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-russo text-4xl font-bold text-center mb-16 gradient-text"
          >
            Our Achievements & Facts
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
                  {typeof achievement.value === 'number' ? (
                    <CounterAnimation
                      target={achievement.value}
                      className={`text-4xl mb-2 ${achievement.color}`}
                    />
                  ) : (
                    <div className={`text-4xl mb-2 font-bold font-orbitron ${achievement.color}`}>
                      {achievement.value}
                    </div>
                  )}
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
            className="font-russo text-4xl font-bold text-center mb-16 gradient-text"
          >
            About Robogyan
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h4 className="font-orbitron text-2xl font-bold mb-6 text-[hsl(180,100%,50%)] neon-text">
                Our Mission
              </h4>
              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Robogyan is all about the sheer joy of learning. At Robogyan, you don't just learn through workshops; you learn by experimenting and doing stuff you never thought you could.
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
                src="/images/ourMission/2.jpg"
                alt="Working at IIITD"
                className="w-full h-56 object-cover rounded-xl card-hover"
              />
              <img
                src="/images/ourMission/1.jpg"
                alt="RG Lab & Plane"
                className="w-full h-56 object-cover rounded-xl card-hover"
              />
              <img
                src="/images/ourMission/3.jpg"
                alt="RG Lab"
                className="w-full h-56 object-cover rounded-xl card-hover"
              />
              <img
                src="/images/ourMission/4.jpg"
                alt="RG lab before Techkriti"
                className="w-full h-56 object-cover rounded-xl card-hover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Achievements Section - Carousel */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="inline-block mb-4"
            >
              <Trophy className="text-yellow-400 w-16 h-16 mx-auto filter drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" />
            </motion.div>
            <h3 className="font-russo text-4xl md:text-5xl font-bold gradient-text mb-4">
              Latest Achievements & Wins
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Celebrating our recent victories and milestones in robotics competitions
            </p>
          </motion.div>

          {/* Achievement Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphismCard className="p-6 md:p-8">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Image Section */}
                <motion.div 
                  key={`image-${currentAchievement}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-80 lg:h-96 rounded-xl overflow-hidden group"
                >
                  <img
                    src={latestAchievements[currentAchievement].image}
                    alt={latestAchievements[currentAchievement].title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Floating Icon */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute top-4 right-4 z-20"
                  >
                    {(() => {
                      const Icon = latestAchievements[currentAchievement].icon;
                      return (
                        <div className={`p-4 rounded-full bg-gradient-to-br ${latestAchievements[currentAchievement].gradient} shadow-2xl border-2 border-white/30`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      );
                    })()}
                  </motion.div>
                </motion.div>
                
                {/* Content Section */}
                <motion.div
                  key={`content-${currentAchievement}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className={`bg-gradient-to-r ${latestAchievements[currentAchievement].gradient} text-white border-0 px-4 py-1`}>
                      {latestAchievements[currentAchievement].date}
                    </Badge>
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity 
                      }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    </motion.div>
                  </div>
                  
                  <h4 className="font-orbitron text-2xl md:text-3xl font-bold mb-3 text-white">
                    {latestAchievements[currentAchievement].title}
                  </h4>
                  
                  <p className={`text-lg md:text-xl font-semibold mb-4 bg-gradient-to-r ${latestAchievements[currentAchievement].gradient} bg-clip-text text-transparent`}>
                    🏆 {latestAchievements[currentAchievement].subtitle}
                  </p>
                  
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                    {latestAchievements[currentAchievement].description}
                  </p>
                </motion.div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-700">
                <Button
                  onClick={prevAchievement}
                  variant="ghost"
                  size="lg"
                  className="text-[hsl(235,85%,65%)] hover:text-white hover:bg-[hsl(235,85%,65%)]/20"
                >
                  <ChevronLeft size={24} className="mr-1" />
                  Previous
                </Button>
                
                {/* Dot Indicators */}
                <div className="flex space-x-2">
                  {latestAchievements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAchievement(index)}
                      className={`transition-all rounded-full ${
                        index === currentAchievement
                          ? "w-8 h-3 bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)]"
                          : "w-3 h-3 bg-gray-500 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to achievement ${index + 1}`}
                    />
                  ))}
                </div>
                
                <Button
                  onClick={nextAchievement}
                  variant="ghost"
                  size="lg"
                  className="text-[hsl(235,85%,65%)] hover:text-white hover:bg-[hsl(235,85%,65%)]/20"
                >
                  Next
                  <ChevronRight size={24} className="ml-1" />
                </Button>
              </div>
            </GlassmorphismCard>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-russo text-4xl font-bold text-center mb-16 gradient-text"
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
                  <div className={`bg-gradient-to-br ${project.gradient} rounded-lg p-2 mb-4 overflow-hidden`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="font-orbitron text-xl font-bold mb-3 text-[hsl(180,100%,50%)] neon-text">
                    {project.title}
                  </h4>
                  <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="bg-[hsl(235,75%,65%,0.2)] text-[hsl(235,75%,65%)]">
                      {project.category}
                    </Badge>
                    <Link href="/projects">
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="text-[hsl(220,70%,55%)] hover:text-white p-0"
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
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
            className="font-russo text-4xl font-bold text-center mb-16 gradient-text"
          >
            Meet Our Core Team
          </motion.h3>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 max-w-5xl">
              {coreTeam.slice(0, 4).map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <GlassmorphismCard className="text-center h-full flex flex-col justify-between">
                    <div>
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-24 h-24 rounded-full mx-auto mb-4 border-2 object-cover ${member.borderColor}`}
                      />
                      <h4 className="font-russo text-lg mb-2 text-[hsl(150,45%,60%)] neon-text">
                        {member.name}
                      </h4>
                      <p className="text-[hsl(235,75%,65%)] text-sm mb-2">{member.position}</p>
                      <p className="text-gray-400 text-xs">{member.specialization}</p>
                    </div>
                  </GlassmorphismCard>
                </motion.div>
              ))}
              
              
            </div>
          </div>
          <div className="text-center">
            <Link href="/team">
              <Button
                variant="outline"
                size="lg"
                className="border-[hsl(235,75%,65%)] text-[hsl(235,75%,65%)] hover:bg-[hsl(235,75%,65%)] hover:text-white transition-all"
                onClick={() => window.scrollTo(0, 0)}
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
