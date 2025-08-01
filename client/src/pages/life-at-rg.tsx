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

const heroImage = "/src/data/images/rglab2.jpg";

const achievements = [
  { number: "30+", label: "Amazing Members" },
  { number: "50+", label: "Innovative Projects" },
  { number: "100+", label: "Prestigious Awards" },
  { number: "14", label: "Years of Excellence and Counting..." },
];

const moments = [
  {
    id: "1",
    title: "Smart India Hackathon 2024",
    year: "2024",
    location: "ADGIPS",
    category: "SIH2024",
    attendees: "300+",
    description: "Robogyan conducted the SIH2024 Internal round with over 300 participants.",
    image: "/src/data/images/lifeatrg/sih24.jpg",
    badges: []
  },
  {
    id: "2",
    title: "HackBMU 6.0 Hackathon",
    year: "2024",
    location: "BML Munjal University, Haryana",
    attendees: "500+",
    category: "Hackhathon",
    description: "Achieved 2nd position at HackBMU 6.0 along with a cash prize",
    image: "/src/data/images/lifeatrg/HackBMU.png",
    badges: ["2nd Runner Up"]
  },
  {
    id: "3",
    title: "RG Farewell 2025 Batch",
    year: "2025",
    location: "Robogyan Lab, Block 5",
    category: "Lab Event",
    description: "Robogyan conducted farewell for the 2025 Batch, in presence of some esteemed alumni.",
    image: "/src/data/images/lifeatrg/Farewell2025.jpg" ,
    badges: []
  },
  {
    id: "4",
    title: "Techkriti 2025 at IIT Kanpur",
    year: "2025",
    location: "IIT Kanpur",
    category: "Competition",
    description: " Robogyan dominated yet again at Techkriti @IITKanpur, winning 1st and 2nd positions at 'Galactic Dodger' and 2nd position at 'Capture the Flag'. ",
    image: "/src/data/images/lifeatrg/Techkriti.jpg" ,
    badges: ["Multiple Positions"]
  }
];

const activitiesData = [
  {
    src: "/src/data/images/lifeatrg/workshops.jpg",
    alt: "Hands-on workshop session with students learning",
    title: "Workshop Sessions"
  },
  {
    src: "/src/data/images/lifeatrg/techtalks.jpg" ,
    alt: "Tech talk presentation with industry expert",
    title: "Tech Talks"
  },
  {
    src: "/src/data/images/lifeatrg/hackathons.jpg" ,
    alt: "Hackathon in progress with teams working intensively",
    title: "Hackathons"
  },
  {
    src: "/src/data/images/lifeatrg/competition.jpg" ,
    alt: "Competition day with participants presenting projects",
    title: "Competitions"
  },
  {
    src: "/src/data/images/lifeatrg/demos.jpg" ,
    alt: "Project demonstration and showcase event",
    title: "Project Demos"
  },
  {
    src: "/src/data/images/lifeatrg/teambuilding.jpg" ,
    alt: "Team building activity with collaborative challenges",
    title: "Team Building"
  }
];

const galleryImages = [
  { src: "/src/data/images/lifeatrg/1.jpg" },
  { src: "/src/data/images/lifeatrg/2.jpg" },
  { src: "/src/data/images/lifeatrg/3.jpg" },
  { src: "/src/data/images/lifeatrg/4.jpg" },
  { src: "/src/data/images/lifeatrg/5.jpg" },
  { src: "/src/data/images/lifeatrg/6.jpg" },
  { src: "/src/data/images/lifeatrg/7.jpg" },
  { src: "/src/data/images/lifeatrg/8.jpg" }
];

const categories = [
  { id: "moments", label: "Moments", icon: Heart, color: "text-[hsl(235,85%,65%)]" },
  { id: "activities", label: "Activities", icon: Zap, color: "text-[hsl(275,85%,70%)]" },
  { id: "gallery", label: "Gallery", icon: Images, color: "text-[hsl(150,70%,55%)]" }
];

export default function LifeAtRG() {
  const [activeCategory, setActiveCategory] = useState("moments");
  const [currentMoment, setCurrentMoment] = useState(0);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const handleImageLoad = (imageSrc: string) => {
    setImageLoading(prev => ({ ...prev, [imageSrc]: false }));
  };

  const handleImageLoadStart = (imageSrc: string) => {
    setImageLoading(prev => ({ ...prev, [imageSrc]: true }));
  };

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
            {imageLoading[heroImage] && (
              <div className="w-full h-96 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[hsl(235,85%,65%)]"></div>
              </div>
            )}
            <motion.img
              src={heroImage}
              alt="RoboGyan Life"
              className="w-full h-96 object-cover rounded-2xl"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              loading="eager"
              onLoadStart={() => handleImageLoadStart(heroImage)}
              onLoad={() => handleImageLoad(heroImage)}
              onError={() => handleImageLoad(heroImage)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 text-left px-4">
              <h1 className="font-russo text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-white">
                Life at Robogyan
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
              <h2 className="font-russo text-3xl text-center mb-12 gradient-text">
                Unforgettable Moments
              </h2>
              
              {/* Moment Showcase */}
              <div className="relative mb-16">
                <GlassmorphismCard className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      {imageLoading[moments[currentMoment].image] && (
                        <div className="w-full h-80 bg-gray-800 rounded-xl flex items-center justify-center mb-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(235,85%,65%)]"></div>
                        </div>
                      )}
                      <motion.img
                        key={currentMoment}
                        src={moments[currentMoment].image}
                        alt={moments[currentMoment].title}
                        className="w-full h-80 object-cover rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                        onLoadStart={() => handleImageLoadStart(moments[currentMoment].image)}
                        onLoad={() => handleImageLoad(moments[currentMoment].image)}
                        onError={() => handleImageLoad(moments[currentMoment].image)}
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
              <h2 className="font-russo text-3xl text-center mb-12 gradient-text">
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
                      <div className="relative">
                        {imageLoading[activity.src] && (
                          <div className="absolute inset-0 bg-gray-800 rounded-xl flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(235,85%,65%)]"></div>
                          </div>
                        )}
                        <img
                          src={activity.src}
                          alt={activity.alt}
                          className="w-full h-48 object-cover rounded-xl mb-4"
                          loading="lazy"
                          onLoadStart={() => handleImageLoadStart(activity.src)}
                          onLoad={() => handleImageLoad(activity.src)}
                          onError={() => handleImageLoad(activity.src)}
                        />
                      </div>
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
              <h2 className="font-russo text-3xl text-center mb-12 gradient-text">
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
                    className="card-hover cursor-pointer relative"
                  >
                    {imageLoading[image.src] && (
                      <div className="absolute inset-0 bg-gray-800 rounded-xl flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(235,85%,65%)]"></div>
                      </div>
                    )}
                    <img
                      src={image.src}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl"
                      loading="lazy"
                      onLoadStart={() => handleImageLoadStart(image.src)}
                      onLoad={() => handleImageLoad(image.src)}
                      onError={() => handleImageLoad(image.src)}
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
              Want to Join the Adventure?
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
              onClick={() => {
                window.open('https://chat.whatsapp.com/GP8hZUbEV8G2b3jb0uIBWY?mode=r_c', '_blank');
              }}
            >
              Join Robogyan
            </Button>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
}