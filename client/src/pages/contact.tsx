import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Youtube,
  MessageSquare,
  Send,
  Clock,
  Building,
} from "lucide-react";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "robogyan.contact@gmail.com",
    color: "text-[hsl(235,75%,65%)]",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp Group",
    value: "Join our community chat",
    color: "text-[hsl(150,45%,60%)]",
    link: "https://chat.whatsapp.com/GP8hZUbEV8G2b3jb0uIBWY?mode=r_c",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Basement, 5th Block Dr. Akhilesh Das Gupta Institute of Professional Studies Shastri Park, Delhi-110053",
    color: "text-[hsl(275,75%,70%)]",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    color: "text-[hsl(275,75%,70%)]",
    href: "https://www.instagram.com/robogyan",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    color: "text-[hsl(220,70%,55%)]",
    href: "https://www.linkedin.com/company/robogyan/posts/?feedView=all",
  },
  {
    icon: Github,
    label: "GitHub",
    color: "text-[hsl(235,75%,65%)]",
    href: "https://github.com/robogyan-adgitm",
  },
  {
    icon: Youtube,
    label: "YouTube",
    color: "text-red-500",
    href: "https://www.youtube.com/@robogyan_official",
  },
  
];



export default function Contact() {

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-russo text-5xl mb-8 text-[hsl(150,45%,60%)] neon-text">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Curiosity isn't a weakness - it's the first step to understanding. Those who never ask remain in the dark.
          </p>
        </motion.div>

        <div className="mb-16">
          {/* Contact Information - Full Width */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Contact Details and Social Links in a row - 50/50 split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contact Details */}
              <GlassmorphismCard>
                <h3 className="font-russo text-xl md:text-2xl font-bold mb-6 text-[hsl(150,45%,60%)]">
                  Get in Touch
                </h3>
                <div className="space-y-4 md:space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-start space-x-3 md:space-x-4"
                      >
                        <Icon className={`${info.color} text-lg md:text-xl mt-1 flex-shrink-0`} size={20} />
                        <div className="min-w-0 flex-1">
                          <p className="text-white font-semibold mb-1 text-sm md:text-base">{info.label}</p>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-gray-300 hover:text-[hsl(235,75%,65%)] transition-colors text-xs md:text-sm break-words"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-gray-300 whitespace-pre-line text-xs md:text-sm break-words">{info.value}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </GlassmorphismCard>
              
              {/* Social Links */}
              <GlassmorphismCard>
                <h3 className="font-russo text-xl md:text-2xl font-bold mb-6 text-[hsl(150,45%,60%)]">
                  Follow Us
                </h3>
                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="flex items-center space-x-3 bg-[hsl(0,0%,16%)] rounded-lg p-3 md:p-4 hover:bg-[hsl(0,0%,20%)] transition-all group"
                      >
                        <Icon className={`${social.color} group-hover:text-white transition-colors flex-shrink-0`} size={20} />
                        <span className="text-white font-medium text-sm md:text-base">{social.label}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </GlassmorphismCard>
            </div>
          </motion.div>
        </div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <GlassmorphismCard hover={false} className="p-4 md:p-8">
            <h3 className="font-russo text-2xl md:text-3xl font-bold mb-4 md:mb-6 gradient-text">
              Find Us on Campus
            </h3>
            <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
              Visit us at our lab located in the engineering campus.
            </p>
            
            <div className="bg-[hsl(0,0%,16%)] rounded-lg h-80 md:h-[28rem] flex items-center justify-center border border-gray-700 relative overflow-hidden">
              {/* Embedded Google Map with ADGIPS location */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109.33549765419648!2d77.26041925!3d28.6778227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd4c405859e3%3A0x49d11941d9dcf968!2sRobogyan!5e1!3m2!1sen!2sin!4v1691234567890!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Robogyan Lab - Official Location"
                className="absolute inset-0"
              ></iframe>
              
              {/* Lab info overlay */}
              <div className="absolute top-4 left-4 bg-black/90 backdrop-blur-sm rounded-lg p-3 text-left border border-[hsl(235,75%,65%)]/30">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="text-[hsl(235,75%,65%)] flex-shrink-0" size={18} />
                  <h5 className="font-russo text-sm font-bold text-white">Robogyan Lab</h5>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Basement, Block-5<br />
                  ADGIPS, Shastri Park<br />
                  Delhi-110053
                </p>
              </div>
              
              {/* Direction button overlay */}
              <div className="absolute bottom-4 right-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[hsl(235,75%,65%)] text-[hsl(235,75%,65%)] hover:bg-[hsl(235,75%,65%)] hover:text-white transition-all text-xs bg-black/90 backdrop-blur-sm"
                  onClick={() => window.open('https://www.google.com/maps/place/Robogyan/@28.6778227,77.2606192,20z/data=!4m6!3m5!1s0x390cfd4c405859e3:0x49d11941d9dcf968!8m2!3d28.6779389!4d77.2606176!16s%2Fg%2F11fkth91dr', '_blank')}
                >
                  <Building className="mr-1" size={12} />
                  Get Directions
                </Button>
              </div>
              
              {/* Fallback for when map doesn't load */}
              <div className="absolute inset-0 bg-[hsl(0,0%,16%)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <div className="text-center px-4 pointer-events-auto">
                  <MapPin className="text-[hsl(235,75%,65%)] mb-2 mx-auto" size={32} />
                  <p className="text-xs text-gray-400">
                    Interactive map loading...
                  </p>
                </div>
              </div>
            </div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
}
