import { Link } from "wouter";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Linkedin, Github, Twitter } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Team", href: "/team" },
    { label: "Projects", href: "/projects" },
    { label: "Events", href: "/events" },
  ];

  const resources = [
    { label: "Alumni", href: "/alumni" },
    { label: "Life at RG", href: "/life-at-rg" },
    { label: "Contact", href: "/contact" },
    { label: "Documentation", href: "#" },
  ];

  const socialLinks = [
    { icon: Instagram, href: "#", color: "text-[hsl(275,75%,70%)]" },
    { icon: Linkedin, href: "#", color: "text-[hsl(220,70%,55%)]" },
    { icon: Github, href: "#", color: "text-[hsl(235,75%,65%)]" },
    { icon: Twitter, href: "#", color: "text-[hsl(150,45%,60%)]" },
  ];

  return (
    <footer className="bg-[hsl(0,0%,4%)] border-t border-gray-800 py-12 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-orbitron text-2xl font-bold gradient-text mb-4"
            >
              ROBOGYAN
            </motion.div>
            <p className="text-gray-400 mb-4">
              Innovating the future through technology, one project at a time.
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
            <h4 className="font-orbitron text-lg font-bold text-[hsl(150,45%,60%)] mb-4">
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
            <h4 className="font-orbitron text-lg font-bold text-[hsl(150,45%,60%)] mb-4">
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
            <h4 className="font-orbitron text-lg font-bold text-[hsl(150,45%,60%)] mb-4">
              Contact Info
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-[hsl(235,75%,65%)]" />
                <span>robogyan@college.edu</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-[hsl(220,70%,55%)]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-[hsl(150,45%,60%)]" />
                <span>Engineering College Campus</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Robogyan. All rights reserved. | Built with ❤️ by the Robogyan Team
          </p>
        </div>
      </div>
    </footer>
  );
}
