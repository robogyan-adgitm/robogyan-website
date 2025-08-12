import { motion } from "framer-motion";
import { projects } from "@/data/projects-data";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar, Clock, Code, ExternalLink, FileText, Github, Lightbulb, Rocket, Users } from "lucide-react";

const statusColors = {
  Active: "bg-[hsl(150,100%,50%,0.2)] text-[hsl(150,100%,50%)]",
  Completed: "bg-[hsl(180,100%,50%,0.2)] text-[hsl(180,100%,50%)]",
  Development: "bg-[hsl(270,100%,70%,0.2)] text-[hsl(270,100%,70%)]",
  Research: "bg-[hsl(220,100%,50%,0.2)] text-[hsl(220,100%,50%)]",
  Beta: "bg-[hsl(60,100%,50%,0.2)] text-[hsl(60,100%,50%)]",
};

const categoryIcons = {
  Hardware: "⚡",
  Software: "💻", 
  Mixed: "🔧",
  "AI/ML": "🧠",
  Robotics: "🤖",
  IoT: "📡",
};

// Helper component for action buttons with alert dialog
const ActionButton = ({ url, icon: Icon, label, color }: {
  url?: string;
  icon: any;
  label: string;
  color: string;
}) => {
  const isAvailable = url && url !== "" && url !== "#";
  
  if (isAvailable) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={`${color} hover:text-white p-0`}
        onClick={() => window.open(url, '_blank')}
      >
        <Icon size={16} className="mr-1" />
        {label}
      </Button>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`${color} hover:text-white p-0`}
        >
          <Icon size={16} className="mr-1" />
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[hsl(0,0%,8%)] border-[hsl(0,0%,20%)]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white font-orbitron">
            Currently Not Available
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400">
            This {label.toLowerCase()} is not available at the moment. Please check back later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white hover:scale-105 transition-transform">
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default function Projects() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-russo text-5xl mb-8 text-[hsl(180,100%,50%)] neon-text">
            Our Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our innovative projects that push the boundaries of technology and create real-world impact.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassmorphismCard>
                {/* Project Image */}
                <motion.img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Project Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{categoryIcons[project.category]}</span>
                    <Badge variant="secondary" className={statusColors[project.status]}>
                      {project.status}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="text-[hsl(180,100%,50%)] border-[hsl(180,100%,50%)]">
                    {project.category}
                  </Badge>
                </div>

                <h3 className="font-orbitron text-xl font-bold gradient-text">
                  {project.name}
                </h3>

                {/* Project Timeline */}
                <div className="flex items-center justify-between mb-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Calendar size={14} />
                    <span>{project.startDate}</span>
                    {project.endDate && <span>- {project.endDate}</span>}
                  </div>
                </div>
                <br />

                {/* Tech Stack */}
                <div className="mb-4">
                  <p className="text-xs text-gray-400 mb-2">Tech Stack:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-[hsl(0,0%,16%)] text-[hsl(180,100%,50%)] text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-start">
                  {project.docsUrl !== undefined && (
                    <ActionButton
                      url={project.docsUrl}
                      icon={FileText}
                      label="Docs"
                      color="text-[hsl(270,100%,70%)]"
                    />
                  )}
                </div>
              </GlassmorphismCard>
            </motion.div>
          ))}

          {/* More Projects Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: projects.length * 0.1 }}
          >
            <GlassmorphismCard className="text-center flex flex-col justify-center items-center h-full min-h-[400px]">
              {/* Coming Soon Icon */}
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="mb-6"
              >
                <Rocket size={64} className="text-[hsl(180,100%,50%)] mx-auto" />
              </motion.div>

              <h3 className="font-orbitron text-2xl font-bold gradient-text mb-4">
                More Projects Coming Soon
              </h3>

              <p className="text-gray-300 mb-6 max-w-sm leading-relaxed">
                We're constantly innovating and working on exciting new projects. Stay tuned for more cutting-edge developments!
              </p>

              {/* Animated badges */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="secondary" className="bg-[hsl(180,100%,50%,0.2)] text-[hsl(180,100%,50%)]">
                  <Lightbulb size={12} className="mr-1" />
                  Innovation
                </Badge>
                <Badge variant="secondary" className="bg-[hsl(270,100%,70%,0.2)] text-[hsl(270,100%,70%)]">
                  <Code size={12} className="mr-1" />
                  Development
                </Badge>
                <Badge variant="secondary" className="bg-[hsl(150,100%,50%,0.2)] text-[hsl(150,100%,50%)]">
                  <Users size={12} className="mr-1" />
                  Collaboration
                </Badge>
              </div>
            </GlassmorphismCard>
          </motion.div>
        </div>      
      </div>
    </div>
  );
}
