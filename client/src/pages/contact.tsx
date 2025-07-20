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
    value: "robogyan@college.edu",
    color: "text-[hsl(235,75%,65%)]",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    color: "text-[hsl(220,70%,55%)]",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp Group",
    value: "Join our community chat",
    color: "text-[hsl(150,45%,60%)]",
    link: "#",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "Engineering College Campus\nTech Park, Innovation District\nCity, State - 123456",
    color: "text-[hsl(275,75%,70%)]",
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    color: "text-[hsl(275,75%,70%)]",
    href: "#",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    color: "text-[hsl(220,70%,55%)]",
    href: "#",
  },
  {
    icon: Github,
    label: "GitHub",
    color: "text-[hsl(235,75%,65%)]",
    href: "#",
  },
  {
    icon: Twitter,
    label: "Twitter",
    color: "text-[hsl(150,45%,60%)]",
    href: "#",
  },
  {
    icon: Youtube,
    label: "YouTube",
    color: "text-red-500",
    href: "#",
  },
  {
    icon: MessageSquare,
    label: "Discord",
    color: "text-[hsl(275,75%,70%)]",
    href: "#",
  },
];

const officeHours = [
  { day: "Monday - Friday", time: "9:00 AM - 6:00 PM" },
  { day: "Saturday", time: "10:00 AM - 4:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent Successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-orbitron text-5xl font-bold mb-8 gradient-text">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to join our tech revolution? Get in touch with us and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <GlassmorphismCard>
              <h3 className="font-orbitron text-2xl font-bold mb-6 text-[hsl(150,45%,60%)]">
                Get in Touch
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <Icon className={`${info.color} text-xl mt-1`} size={24} />
                      <div>
                        <p className="text-white font-semibold mb-1">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-gray-300 hover:text-[hsl(235,75%,65%)] transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-gray-300 whitespace-pre-line">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </GlassmorphismCard>

            {/* Office Hours */}
            <GlassmorphismCard>
              <h3 className="font-orbitron text-2xl font-bold mb-6 text-[hsl(150,45%,60%)]">
                Office Hours
              </h3>
              <div className="space-y-3">
                {officeHours.map((hours, index) => (
                  <motion.div
                    key={hours.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="text-[hsl(235,75%,65%)]" size={18} />
                      <span className="text-white font-medium">{hours.day}</span>
                    </div>
                    <span className="text-gray-300">{hours.time}</span>
                  </motion.div>
                ))}
              </div>
            </GlassmorphismCard>

            {/* Social Links */}
            <GlassmorphismCard>
              <h3 className="font-orbitron text-2xl font-bold mb-6 text-[hsl(150,45%,60%)]">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
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
                      className="flex items-center space-x-3 bg-[hsl(0,0%,16%)] rounded-lg p-4 hover:bg-[hsl(0,0%,20%)] transition-all group"
                    >
                      <Icon className={`${social.color} group-hover:text-white transition-colors`} size={24} />
                      <span className="text-white font-medium">{social.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </GlassmorphismCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassmorphismCard className="p-8">
              <h3 className="font-orbitron text-2xl font-bold mb-6 text-[hsl(150,45%,60%)]">
                Send us a Message
              </h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">First Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your first name"
                              className="bg-[hsl(0,0%,16%)] border-gray-600 text-white focus:border-[hsl(235,75%,65%)] focus:ring-[hsl(235,75%,65%)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your last name"
                              className="bg-[hsl(0,0%,16%)] border-gray-600 text-white focus:border-[hsl(235,75%,65%)] focus:ring-[hsl(235,75%,65%)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email address"
                            className="bg-[hsl(0,0%,16%)] border-gray-600 text-white focus:border-[hsl(235,75%,65%)] focus:ring-[hsl(235,75%,65%)]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subject */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-[hsl(0,0%,16%)] border-gray-600 text-white focus:border-[hsl(235,75%,65%)] focus:ring-[hsl(235,75%,65%)]">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-[hsl(0,0%,16%)] border-gray-600">
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="join">Join Our Team</SelectItem>
                            <SelectItem value="collaboration">Project Collaboration</SelectItem>
                            <SelectItem value="partnership">Event Partnership</SelectItem>
                            <SelectItem value="mentorship">Mentorship</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            placeholder="Tell us about your inquiry..."
                            className="bg-[hsl(0,0%,16%)] border-gray-600 text-white focus:border-[hsl(235,75%,65%)] focus:ring-[hsl(235,75%,65%)] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[hsl(235,75%,65%)] to-[hsl(220,70%,55%)] text-white hover:scale-105 transition-transform font-semibold py-4 text-lg"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-[hsl(0,0%,4%)] border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send size={20} className="mr-2" />
                    )}
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </GlassmorphismCard>
          </motion.div>
        </div>

        {/* Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <GlassmorphismCard hover={false} className="p-8">
            <h3 className="font-orbitron text-3xl font-bold mb-6 gradient-text">
              Find Us on Campus
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Visit us at our innovation lab located in the heart of the engineering campus.
            </p>
            
            <div className="bg-[hsl(0,0%,16%)] rounded-lg h-96 flex items-center justify-center border border-gray-700 relative overflow-hidden">
              {/* Placeholder for interactive map */}
              <div className="text-center">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="text-6xl text-[hsl(235,75%,65%)] mb-4 mx-auto" size={96} />
                </motion.div>
                <h4 className="font-orbitron text-xl font-bold text-white mb-2">
                  Interactive Campus Map
                </h4>
                <p className="text-gray-300 mb-4">
                  Tech Building, Room 205<br />
                  Engineering College Campus
                </p>
                <Button
                  variant="outline"
                  className="border-[hsl(235,75%,65%)] text-[hsl(235,75%,65%)] hover:bg-[hsl(235,75%,65%)] hover:text-white transition-all"
                >
                  <Building className="mr-2" size={16} />
                  Open in Google Maps
                </Button>
              </div>
              
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 h-full">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className="border border-[hsl(235,75%,65%)]" />
                  ))}
                </div>
              </div>
            </div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
}
