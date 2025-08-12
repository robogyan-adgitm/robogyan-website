import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Linkedin, Github, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "Team", href: "/team" },
    { label: "Projects", href: "/projects" },
    { label: "Events", href: "/events" },
  ];

  const resources = [
    { label: "Alumni", href: "/alumni" },
    { label: "Life at RG", href: "/life-at-rg" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/robogyan_official/", color: "text-[hsl(275,75%,70%)]" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/robogyan/", color: "text-[hsl(220,70%,55%)]" },
    { icon: Youtube, href: "https://www.youtube.com/@robogyan_official", color: "text-[hsl(0,80%,60%)]" },
  ];

  return (
    <footer className="bg-[hsl(0,0%,4%)] border-t border-gray-800 py-12 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-russo text-2xl font-bold gradient-text mb-4"
            >
              ROBOGYAN
            </motion.div>
            <p className="text-gray-400 mb-4">
              Experience Engineering!
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className={`${social.color} hover:text-white transition-colors`}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-lg font-bold mb-4 text-[hsl(180,100%,50%)] neon-text">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-[hsl(235,75%,65%)] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-orbitron text-lg font-bold mb-4 text-[hsl(180,100%,50%)] neon-text">
              Resources
            </h4>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link href={resource.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-[hsl(235,75%,65%)] transition-colors cursor-pointer"
                    >
                      {resource.label}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-orbitron text-lg font-bold mb-4 text-[hsl(180,100%,50%)] neon-text">
              Contact Info
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-[hsl(235,75%,65%)]" />
                <span>robogyan.contact@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="text-[hsl(150,45%,60%)] mt-0.5" />
                <span>
                  Basement, 5th Block
                  <br />
                  Dr. Akhilesh Das Gupta Institute of Professional Studies
                  <br />
                  Shastri Park, Delhi-110053
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Robogyan. All rights reserved. | Built with ❤️ by the Robogyan Team
          </p>
        </div>
      </div>
    </footer>
  );
}
