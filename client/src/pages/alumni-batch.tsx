import { useParams } from "wouter";
import { motion } from "framer-motion";
import { alumniBatches } from "@/data/alumni-data";
import GlassmorphismCard from "@/components/ui/glassmorphism-card";
import { Badge } from "@/components/ui/badge";
import ImageWithLoader from "@/components/ui/image-with-loader";
import { Linkedin, Trophy } from "lucide-react";

const getLegacyMessage = (year: string) => {
  const messages: { [key: string]: string } = {
    "2024-25": "The 2024-25 batch of Robogyan didn't just participate — they innovated, led, and inspired.",
    "2023-24": "The 2023-24 batch of Robogyan didn't just participate — they revolutionized, conquered, and transformed.",
    "2022-23": "The 2022-23 batch of Robogyan didn't just participate — they engineered the future, inspired generations.",
    "2021-22": "The 2021-22 batch of Robogyan didn't just participate — they built legacies, pushed boundaries.",
    "2020-21": "The 2020-21 batch of Robogyan didn't just participate — they innovated, led, and inspired.",
  };
  return messages[year] || `The ${year} batch of Robogyan didn't just participate — they innovated, led, and inspired.`;
};

export default function AlumniBatch() {
  const { year } = useParams<{ year: string }>();

  // Find the batch data
  const batch = alumniBatches.find((b) => b.year === year);

  if (!batch) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-6 flex items-center justify-center">
        <GlassmorphismCard className="p-8 sm:p-12 text-center max-w-lg">
          <Trophy size={48} className="mx-auto mb-4 text-[hsl(235,85%,65%)]" />
          <h1 className="font-russo text-2xl sm:text-3xl mb-4 text-white">
            Batch Not Found
          </h1>
          <p className="text-gray-300 mb-8">
            We couldn't find the alumni batch for {year}. This link might be incorrect or the batch data hasn't been added yet.
          </p>
        </GlassmorphismCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[hsl(235,85%,65%)]"></div>
            <Badge className="bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] text-white font-orbitron font-bold px-4 py-2">
              {batch.year}
            </Badge>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[hsl(235,85%,65%)]"></div>
          </div>

          <h1 className="font-russo text-3xl sm:text-4xl md:text-5xl mb-4 text-[hsl(150,45%,60%)] neon-text">
            {batch.subtitle}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {batch.description}
          </p>

          {/* Batch Achievements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {batch.achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(235,85%,65%)] to-[hsl(275,85%,70%)] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                <Badge className="relative bg-[hsl(0,0%,8%)] border border-[hsl(235,85%,65%)] text-[hsl(150,45%,60%)] font-orbitron px-4 py-2 hover:bg-[hsl(235,85%,65%,0.1)] transition-colors">
                  <Trophy size={14} className="inline mr-2" />
                  {achievement}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Batch Image */}
          {batch.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full h-80 rounded-lg overflow-hidden mb-12 shadow-2xl shadow-[hsl(235,85%,65%,0.3)]"
            >
              <ImageWithLoader
                src={batch.image}
                alt={batch.subtitle}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Team Members Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="font-russo text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Meet the Team
            </h2>
            <p className="text-gray-400">
              {batch.members.length} brilliant minds who shaped {batch.year}
            </p>
          </div>

          {/* Members Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {batch.members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <GlassmorphismCard className="p-6 h-full hover:shadow-lg hover:shadow-[hsl(235,85%,65%,0.4)] transition-all duration-300 relative overflow-hidden">
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[hsl(235,85%,65%,0.05)] to-[hsl(275,85%,70%,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    {/* Member Header with Image */}
                    <div className="flex gap-4 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        className="w-24 h-24 rounded-full border-2 border-[hsl(235,85%,65%)] overflow-hidden flex-shrink-0 shadow-lg shadow-[hsl(235,85%,65%,0.3)]"
                      >
                        <ImageWithLoader
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-russo text-lg font-bold text-white mb-1 truncate">
                          {member.name}
                        </h3>
                        <p className="text-[hsl(235,85%,65%)] font-orbitron text-sm font-bold mb-2 truncate">
                          {member.position}
                        </p>
                        <div className="space-y-1">
                          <p className="text-gray-300 text-sm truncate">
                            {member.currentRole}
                          </p>
                          <p className="text-gray-400 text-xs truncate">
                            {member.currentCompany}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* LinkedIn Link */}
                    {member.linkedin && (
                      <div className="flex gap-2">
                        <motion.a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.2 }}
                          className="p-2 bg-[hsl(235,85%,65%,0.1)] hover:bg-[hsl(235,85%,65%,0.2)] rounded-full text-[hsl(235,85%,65%)] transition-colors"
                        >
                          <Linkedin size={16} />
                        </motion.a>
                      </div>
                    )}


                  </div>
                </GlassmorphismCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legacy Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <GlassmorphismCard className="p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[hsl(235,85%,65%,0.1)] rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[hsl(275,85%,70%,0.1)] rounded-full blur-xl"></div>

            <div className="relative z-10">
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed mb-4">
                {getLegacyMessage(batch.year)}
              </p>
              <p className="text-[hsl(235,85%,65%)] font-orbitron font-semibold italic">
                Their legacy continues through every project, every achievement, and every member who follows.
              </p>
            </div>
          </GlassmorphismCard>
        </motion.div>
      </div>
    </div>
  );
}
