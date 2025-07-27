import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team" },
  { label: "Projects", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Alumni", href: "/alumni" },
  { label: "Life at RG", href: "/life-at-rg" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Change navbar opacity when scrolled more than 100px
      setScrolled(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    // Scroll to top when navigating
    if (href === "/team") {
      window.scrollTo(0, 0); // Instant scroll for team page
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // Smooth scroll for others
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "glassmorphism" 
          : "bg-black/30 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavClick("/")}
            className="font-russo text-3xl font-bold gradient-text cursor-pointer"
          >
            ROBOGYAN
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => handleNavClick(item.href)}
                className={`nav-item cursor-pointer transition-colors ${
                  location === item.href
                    ? "text-[hsl(235,85%,65%)] active"
                    : "text-white hover:text-[hsl(235,85%,65%)]"
                }`}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:text-[hsl(235,85%,65%)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden glassmorphism mt-2 mx-4 rounded-lg p-4"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 10 }}
                onClick={() => {
                  setIsOpen(false);
                  handleNavClick(item.href);
                }}
                className={`block py-2 cursor-pointer transition-colors ${
                  location === item.href
                    ? "text-[hsl(235,85%,65%)]"
                    : "text-white hover:text-[hsl(235,85%,65%)]"
                }`}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
