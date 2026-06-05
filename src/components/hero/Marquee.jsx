import { motion } from "framer-motion";
import { CITIES } from "../../constants/data";

export default function Marquee() {
    return (
        <div
            className="
        overflow-hidden
        border-y
        border-maroon/20
        py-3
      "
        >
            <motion.div
                animate={{
                    x: ["0%", "-50%"],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="
          flex
          w-max
          gap-10
          whitespace-nowrap
        "
            >
                {[...CITIES, ...CITIES, ...CITIES, ...CITIES].map(
                    (city, index) => (
                        <span
                            key={`${city}-${index}`}
                            className={`
                font-cormorant
                text-sm
                uppercase
                tracking-[0.35em]
                ${index % 2 === 0
                                    ? "text-maroon"
                                    : "text-muted"
                                }
              `}
                        >
                            {city} {index % 3 === 1 ? "✦" : "·"}
                        </span>
                    )
                )}
            </motion.div>
        </div>
    );
}