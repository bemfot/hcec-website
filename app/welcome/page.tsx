"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function WelcomePage() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="relative w-full min-h-[90vh] bg-gray-50 flex items-center justify-center py-20 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center bg-white rounded-[2.5rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] overflow-hidden border border-gray-100">
          
          {/* Image Section */}
          <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-[800px] shrink-0">
            <Image
              src="/assets/GO-piz.jpg"
              alt="General Overseer"
              fill
              className="object-cover object-top"
              priority
            />
            {/* Soft Gradient Overlay for image text (if any) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Content Section */}
          <div className="relative w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-red-600 uppercase mb-4">
                Welcome Message
              </h2>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                Welcome to the family of Christ with a message of <span className="text-red-600">Second Coming</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-red text-gray-600"
            >
              <blockquote className="italic border-l-4 border-red-500 pl-4 py-1 mb-8 text-gray-700 bg-gray-50 rounded-r-xl">
                "Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me; for I am meek and lowly in heart: and ye shall find rest unto your souls. For my yoke is easy, and my burden is light..."
                <span className="block mt-2 font-bold text-sm text-gray-900 not-italic">— Matthew 11:28-30</span>
              </blockquote>

              <p className="mb-4">
                There are decisions, and there are decisions. However, the decision to accept Christ's gift of salvation is the best one can ever make in his lifetime. While every decision has consequences, your acceptance of salvation does not only give you meaningful existence here, but also adds eternal value to your life.
              </p>

              {/* Desktop Always Visible, Mobile Collapsible */}
              <div className="hidden lg:block">
                <p className="mb-6">
                  On the other hand, the greatest risk one can take is to postpone the day of his salvation. As days pass, we get closer to the end of the age as all events happening now are indications of the imminence of the rapture of the saints. Death too is getting closer by the day. Therefore, if you hear his voice today, do not harden your heart... because delay is dangerous.
                </p>
                <div className="pt-6 border-t border-gray-100">
                  <p className="font-bold text-gray-900 text-lg">Pastor Dr. F.T Amongbonjaye</p>
                  <p className="text-red-600 text-sm font-medium uppercase tracking-wider">General Overseer HCEC Worldwide</p>
                </div>
              </div>

              {/* Mobile View Toggle */}
              <div className="block lg:hidden">
                <AnimatePresence>
                  {showMore && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mb-6">
                        On the other hand, the greatest risk one can take is to postpone the day of his salvation. As days pass, we get closer to the end of the age as all events happening now are indications of the imminence of the rapture of the saints. Death too is getting closer by the day. Therefore, if you hear his voice today, do not harden your heart... because delay is dangerous.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="pt-6 border-t border-gray-100 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Pastor Dr. F.T Amongbonjaye</p>
                    <p className="text-red-600 text-sm font-medium uppercase tracking-wider">General Overseer HCEC Worldwide</p>
                  </div>
                  
                  <button 
                    onClick={() => setShowMore(!showMore)}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full text-sm font-bold transition-colors w-full sm:w-auto"
                  >
                    {showMore ? (
                      <>Read Less <ChevronUp className="w-4 h-4" /></>
                    ) : (
                      <>Read More <ChevronDown className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
