import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import ImageWithLoader from "@/components/ui/image-with-loader";
import {
  Trophy,
  Users,
  Award,
  Calendar,
  Clock,
  Sparkles,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  ExternalLink,
  HelpCircle,
  Laptop,
  Cpu,
  Bot,
  Sprout,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Car,
  Flame,
  GraduationCap,
  Coins,
  Landmark,
  Rocket,
  ArrowRight,
  Send,
  MessageSquare,
  Flame as FireIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  Layers,
  Presentation,
  Compass,
  Zap,
  Target,
  FileSpreadsheet,
  CalendarDays,
} from "lucide-react";
import {
  sihOverview,
  sihTimeline,
  sihThemes,
  sampleProblemStatements,
  pptSlideGuides,
  sihFAQs,
  sihWinnerStories,
  ProblemStatement,
} from "@/data/sih-data";

// Map theme icon string to Lucide component
const themeIconMap: Record<string, React.ElementType> = {
  Cpu,
  Bot,
  Sprout,
  HeartPulse,
  Leaf,
  ShieldCheck,
  Car,
  Flame,
  GraduationCap,
  Coins,
  Landmark,
  Rocket,
};

export default function SIHPage() {
  // State for Problem Statements Search & Filtering
  const [psSearch, setPsSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Software" | "Hardware">("All");
  const [selectedTheme, setSelectedTheme] = useState<string>("All");

  // State for Interactive Team Eligibility Validator
  const [teamSize, setTeamSize] = useState(4);
  const [femaleMembers, setFemaleMembers] = useState(0);
  const [isSameCollege, setIsSameCollege] = useState(false);
  const [isMultiYear, setIsMultiYear] = useState(false);

  // State for PPT Guide Active Slide
  const [activeSlide, setActiveSlide] = useState(1);

  // State for FAQ Filter & Expanded Items
  const [faqCategory, setFaqCategory] = useState<string>("All");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Filtered Problem Statements
  const filteredProblemStatements = useMemo(() => {
    return sampleProblemStatements.filter((ps) => {
      const matchesSearch =
        ps.title.toLowerCase().includes(psSearch.toLowerCase()) ||
        ps.organization.toLowerCase().includes(psSearch.toLowerCase()) ||
        ps.domain.toLowerCase().includes(psSearch.toLowerCase()) ||
        ps.psNumber.toLowerCase().includes(psSearch.toLowerCase()) ||
        ps.techStack.some((tech) => tech.toLowerCase().includes(psSearch.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || ps.category === selectedCategory;

      const matchesTheme =
        selectedTheme === "All" || ps.theme === selectedTheme;

      return matchesSearch && matchesCategory && matchesTheme;
    });
  }, [psSearch, selectedCategory, selectedTheme]);

  // Validation status for Team Checker
  const isTeamValid = teamSize === 6 && femaleMembers >= 1 && isSameCollege;

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    if (faqCategory === "All") return sihFAQs;
    return sihFAQs.filter((faq) => faq.category === faqCategory);
  }, [faqCategory]);

  // State for SIH Track Record Winner Stories Carousel
  const [currentWinnerStory, setCurrentWinnerStory] = useState(0);

  // Auto-advance winner story every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWinnerStory((prev) => (prev + 1) % sihWinnerStories.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const nextWinnerStory = () => {
    setCurrentWinnerStory((prev) => (prev + 1) % sihWinnerStories.length);
  };

  const prevWinnerStory = () => {
    setCurrentWinnerStory((prev) => (prev - 1 + sihWinnerStories.length) % sihWinnerStories.length);
  };

  // Smooth scroll handler with header offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-4 sm:px-6 lg:px-8 text-white relative">
      <div className="container mx-auto max-w-7xl">
        {/* ================= HERO SECTION ================= */}
        <section className="relative text-center py-12 md:py-20 mb-16 overflow-hidden">
          {/* Glowing Ambient Background Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[hsl(235,85%,65%,0.18)] to-[hsl(275,85%,70%,0.2)] rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism border border-[hsl(235,85%,65%,0.5)] mb-6 shadow-lg shadow-[hsl(235,85%,65%,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(150,100%,50%)] animate-ping" />
            <span className="text-sm font-semibold tracking-wide text-gray-200">
              Official College Internal Round
            </span>
            <span className="w-2 h-2 rounded-full bg-[hsl(150,100%,50%)] animate-ping" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-russo text-4xl sm:text-6xl md:text-7xl font-black mb-6 tracking-tight"
          >
            SMART INDIA <br className="hidden sm:inline" />
            <span className="gradient-text">HACKATHON 2026</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 font-inter leading-relaxed"
          >
            Your official gateway to the world's biggest innovation movement. Compete in the ADGIPS Internal Hackathon organized by <strong className="text-white font-semibold">ROBOGYAN</strong> to get nominated for the national stage!
          </motion.p>

          {/* Internal Hackathon Dates Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="my-10 sm:my-12 max-w-5xl mx-auto px-2 sm:px-4"
          >
            <div className="relative group p-[1px] rounded-3xl bg-gradient-to-r from-[hsl(235,85%,65%,0.6)] via-[hsl(275,85%,70%,0.6)] to-[hsl(150,100%,50%,0.6)] shadow-2xl shadow-[hsl(235,85%,65%,0.2)]">
              {/* Ambient Neon Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[hsl(235,85%,65%,0.3)] via-[hsl(275,85%,70%,0.3)] to-[hsl(150,100%,50%,0.3)] rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none" />

              <div className="relative rounded-3xl bg-black/90 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-10 overflow-hidden">
                {/* Subtle Background Lighting */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[hsl(275,85%,70%,0.1)] rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[hsl(235,85%,65%,0.1)] rounded-full blur-3xl pointer-events-none" />

                {/* Header Sub-bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[hsl(235,85%,65%,0.2)] text-cyan-400 border border-cyan-400/20 shadow-inner">
                      <CalendarDays size={20} />
                    </div>
                    <div>
                      <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-gray-200 font-orbitron block">
                        Internal Hackathon Dates Announced
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dates Dual Highlight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 items-stretch gap-4 sm:gap-6 my-4">
                  {/* Day 1: 11 September */}
                  <div className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[hsl(235,85%,65%,0.5)] transition-all flex flex-col items-center justify-center text-center shadow-lg group/card hover:bg-white/[0.06]">
                    <span className="text-xs sm:text-sm font-mono font-semibold text-cyan-400 tracking-wider uppercase mb-1.5 px-3 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                      Friday • Day 01
                    </span>
                    <div className="text-5xl sm:text-6xl md:text-7xl font-black font-orbitron tracking-tight bg-gradient-to-b from-white via-cyan-200 to-[hsl(235,85%,65%)] bg-clip-text text-transparent my-1">
                      11
                    </div>
                    <span className="text-sm sm:text-base font-bold font-inter tracking-widest text-gray-200 uppercase">
                      September
                    </span>
                  </div>

                  {/* Day 2: 12 September */}
                  <div className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[hsl(275,85%,70%,0.5)] transition-all flex flex-col items-center justify-center text-center shadow-lg group/card hover:bg-white/[0.06]">
                    <span className="text-xs sm:text-sm font-mono font-semibold text-[hsl(275,85%,70%)] tracking-wider uppercase mb-1.5 px-3 py-0.5 rounded-full bg-[hsl(275,85%,70%,0.1)] border border-[hsl(275,85%,70%,0.2)]">
                      Saturday • Day 02
                    </span>
                    <div className="text-5xl sm:text-6xl md:text-7xl font-black font-orbitron tracking-tight bg-gradient-to-b from-white via-purple-200 to-[hsl(275,85%,70%)] bg-clip-text text-transparent my-1">
                      12
                    </div>
                    <span className="text-sm sm:text-base font-bold font-inter tracking-widest text-gray-200 uppercase">
                      September
                    </span>
                  </div>
                </div>

                {/* Subtext Highlights */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-400 font-medium">
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[hsl(150,100%,50%)] animate-pulse" />
                    Offline Presentation &amp; Pitching
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    Live Jury Evaluation
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    Nomination for SIH 2026 Portal
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Quick CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14"
          >
            <a href={sihOverview.registrationUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] hover:opacity-95 text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-xl shadow-[hsl(235,85%,65%,0.3)] hover:scale-105 transition-all flex items-center gap-3"
              >
                <Zap size={20} className="text-yellow-300" />
                Register Your Team
              </Button>
            </a>

            <a href="#ppt-guide" onClick={(e) => scrollToSection(e, "ppt-guide")}>
              <Button
                size="lg"
                variant="outline"
                className="glassmorphism border-white/20 hover:border-[hsl(235,85%,65%)] text-white hover:text-white px-7 py-6 text-lg rounded-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <Presentation size={20} className="text-[hsl(275,85%,70%)]" />
                PPT Template & Guide
              </Button>
            </a>

            <a href={sihOverview.officialPSUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="glassmorphism border-white/20 hover:border-[hsl(150,45%,60%)] text-white hover:text-white px-7 py-6 text-lg rounded-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <Search size={20} className="text-[hsl(150,45%,60%)]" />
                Browse Problem Statements
              </Button>
            </a>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            <GlassmorphismCard className="text-center p-5 border border-white/10 hover:border-[hsl(235,85%,65%,0.4)] transition-all">
              <div className="text-3xl md:text-4xl font-black font-orbitron text-[hsl(150,100%,50%)] mb-1">
                {sihOverview.nominationQuota.split(" ")[0]}
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Teams to be Nominated to SIH Portal
              </div>
            </GlassmorphismCard>

            <GlassmorphismCard className="text-center p-5 border border-white/10 hover:border-[hsl(275,85%,70%,0.4)] transition-all">
              <div className="text-3xl md:text-4xl font-black font-orbitron text-[hsl(275,85%,70%)] mb-1">
                2×
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                SIH National Winners at RG
              </div>
            </GlassmorphismCard>

            <GlassmorphismCard className="text-center p-5 border border-white/10 hover:border-[hsl(220,70%,55%,0.4)] transition-all">
              <div className="text-3xl md:text-4xl font-black font-orbitron text-[hsl(220,70%,55%)] mb-1">
                4×
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                National Finalist Teams at RG
              </div>
            </GlassmorphismCard>

            <GlassmorphismCard className="text-center p-5 border border-white/10 hover:border-yellow-400/40 transition-all">
              <div className="text-2xl md:text-3xl font-black font-orbitron text-yellow-400 mb-1">
                ₹1L – 1.5L
              </div>
              <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                Prize per PS in Grand Finale
              </div>
            </GlassmorphismCard>
          </motion.div>
        </section>

        {/* ================= ROBOGYAN LEGACY & WINNING TRACK RECORD ================= */}
        <section className="mb-24">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/40 mb-3 px-3 py-1 text-xs font-semibold">
              <Trophy size={14} className="mr-1.5 text-yellow-400 inline" />
              Proven Track Record of Excellence
            </Badge>
            <h2 className="font-russo text-3xl sm:text-5xl font-bold mb-4">
              SIH Hall of Fame &amp; <span className="gradient-text">National Champions</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto font-inter text-base sm:text-lg leading-relaxed">
              Since its inception in 2017, <strong className="text-white font-semibold">Robogyan</strong> has built an illustrious legacy at the Smart India Hackathon - securing its <strong className="text-white font-semibold">first National Championship in 2019</strong> (the 3rd SIH edition), continuing the momentum with Grand Finale appearances in <strong className="text-white font-semibold">2023 and 2024</strong>, and triumphing once again as <strong className="text-white font-semibold">National Champions in 2025</strong>.
            </p>
          </div>

          {/* Auto-Scrolling Achievement Showcase Card */}
          <GlassmorphismCard className="p-6 sm:p-10 md:p-12 relative overflow-hidden border border-white/15 bg-gradient-to-br from-black/90 via-[hsl(240,10%,6%)] to-[hsl(235,50%,10%)] shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[hsl(235,85%,65%,0.15)] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-96 h-96 bg-[hsl(275,85%,70%,0.12)] rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Story Details */}
              <motion.div
                key={`story-info-${currentWinnerStory}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-6 space-y-5"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={`bg-gradient-to-r ${sihWinnerStories[currentWinnerStory].gradient} text-black font-bold font-mono px-3 py-1 text-xs shadow-md`}>
                    {sihWinnerStories[currentWinnerStory].edition}
                  </Badge>
                  <Badge className={`${sihWinnerStories[currentWinnerStory].badgeColor} border text-xs font-semibold px-3 py-1 flex items-center gap-1.5`}>
                    <Trophy size={13} className="shrink-0" />
                    <span>{sihWinnerStories[currentWinnerStory].badge}</span>
                  </Badge>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-mono block mb-1">
                    {sihWinnerStories[currentWinnerStory].standing}
                  </span>
                  <h3 className="font-russo text-3xl sm:text-4xl text-white font-bold tracking-tight">
                    {sihWinnerStories[currentWinnerStory].teamName}
                  </h3>
                  <p className={`text-base sm:text-lg font-semibold mt-1 bg-gradient-to-r ${sihWinnerStories[currentWinnerStory].gradient} bg-clip-text text-transparent`}>
                    {sihWinnerStories[currentWinnerStory].title}
                  </p>
                </div>

                <p className="text-gray-300 font-inter leading-relaxed text-sm sm:text-base">
                  {sihWinnerStories[currentWinnerStory].description}
                </p>

                {/* Prize / Award Callout */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-300 shrink-0">
                    <Award size={22} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">Recognition &amp; Prize</div>
                    <div className="text-sm sm:text-base font-bold text-white font-orbitron">
                      {sihWinnerStories[currentWinnerStory].award}
                    </div>
                  </div>
                </div>

                {/* Highlight Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {sihWinnerStories[currentWinnerStory].highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-300 flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} className="text-[hsl(150,100%,50%)]" />
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="pt-2">
                  <a href="#eligibility-checker" onClick={(e) => scrollToSection(e, "eligibility-checker")}>
                    <Button className="bg-[hsl(235,85%,65%)] hover:bg-[hsl(235,85%,55%)] text-white font-semibold rounded-xl flex items-center gap-2 px-6 py-5">
                      <span>Check Your Team Eligibility</span>
                      <ArrowRight size={16} />
                    </Button>
                  </a>
                </div>
              </motion.div>

              {/* Right Column: Photo Showcase */}
              <motion.div
                key={`story-photo-${currentWinnerStory}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-6"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black/40 group aspect-[4/3] sm:aspect-[16/10] w-full flex items-center justify-center">
                  {/* Main Image */}
                  <ImageWithLoader
                    src={sihWinnerStories[currentWinnerStory].image}
                    alt={sihWinnerStories[currentWinnerStory].teamName}
                    className={`w-full h-full ${sihWinnerStories[currentWinnerStory].imageFit === "contain"
                        ? "object-contain"
                        : "object-cover"
                      } ${sihWinnerStories[currentWinnerStory].imagePosition || "object-center"
                      } transition-transform duration-700 group-hover:scale-105`}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-6 pointer-events-none">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/40 text-xs font-semibold">
                        {sihWinnerStories[currentWinnerStory].edition}
                      </Badge>
                      <span className="text-xs text-gray-300 font-mono">Official Victory Moment</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold font-russo text-white">
                      {sihWinnerStories[currentWinnerStory].teamName}
                    </h4>
                    <p className="text-xs text-gray-300 line-clamp-1">
                      {sihWinnerStories[currentWinnerStory].award}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom Carousel Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-white/10 relative z-10">
              <Button
                onClick={prevWinnerStory}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-1.5 font-medium"
              >
                <ChevronLeft size={18} />
                <span>Previous</span>
              </Button>

              {/* Indicator Pills */}
              <div className="flex items-center space-x-2">
                {sihWinnerStories.map((story, index) => (
                  <button
                    key={story.id}
                    onClick={() => setCurrentWinnerStory(index)}
                    className={`transition-all rounded-full ${index === currentWinnerStory
                      ? "w-8 h-2.5 bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] shadow-md"
                      : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                      }`}
                    aria-label={`Go to winner story ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                onClick={nextWinnerStory}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:text-white hover:bg-white/10 flex items-center gap-1.5 font-medium"
              >
                <span>Next</span>
                <ChevronRight size={18} />
              </Button>
            </div>
          </GlassmorphismCard>

        </section>

        {/* ================= TEAM ELIGIBILITY VALIDATOR ================= */}
        <section id="eligibility-checker" className="mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <Badge className="bg-[hsl(235,85%,65%,0.2)] text-[hsl(235,85%,65%)] border-[hsl(235,85%,65%,0.4)] mb-3">
              Mandatory SIH Criteria
            </Badge>
            <h2 className="font-russo text-3xl sm:text-4xl font-bold mb-4">
              Check <span className="gradient-text">Team Eligibility</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto font-inter">
              Official SIH rules strictly require specific team criteria. Use this live validator to test if your team setup complies before submitting!
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <GlassmorphismCard className="p-6 sm:p-10 border border-white/15">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Input Controls */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-200">
                        Total Student Members in Team
                      </label>
                      <span className="font-orbitron font-bold text-lg text-[hsl(235,85%,65%)]">
                        {teamSize} Members
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[4, 5, 6, 7, 8].map((size) => (
                        <button
                          key={size}
                          onClick={() => setTeamSize(size)}
                          className={`flex-1 py-2 rounded-lg font-orbitron text-sm transition-all ${teamSize === size
                            ? "bg-[hsl(235,85%,65%)] text-white font-bold shadow-lg shadow-[hsl(235,85%,65%,0.3)]"
                            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      * SIH strictly mandates exactly <strong className="text-gray-200">6 students</strong> per team.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-200">
                        Female Members in Team
                      </label>
                      <span className="font-orbitron font-bold text-lg text-[hsl(275,85%,70%)]">
                        {femaleMembers} {femaleMembers === 1 ? "Member" : "Members"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3, 4].map((females) => (
                        <button
                          key={females}
                          onClick={() => setFemaleMembers(females)}
                          className={`flex-1 py-2 rounded-lg font-orbitron text-sm transition-all ${femaleMembers === females
                            ? "bg-[hsl(275,85%,70%)] text-white font-bold shadow-lg shadow-[hsl(275,85%,70%,0.3)]"
                            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                          {females}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      * <strong className="text-gray-200">At least 1 female member</strong> is mandatory for every team.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <input
                        type="checkbox"
                        checked={isSameCollege}
                        onChange={(e) => setIsSameCollege(e.target.checked)}
                        className="w-5 h-5 accent-[hsl(235,85%,65%)] rounded"
                      />
                      <span className="text-sm text-gray-200">
                        All members are enrolled regular students of ADGIPS
                      </span>
                    </label>
                  </div>
                </div>

                {/* Right: Validation Feedback Card */}
                <div className="flex flex-col justify-between p-6 rounded-2xl bg-black/40 border border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      {isTeamValid ? (
                        <div className="flex items-center gap-2 text-[hsl(150,100%,50%)] font-orbitron font-bold text-lg">
                          <CheckCircle2 size={24} />
                          <span>100% SIH COMPLIANT</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-amber-400 font-orbitron font-bold text-lg">
                          <AlertTriangle size={24} />
                          <span>CRITERIA INCOMPLETE</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2.5 text-sm">
                        {teamSize === 6 ? (
                          <CheckCircle2 size={18} className="text-[hsl(150,100%,50%)] shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <span className={teamSize === 6 ? "text-gray-200" : "text-amber-300"}>
                          Team Size: {teamSize} {teamSize === 6 ? "(Valid: Exactly 6)" : "(Invalid: Must be exactly 6)"}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5 text-sm">
                        {femaleMembers >= 1 ? (
                          <CheckCircle2 size={18} className="text-[hsl(150,100%,50%)] shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <span className={femaleMembers >= 1 ? "text-gray-200" : "text-amber-300"}>
                          Female Member: {femaleMembers >= 1 ? `Valid (${femaleMembers} included)` : "Mandatory rule: At least 1 female member required"}
                        </span>
                      </div>

                      <div className="flex items-start gap-2.5 text-sm">
                        {isSameCollege ? (
                          <CheckCircle2 size={18} className="text-[hsl(150,100%,50%)] shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                        )}
                        <span className={isSameCollege ? "text-gray-200" : "text-amber-300"}>
                          Institute Affiliation: {isSameCollege ? "Valid (ADGIPS)" : "Invalid (All must be from ADGIPS)"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    {isTeamValid ? (
                      <a href={sihOverview.registrationUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-5 rounded-xl shadow-lg">
                          Proceed to Registration Form
                        </Button>
                      </a>
                    ) : (
                      <a href="#teammate-finder" onClick={(e) => scrollToSection(e, "teammate-finder")}>
                        <Button variant="outline" className="w-full border-amber-500/40 text-amber-300 hover:bg-amber-500/10 py-5 rounded-xl">
                          Need Help Finding Teammates?
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </GlassmorphismCard>
          </div>
        </section>

        {/* ================= SOFTWARE VS HARDWARE TRACKS ================= */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/40 mb-3 px-3 py-1 text-xs font-semibold">
              Official SIH Tracks
            </Badge>
            <h2 className="font-russo text-3xl sm:text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text">Competition Track</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto font-inter text-base">
              Smart India Hackathon features 220+ problem statements from Central Ministries and State Departments categorized into two primary technical tracks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Software Track Card */}
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="h-full">
              <GlassmorphismCard className="p-8 h-full border border-[hsl(235,85%,65%,0.3)] bg-gradient-to-b from-[hsl(235,85%,65%,0.08)] to-transparent relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[hsl(235,85%,65%,0.2)] border border-[hsl(235,85%,65%,0.4)] flex items-center justify-center text-cyan-400 shadow-lg shadow-[hsl(235,85%,65%,0.2)]">
                      <Laptop size={28} />
                    </div>
                    <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-400/30 text-xs font-mono font-bold">
                      170+ Software PS
                    </Badge>
                  </div>

                  <Badge className="bg-[hsl(235,85%,65%,0.2)] text-[hsl(235,85%,65%)] border-[hsl(235,85%,65%,0.4)] mb-3">
                    Software Innovation Track
                  </Badge>

                  <h3 className="font-russo text-2xl font-bold mb-3 text-white">
                    AI, Cloud &amp; Digital Platforms
                  </h3>

                  <p className="text-gray-300 font-inter mb-6 text-sm leading-relaxed">
                    Develop full-stack web/mobile platforms, predictive machine learning models, GIS geospatial systems, blockchain ledgers, and intelligent APIs solving challenges from Ministries like Indian Railways, AYUSH, Earth Sciences, and Coal India.
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      Key Domains &amp; Technologies:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "AI / ML & NLP",
                        "Full-Stack Web / Apps",
                        "GIS & Geospatial Mapping",
                        "Predictive Analytics",
                        "Blockchain & Traceability",
                        "Cloud & Microservices",
                      ].map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-300 border border-white/10 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-medium text-gray-400">Internal Round Deliverable:</span>
                    <span className="text-cyan-300 font-semibold">Working UI/Code Demo &amp; System Flow</span>
                  </div>

                  <a
                    href={sihOverview.officialPSUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-cyan-400/30 hover:border-cyan-400 text-cyan-300 hover:text-white hover:bg-cyan-500/10 text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Explore 170+ Software PS on Official Portal</span>
                      <ExternalLink size={14} />
                    </Button>
                  </a>
                </div>
              </GlassmorphismCard>
            </motion.div>

            {/* Hardware Track Card */}
            <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="h-full">
              <GlassmorphismCard className="p-8 h-full border border-[hsl(275,85%,70%,0.3)] bg-gradient-to-b from-[hsl(275,85%,70%,0.08)] to-transparent relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[hsl(275,85%,70%,0.2)] border border-[hsl(275,85%,70%,0.4)] flex items-center justify-center text-[hsl(275,85%,70%)] shadow-lg shadow-[hsl(275,85%,70%,0.2)]">
                      <Cpu size={28} />
                    </div>
                    <Badge className="bg-purple-500/10 text-purple-300 border-purple-400/30 text-xs font-mono font-bold">
                      50+ Hardware PS
                    </Badge>
                  </div>

                  <Badge className="bg-[hsl(275,85%,70%,0.2)] text-[hsl(275,85%,70%)] border-[hsl(275,85%,70%,0.4)] mb-3">
                    Hardware Innovation Track
                  </Badge>

                  <h3 className="font-russo text-2xl font-bold mb-3 text-white">
                    IoT, Embedded &amp; Autonomous Robotics
                  </h3>

                  <p className="text-gray-300 font-inter mb-6 text-sm leading-relaxed">
                    Engineer physical prototypes, embedded electronics, robotics &amp; UAV payloads, telemetry sensors, and harsh-environment devices solving mission-critical challenges from DRDO, Ministry of Defence, Indian Railways, and MSME.
                  </p>

                  <div className="space-y-2 mb-6">
                    <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      Key Domains &amp; Technologies:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Robotics & UAVs",
                        "Microcontrollers (ESP32/STM32)",
                        "Edge AI & Computer Vision",
                        "IoT Sensors & Telemetry",
                        "3D CAD & Mechanics",
                        "Solar & Clean Tech Circuits",
                      ].map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-gray-300 border border-white/10 font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="text-xs text-gray-400 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="font-medium text-gray-400">Internal Round Deliverable:</span>
                    <span className="text-purple-300 font-semibold">Circuit Schematics, CAD &amp; Breadboard POC</span>
                  </div>

                  <a
                    href={sihOverview.officialPSUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-purple-400/30 hover:border-purple-400 text-purple-300 hover:text-white hover:bg-purple-500/10 text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Explore 50+ Hardware PS on Official Portal</span>
                      <ExternalLink size={14} />
                    </Button>
                  </a>
                </div>
              </GlassmorphismCard>
            </motion.div>
          </div>
        </section>

        {/* ================= INTERNAL HACKATHON ROADMAP ================= */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <Badge className="bg-[hsl(150,100%,50%,0.2)] text-[hsl(150,100%,50%)] border-[hsl(150,100%,50%,0.4)] mb-3">
              Step-by-Step Flow
            </Badge>
            <h2 className="font-russo text-3xl sm:text-4xl font-bold mb-4">
              Internal Hackathon <span className="gradient-text">Roadmap & Timeline</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto font-inter">
              From college registration to official SPOC nomination of the <strong className="text-white">top 45 shortlisted + 5 waitlisted teams</strong> to the national portal.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center connecting line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[hsl(235,85%,65%)] via-[hsl(275,85%,70%)] to-[hsl(150,100%,50%)] opacity-30" />

            <div className="space-y-8">
              {sihTimeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={item.phase}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-center gap-6 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                  >
                    {/* Content Box */}
                    <div className="w-full md:w-[calc(50%-2rem)]">
                      <GlassmorphismCard className="p-6 border border-white/10 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <Badge
                            variant="secondary"
                            className={
                              item.status === "Live"
                                ? "bg-[hsl(150,100%,50%,0.2)] text-[hsl(150,100%,50%)] border border-[hsl(150,100%,50%,0.4)]"
                                : item.status === "Completed"
                                  ? "bg-white/10 text-gray-400 border border-white/10"
                                  : "bg-[hsl(235,85%,65%,0.2)] text-[hsl(235,85%,65%)] border border-[hsl(235,85%,65%,0.4)]"
                            }
                          >
                            {item.status === "Live" ? "Active Now" : item.status}
                          </Badge>
                          <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                            <Calendar size={14} className="text-[hsl(235,85%,65%)]" />
                            {item.date}
                          </span>
                        </div>

                        <h4 className="font-orbitron text-lg font-bold text-white mb-2">
                          {item.title}
                        </h4>

                        <p className="text-sm text-gray-300 font-inter mb-4">
                          {item.description}
                        </p>

                        <ul className="space-y-1.5 border-t border-white/10 pt-3">
                          {item.details.map((point, idx) => (
                            <li key={idx} className="text-xs text-gray-400 flex items-start gap-2">
                              <span className="text-[hsl(235,85%,65%)] font-bold mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </GlassmorphismCard>
                    </div>

                    {/* Timeline Node Icon */}
                    <div className="relative z-10 w-12 h-12 rounded-full glassmorphism border-2 border-[hsl(235,85%,65%)] flex items-center justify-center font-orbitron font-bold text-sm text-white shrink-0 shadow-lg shadow-[hsl(235,85%,65%,0.3)] bg-black">
                      {index + 1}
                    </div>

                    {/* Empty spacer for grid alignment */}
                    <div className="hidden md:block w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= PROBLEM STATEMENTS & THEMES EXPLORER ================= */}
        {/* <section id="problem-statements" className="mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <Badge className="bg-[hsl(275,85%,70%,0.2)] text-[hsl(275,85%,70%)] border-[hsl(275,85%,70%,0.4)] mb-3">
              Explore Ideas & Domains
            </Badge>
            <h2 className="font-russo text-3xl sm:text-4xl font-bold mb-4">
              Problem Statements & <span className="gradient-text">Themes Hub</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto font-inter">
              Browse official themes, filter sample challenges, or access the Central SIH portal repository for the complete list of problem statements.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
            {sihThemes.map((theme) => {
              const IconComp = themeIconMap[theme.iconName] || Layers;
              const isSelected = selectedTheme === theme.name;
              return (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedTheme(isSelected ? "All" : theme.name)}
                  className={`p-3 rounded-xl text-left transition-all border ${isSelected
                    ? "bg-white/15 border-[hsl(235,85%,65%)] shadow-lg shadow-[hsl(235,85%,65%,0.2)]"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                >
                  <IconComp className="text-[hsl(235,85%,65%)] mb-2" size={20} />
                  <div className="font-semibold text-xs text-white line-clamp-1">
                    {theme.name}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {theme.category} Track
                  </div>
                </motion.button>
              );
            })}
          </div>

          <GlassmorphismCard className="p-4 sm:p-6 mb-8 border border-white/15">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search problem, ministry, tech stack..."
                  value={psSearch}
                  onChange={(e) => setPsSearch(e.target.value)}
                  className="pl-10 bg-black/40 border-white/15 text-white placeholder:text-gray-500 rounded-xl focus:border-[hsl(235,85%,65%)]"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                {(["All", "Software", "Hardware"] as const).map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={selectedCategory === cat ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat)}
                    className={
                      selectedCategory === cat
                        ? "bg-[hsl(235,85%,65%)] text-white font-semibold rounded-lg"
                        : "glassmorphism border-white/10 text-gray-300 hover:text-white rounded-lg"
                    }
                  >
                    {cat === "All" ? "All Tracks" : `${cat} Edition`}
                  </Button>
                ))}

                {selectedTheme !== "All" && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedTheme("All")}
                    className="text-xs text-amber-300 hover:text-amber-200"
                  >
                    Clear Theme Filter ×
                  </Button>
                )}
              </div>
            </div>
          </GlassmorphismCard>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredProblemStatements.map((ps) => (
              <GlassmorphismCard
                key={ps.id}
                className="p-6 flex flex-col justify-between border border-white/10 hover:border-[hsl(235,85%,65%,0.5)] transition-all card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-white/10 text-cyan-300 border border-cyan-400/20">
                      {ps.psNumber}
                    </span>
                    <Badge
                      variant="secondary"
                      className={
                        ps.category === "Software"
                          ? "bg-[hsl(235,85%,65%,0.2)] text-[hsl(235,85%,65%)] border border-[hsl(235,85%,65%,0.4)]"
                          : "bg-[hsl(275,85%,70%,0.2)] text-[hsl(275,85%,70%)] border border-[hsl(275,85%,70%,0.4)]"
                      }
                    >
                      {ps.category}
                    </Badge>
                  </div>

                  <h4 className="font-orbitron font-bold text-base text-white mb-2 leading-snug">
                    {ps.title}
                  </h4>

                  <div className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
                    <span className="font-medium text-[hsl(150,100%,50%)]">{ps.organization}</span>
                  </div>

                  <p className="text-xs text-gray-300 font-inter mb-4 line-clamp-3 leading-relaxed">
                    {ps.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {ps.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassmorphismCard>
            ))}
          </div>

          <div className="p-6 rounded-2xl glassmorphism border border-white/15 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="font-bold text-white text-sm sm:text-base">
                Looking for All Official Problem Statements?
              </div>
              <div className="text-xs text-gray-400">
                Explore the complete live database released by Ministries and PSUs on the national portal.
              </div>
            </div>
            <a
              href={sihOverview.officialPSUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <Button
                variant="outline"
                className="glassmorphism border-[hsl(235,85%,65%)] text-white hover:bg-[hsl(235,85%,65%)] text-sm rounded-xl flex items-center gap-2"
              >
                <span>Official SIH Portal PS List</span>
                <ExternalLink size={14} />
              </Button>
            </a>
          </div>
        </section> */}

        {/* ================= OFFICIAL PPT PRESENTATION MASTERCLASS ================= */}
        <section id="ppt-guide" className="mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/40 mb-3">
              Official Template Breakdown
            </Badge>
            <h2 className="font-russo text-3xl sm:text-4xl font-bold mb-4">
              Idea PPT <span className="gradient-text">Structure & Pitch Kit</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto font-inter">
              Every team must present their solution in the strictly mandated <strong className="text-white">6-Slide Official SIH Format</strong>. Here is the exact slide breakdown and pitching tips from past winners.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Left Column: Slide Navigation Tabs */}
            <div className="lg:col-span-4 space-y-2">
              {pptSlideGuides.map((guide) => (
                <button
                  key={guide.slideNumber}
                  onClick={() => setActiveSlide(guide.slideNumber)}
                  className={`w-full text-left p-4 rounded-xl transition-all flex items-center justify-between border ${activeSlide === guide.slideNumber
                    ? "bg-gradient-to-r from-[hsl(235,85%,65%,0.2)] to-[hsl(275,85%,70%,0.2)] border-[hsl(235,85%,65%)] shadow-lg"
                    : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-lg font-orbitron font-bold text-xs flex items-center justify-center ${activeSlide === guide.slideNumber
                        ? "bg-[hsl(235,85%,65%)] text-white"
                        : "bg-white/10 text-gray-400"
                        }`}
                    >
                      0{guide.slideNumber}
                    </span>
                    <div>
                      <div className="font-semibold text-sm text-white">
                        {guide.title}
                      </div>
                      <div className="text-xs text-gray-400">{guide.subtitle}</div>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 -rotate-90 transition-transform ${activeSlide === guide.slideNumber ? "text-[hsl(235,85%,65%)]" : ""
                      }`}
                  />
                </button>
              ))}

              <div className="pt-4">
                <a href={sihOverview.pptTemplateUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] hover:opacity-95 text-white font-semibold py-6 rounded-xl shadow-lg flex items-center justify-center gap-2">
                    <Download size={18} />
                    Download Official PPT Template (.pptx)
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: Slide Guidance Details */}
            <div className="lg:col-span-8">
              {pptSlideGuides
                .filter((guide) => guide.slideNumber === activeSlide)
                .map((guide) => (
                  <motion.div
                    key={guide.slideNumber}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <GlassmorphismCard className="p-8 border border-white/15 bg-black/60">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <div>
                          <span className="text-xs uppercase tracking-widest text-[hsl(235,85%,65%)] font-mono font-bold">
                            Slide 0{guide.slideNumber} of 06
                          </span>
                          <h3 className="font-russo text-2xl text-white mt-1">
                            {guide.title}
                          </h3>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-gray-300">
                          {guide.subtitle}
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-3 flex items-center gap-2">
                            <Layers size={16} className="text-[hsl(150,100%,50%)]" />
                            What Must Be Included:
                          </h4>
                          <div className="space-y-3">
                            {guide.keyPoints.map((point, idx) => (
                              <div
                                key={idx}
                                className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3"
                              >
                                <CheckCircle2
                                  size={18}
                                  className="text-[hsl(150,100%,50%)] shrink-0 mt-0.5"
                                />
                                <span className="text-sm text-gray-200 leading-relaxed font-inter">
                                  {point}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pro Tip Box */}
                        {/* <div className="p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 via-amber-500/5 to-transparent border border-yellow-500/30 flex items-start gap-3">
                          <Sparkles size={20} className="text-yellow-400 shrink-0 mt-0.5" />
                          <div>
                            <div className="text-xs font-bold text-yellow-300 uppercase tracking-wider">
                              Robogyan Winner's Secret Pitch Tip:
                            </div>
                            <p className="text-sm text-gray-300 mt-1 font-inter">
                              {guide.proTip}
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </GlassmorphismCard>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* ================= TEAMMATE FINDER & COMMUNITY HELPDESK ================= */}
        <section id="teammate-finder" className="mb-24 scroll-mt-24">
          <GlassmorphismCard className="p-8 md:p-12 border border-white/15 bg-gradient-to-r from-[hsl(235,85%,65%,0.15)] via-black/80 to-[hsl(275,85%,70%,0.15)]">
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <Badge className="bg-[hsl(150,100%,50%,0.2)] text-[hsl(150,100%,50%)] border-[hsl(150,100%,50%,0.4)]">
                  Teammate Matchmaking & Queries
                </Badge>
                <h3 className="font-russo text-3xl font-bold">
                  Looking for Team Members or a Female Co-Participant?
                </h3>
                <p className="text-gray-300 font-inter text-base leading-relaxed">
                  Don't worry if you don't have a complete 6-member team yet. Join the dedicated <strong className="text-white">Robogyan SIH Community</strong> to find skilled coders, hardware builders, designers, and female teammates from ADGIPS!
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="https://chat.whatsapp.com/Cvly36rbNvM1ZgtCgRBp2R"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[hsl(275,85%,70%)] hover:bg-[hsl(275,85%,60%)] text-white font-semibold rounded-xl flex items-center gap-2">
                      <MessageSquare size={18} />
                      Join the Whatsapp Group
                    </Button>
                  </a>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="glassmorphism border-white/20 text-white hover:bg-white/10 rounded-xl"
                    >
                      Visit Robogyan Lab (Basement, Block 5)
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="md:col-span-4 p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3">
                <div className="text-xs uppercase tracking-widest text-gray-400 font-mono font-bold">
                  College SPOC & Helpdesk
                </div>
                <div className="text-sm font-semibold text-white">
                  ADGIPS SIH Organizing Committee
                </div>
                <div className="text-xs text-gray-300">
                  Email: <span className="text-cyan-300">robogyan.sih@gmail.com</span>
                </div>
                <div className="text-xs text-gray-300">
                  Location: <span className="text-white">Robogyan Lab, Basement, Block 5, ADGIPS</span>
                </div>
              </div>
            </div>
          </GlassmorphismCard>
        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS ================= */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Badge className="bg-white/10 text-gray-300 border-white/20 mb-3">
              Have Doubts?
            </Badge>
            <h2 className="font-russo text-3xl sm:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto font-inter">
              Clear answers to all student questions regarding rules, team formation, and the internal round.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {["All", "Eligibility", "Registration", "PPT & Submission", "Internal Hackathon"].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${faqCategory === cat
                    ? "bg-[hsl(235,85%,65%)] text-white border-[hsl(235,85%,65%)] shadow-md"
                    : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl glassmorphism border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base font-inter">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180 text-[hsl(235,85%,65%)]" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-sm text-gray-300 font-inter border-t border-white/5 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= FINAL REGISTRATION CALL TO ACTION ================= */}
        <section className="text-center py-12">
          <GlassmorphismCard className="p-8 sm:p-12 max-w-4xl mx-auto border border-[hsl(235,85%,65%,0.5)] bg-gradient-to-tr from-[hsl(235,85%,65%,0.1)] via-black/80 to-[hsl(275,85%,70%,0.1)]">
            <h3 className="font-russo text-3xl sm:text-4xl font-black mb-4">
              Ready to Represent ADGIPS on the National Stage?
            </h3>
            <p className="text-gray-300 font-inter text-base max-w-xl mx-auto mb-8">
              Form your 6-member team, download the official PPT template, and register now for the internal hackathon.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={sihOverview.registrationUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] hover:scale-105 transition-transform text-white font-semibold px-8 py-6 text-lg rounded-xl shadow-xl shadow-[hsl(235,85%,65%,0.3)]"
                >
                  Submit Team Registration
                </Button>
              </a>
              <a href={sihOverview.pptTemplateUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="glassmorphism border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
                >
                  Download PPT Template
                </Button>
              </a>
            </div>
          </GlassmorphismCard>
        </section>
      </div>
    </div>
  );
}
