import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function SplashScreen({
    onComplete,
}) {
    const [show, setShow] = useState(true);
    const [phase, setPhase] = useState(0);

    useEffect(() => {
        setTimeout(() => setPhase(1), 500);
    }, []);
    const letters = "VASTRA".split("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence onExitComplete={onComplete}>
            {show && (
 <motion.div
  key="splash"
  exit={{
    opacity: 0,
    scale: 1.04,
  }}
  transition={{
    duration: 0.7,
  }}
  className="
    fixed inset-0 z-50
    flex items-center justify-center
    bg-white
  "
>
  {/* Outer Ring */}
  <motion.div
    initial={{
      scale: 0.6,
      opacity: 0,
    }}
    animate={{
      scale: 1,
      opacity: 1,
    }}
    transition={{
      duration: 1,
    }}
    className="
      absolute
      h-[340px]
      w-[340px]
      rounded-full
      border
      border-black/30
    "
  />

  {/* Inner Ring */}
  <motion.div
    initial={{
      scale: 0.5,
      opacity: 0,
    }}
    animate={{
      scale: 1,
      opacity: 1,
    }}
    transition={{
      duration: 1,
      delay: 0.1,
    }}
    className="
      absolute
      h-[220px]
      w-[220px]
      rounded-full
      border
      border-black/20
    "
  />

  {/* Content Container */}
  <div className="relative z-10 flex flex-col items-center">
    {/* Logo */}
    <motion.h1
      initial={{
        clipPath: "inset(0 100% 0 0)",
        opacity: 0,
      }}
      animate={
        phase >= 1
          ? {
              clipPath: [
                "inset(0 100% 0 0)",
                "inset(0 100% 0 0)",
                "inset(0 0% 0 0)",
              ],
              opacity: [0, 1, 1],
            }
          : {}
      }
      transition={{
        duration: 2.4,
        ease: [0.77, 0, 0.18, 1],
        times: [0, 0.3, 1],
      }}
      className="
        font-cormorant
        text-[clamp(52px,11vw,108px)]
        font-normal
        tracking-[0.4em]
        text-black
      "
    >
      <span>VAS</span>
      <span className="text-maroon">TRA</span>
    </motion.h1>

    {/* Edition */}
    <motion.p
    initial={{
        opacity: 0,
        y: 12,
    }}
    animate={{
        opacity: 1,
        y: 0,
    }}
    transition={{
        duration: 1.2,
        delay: 0.8,
        ease: "easeInOut",
    }}
    className="
        mt-2
        font-sans
        text-xs
        tracking-[0.3em]
        text-black
    "
    >
    Vol. I · South India Edition · 2025
    </motion.p>

    {/* Tagline */}
    <motion.p
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        delay: 1.3,
      }}
      className="
        mt-4
        font-cormorant
        text-md
        tracking-[0.3em]
        text-black/80
      "
    >
      Fashion Intelligence, Know Before You Make
    </motion.p>
  </div>
</motion.div>
            )}
        </AnimatePresence>
    );
}