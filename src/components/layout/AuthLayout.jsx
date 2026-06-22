import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpeg";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-2">
      {/* Left Section */}

      <div className="relative hidden overflow-hidden lg:block">
        <img
          src={heroBg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/30" />

        <div className="relative z-10 flex h-full flex-col justify-between p-16">
          <p className="text-md uppercase tracking-[0.45em] text-black">
            TRYND
          </p>

          <div>
            <h1 className="font-playfair text-7xl font-bold leading-none text-charcoal">
              Fashion
              <br />
              Intelligence.
            </h1>

            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
              Demand signals, city intelligence, trend forecasting and
              competitor monitoring for modern fashion brands.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Demand Signals",
              "City Intelligence",
              "Trend Forecasting",
              "Competitor Monitoring",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm uppercase tracking-[0.2em]"
              >
                <span className="h-1 w-1 rounded-full bg-maroon" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}

      <div className="flex min-h-screen items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-[32px] border border-black/5 bg-white/80 p-8 backdrop-blur-xl md:p-10"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}