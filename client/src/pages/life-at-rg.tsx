import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Zap, 
  Images, 
  Trophy, 
  MapPin, 
  Users, 
  Calendar,
  Star,
  ChevronLeft, 
  ChevronRight,
  Award,
  Target,
  Lightbulb
} from "lucide-react";

const heroImage = "https://fcggshuizjjpdmkshfkx.supabase.co/storage/v1/object/public/images//rglab1.jpg";

const achievements = [
  { number: "50+", label: "Epic Projects" },
  { number: "200+", label: "Amazing Members" },
  { number: "15+", label: "Prestigious Awards" },
  { number: "12", label: "Years of Excellence" },
];

const moments = [
  {
    id: "1",
    title: "National Robotics Championship Victory",
    year: "2024",
    location: "Mumbai Tech Arena",
    category: "Achievement",
    attendees: "2000+",
    description: "Our team dominated the autonomous navigation challenge, showcasing months of dedication and innovation.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badges: ["First Place", "Best Innovation", "Team Spirit Award"]
  },
  {
    id: "2",
    title: "Tech Fest Innovation Showcase",
    year: "2023",
    location: "IIT Delhi",
    category: "Innovation",
    attendees: "5000+",
    description: "Unveiled our AI-powered companion robot that stole the hearts of everyone at the festival.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badges: ["Best Innovation", "People's Choice", "Industry Recognition"]
  },
  {
    id: "3",
    title: "Community Impact Initiative",
    year: "2022",
    location: "15 Schools",
    category: "Community",
    attendees: "500+ Students",
    description: "Reached out to rural schools, inspiring the next generation with hands-on robotics workshops.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badges: ["500+ Students Taught", "15 Schools Visited", "Local Media Coverage"]
  },
  {
    id: "4",
    title: "Research Breakthrough",
    year: "2021",
    location: "Online Publication",
    category: "Research",
    attendees: "Global Reach",
    description: "Published groundbreaking research on swarm robotics in international journal.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badges: ["International Publication", "Citation Impact", "Industry Collaboration"]
  }
];

const activitiesData = [
  {
    src: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Hands-on workshop session with students learning",
    title: "Workshop Sessions"
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Tech talk presentation with industry expert",
    title: "Tech Talks"
  },
  {
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Hackathon in progress with teams working intensively",
    title: "Hackathons"
  },
  {
    src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Competition day with participants presenting projects",
    title: "Competitions"
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Project demonstration and showcase event",
    title: "Project Demos"
  },
  {
    src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    alt: "Team building activity with collaborative challenges",
    title: "Team Building"
  }
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    alt: "Group photo of tech society members"
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    alt: "Robotic arm demonstration in modern lab"
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    alt: "Coding workspace with multiple screens"
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    alt: "State-of-the-art laboratory environment"
  },
  {
    src: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    alt: "Electronics setup with sensors and microcontrollers"
  },
  {
    src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    alt: "Award ceremony with trophies and certificates"
  },
  {
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    alt: "Development setup with latest technology"
  },
  {
    src: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300",
    alt: "Group discussion and knowledge sharing"
  }
];

const categories = [
  { id: "moments", label: "Moments", icon: Heart, color: "text-[hsl(235,85%,65%)]" },
  { id: "activities", label: "Activities", icon: Zap, color: "text-[hsl(275,85%,70%)]" },
  { id: "gallery", label: "Gallery", icon: Images, color: "text-[hsl(150,70%,55%)]" }
];

