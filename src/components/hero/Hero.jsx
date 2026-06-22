import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpeg";
export default function Hero() {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", "30%"]
    );

    const opacity = useTransform(
        scrollYProgress,
        [0, 0.6],
        [1, 0]
    );

    return (
        <section
            ref={ref}
            className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-cream
        px-6
        text-center
      "
        >
            {/* Background Grid */}
            {/* <div
                className="
          absolute
          inset-0
          opacity-5
        "
                style={{
                    backgroundImage: `
            repeating-linear-gradient(
              0deg,
              #1A1A1A 0,
              #1A1A1A 1px,
              transparent 0,
              transparent 50%
            ),
            repeating-linear-gradient(
              90deg,
              #1A1A1A 0,
              #1A1A1A 1px,
              transparent 0,
              transparent 50%
            )
          `,
                    backgroundSize: "48px 48px",
                }}
            /> */}
<div className="absolute inset-0">
    <img
      src={heroBg}
      alt=""
      className="
        h-full
        w-full
        object-cover
      "
    />
    <div
    className="
      absolute
      inset-0
      bg-white/20
    "
  />

  </div>
            <motion.div
                style={{ y, opacity }}
                className="
          relative
          z-10
          mx-auto
          max-w-5xl
        "
            >
                {/* Badge */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="
            mb-8
            inline-flex
            items-center
            rounded-full
            border
            border-maroon/20
            bg-maroon/5
            px-5
            py-2
          "
                >
                    <span
                        className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.3em]
              text-maroon
            "
                    >
                        Vol. I · South India Edition · 2025
                    </span>
                </motion.div>

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.3,
                    }}
                    className="
            font-playfair
            text-5xl
            font-bold
            leading-none
            tracking-tight
            text-charcoal
            md:text-7xl
            lg:text-8xl
          "
                >
                    Stop Betting
                    <br />
                    <span className="text-maroon">
                        on Trends.
                    </span>
                </motion.h1>

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.55,
                    }}
                    className="
            mt-6
            font-cormorant
            text-2xl
            italic
            text-muted
            md:text-3xl
          "
                >
                    Start building with intelligence.
                </motion.p>

                {/* CTA */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.75,
                    }}
                    className="
            mt-10
            flex
            flex-col
            items-center
            justify-center
            gap-4
            sm:flex-row
          "
                >
                    <button
                        onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
                        className="
              rounded-xl
              bg-maroon
              px-8
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-xl
              hover:shadow-maroon/30
            "
                    >
                        Request Early Access
                    </button>

                    <button
                        className="
              rounded-xl
              border
              border-charcoal/20
              px-8
              py-4
              text-charcoal
              transition-all
              hover:bg-white
            "
                    >
                        See the Intelligence →
                    </button>
                </motion.div>

                {/* Stats */}

                <div
                    className="
            mt-16
            flex
            flex-wrap
            justify-center
            gap-10
          "
                >
                    {[
                        ["10", "Live Signals"],
                        ["5", "Cities"],
                        ["AI", "Recognition"],
                    ].map(([value, label]) => (
                        <div
                            key={label}
                            className="text-center"
                        >
                            <h3
                                className="
                  font-playfair
                  text-4xl
                  font-bold
                  text-maroon
                "
                            >
                                {value}
                            </h3>

                            <p
                                className="
                  mt-1
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-muted
                "
                            >
                                {label}
                            </p>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Scroll Indicator */}

            <div
                className="
          absolute
          bottom-8
          flex
          flex-col
          items-center
          gap-2
        "
            >
                <span
                    className="
            text-xs
            tracking-[0.2em]
            text-muted
          "
                >
                    SCROLL
                </span>

                <motion.div
                    animate={{
                        y: [0, 8, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                    className="
            h-8
            w-px
            bg-maroon
          "
                />
            </div>
        </section>
    );
}