import { motion } from "framer-motion";
import { FaGem } from "react-icons/fa";

export const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FaGem className="text-amber-400 text-4xl mx-auto mb-6" />
          <h2 className="text-4xl font-light text-white mb-4">
            Begin Your Luxury Journey
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8 font-light">
            Join our exclusive community of discerning clients who appreciate
            the finer things in life
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-rose-600 text-white font-light tracking-widest rounded-full hover:shadow-2xl hover:shadow-amber-500/30 transition-all">
              CREATE ACCOUNT
            </button>
            <button className="px-8 py-4 bg-transparent text-white font-light tracking-widest rounded-full border border-white/30 hover:border-white/60 hover:bg-white/10 transition-all">
              SCHEDULE CONSULTATION
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};