export default function LifeAtRG() {
  const [activeCategory, setActiveCategory] = useState("moments");
  const [currentMoment, setCurrentMoment] = useState(0);

  const nextMoment = () => {
    setCurrentMoment((prev) => (prev + 1) % moments.length);
  };

  const prevMoment = () => {
    setCurrentMoment((prev) => (prev - 1 + moments.length) % moments.length);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="relative mb-8">
            <motion.img
              src={heroImage}
              alt="RoboGyan Life"
              className="w-full h-96 object-cover rounded-2xl"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 text-left px-4">
              <h1 className="font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-white">
                Life at RoboGyan
              </h1>
              <p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-2xl">
                Where innovation meets passion, and dreams become reality. Join us on an incredible journey of robotics, friendship, and endless possibilities! 🚀
              </p>
            </div>
          </div>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12 px-4"
        >
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 bg-[hsl(0,0%,16%)] rounded-2xl p-2 w-full sm:w-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all flex items-center justify-center space-x-2 text-sm sm:text-base ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white"
                      : "text-gray-300 hover:bg-[hsl(0,0%,20%)]"
                  }`}
                >
                  <Icon size={18} className={activeCategory === category.id ? "" : category.color} />
                  <span>{category.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Content Based on Active Category */}
        <AnimatePresence mode="wait">
          {activeCategory === "moments" && (
            <motion.div
              key="moments"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-orbitron text-3xl font-bold text-center mb-12 gradient-text">
                Unforgettable Moments
              </h2>
              
              {/* Moment Showcase */}
              <div className="relative mb-16">
                <GlassmorphismCard className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <motion.img
                        key={currentMoment}
                        src={moments[currentMoment].image}
                        alt={moments[currentMoment].title}
                        className="w-full h-80 object-cover rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white">
                          {moments[currentMoment].year}
                        </Badge>
                        <Badge variant="outline" className="text-[hsl(235,85%,65%)] border-[hsl(235,85%,65%)]">
                          {moments[currentMoment].category}
                        </Badge>
                      </div>
                      
                      <h3 className="font-orbitron text-2xl font-bold mb-4 gradient-text">
                        {moments[currentMoment].title}
                      </h3>
                      
                      <div className="flex items-center space-x-4 mb-4 text-sm text-gray-300">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{moments[currentMoment].location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users size={14} />
                          <span>{moments[currentMoment].attendees}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6">
                        {moments[currentMoment].description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {moments[currentMoment].badges.map((badge, index) => (
                          <Badge key={index} variant="secondary" className="bg-[hsl(235,85%,65%,0.2)] text-[hsl(235,85%,65%)]">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-8">
                    <Button
                      onClick={prevMoment}
                      variant="ghost"
                      size="sm"
                      className="text-[hsl(235,85%,65%)] hover:text-white"
                    >
                      <ChevronLeft size={20} className="mr-1" />
                      Previous
                    </Button>
                    
                    <div className="flex space-x-2">
                      {moments.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentMoment(index)}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === currentMoment
                              ? "bg-[hsl(235,85%,65%)]"
                              : "bg-gray-500 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <Button
                      onClick={nextMoment}
                      variant="ghost"
                      size="sm"
                      className="text-[hsl(235,85%,65%)] hover:text-white"
                    >
                      Next
                      <ChevronRight size={20} className="ml-1" />
                    </Button>
                  </div>
                </GlassmorphismCard>
              </div>
            </motion.div>
          )}

          {activeCategory === "activities" && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-orbitron text-3xl font-bold text-center mb-12 gradient-text">
                Our Activities
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {activitiesData.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="card-hover cursor-pointer"
                  >
                    <GlassmorphismCard className="p-6">
                      <img
                        src={activity.src}
                        alt={activity.alt}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                      <h3 className="font-orbitron text-lg font-bold text-center gradient-text">
                        {activity.title}
                      </h3>
                    </GlassmorphismCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeCategory === "gallery" && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="font-orbitron text-3xl font-bold text-center mb-12 gradient-text">
                Gallery
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                {galleryImages.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="card-hover cursor-pointer"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="my-20"
        >
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <GlassmorphismCard className="text-center p-8">
                  <div className="font-orbitron text-4xl font-bold mb-2 gradient-text">
                    {achievement.number}
                  </div>
                  <div className="text-gray-300">{achievement.label}</div>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <GlassmorphismCard hover={false} className="p-12">
            <h3 className="font-orbitron text-4xl font-bold mb-6 gradient-text">
              Ready to Join the Adventure?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Be part of our incredible journey. Create memories, build robots, and shape the future with us!
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[hsl(0,0%,16%)] rounded-lg p-6"
              >
                <Lightbulb className="text-3xl text-[hsl(235,85%,65%)] mb-4 mx-auto" size={48} />
                <h4 className="font-orbitron text-lg font-bold mb-2 text-white">
                  Learn & Grow
                </h4>
                <p className="text-gray-400 text-sm">Develop cutting-edge technical skills with hands-on projects</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[hsl(0,0%,16%)] rounded-lg p-6"
              >
                <Users className="text-3xl text-[hsl(275,85%,70%)] mb-4 mx-auto" size={48} />
                <h4 className="font-orbitron text-lg font-bold mb-2 text-white">
                  Network
                </h4>
                <p className="text-gray-400 text-sm">Connect with industry professionals and like-minded peers</p>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-[hsl(0,0%,16%)] rounded-lg p-6"
              >
                <Trophy className="text-3xl text-[hsl(150,70%,55%)] mb-4 mx-auto" size={48} />
                <h4 className="font-orbitron text-lg font-bold mb-2 text-white">
                  Achieve
                </h4>
                <p className="text-gray-400 text-sm">Win competitions and build an impressive portfolio</p>
              </motion.div>
            </div>
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white hover:scale-105 transition-transform font-semibold px-8 py-4 text-lg"
            >
              Join RoboGyan Now
            </Button>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
}