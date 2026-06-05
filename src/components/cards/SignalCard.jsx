import { motion } from "framer-motion";
import FadeUp from "../ui/FadeUp";

export default function SignalCard({
    icon,
    title,
    desc,
    delay,
}) {
    return (
        <FadeUp delay={delay}>
            <motion.div
                whileHover={{
                    y: -8,
                }}
                className="
          group
          relative
          overflow-hidden
          rounded-2xl
          border
          h-[200px]
          max-h-[200]
          border-neutral-200
          bg-white
          p-6
          transition-all
          duration-300
          hover:border-maroon
          hover:bg-maroon
        "
            >
                <div className="mb-4 text-3xl">
                    {icon}
                </div>

                <h3
                    className="
            mb-2
            font-playfair
            text-xl
            font-semibold
            text-charcoal
            transition-colors
            group-hover:text-white
          "
                >
                    {title}
                </h3>

                <p
                    className="
            text-sm
            leading-7
            text-muted
            transition-colors
            group-hover:text-rose-100
          "
                >
                    {desc}
                </p>
            </motion.div>
        </FadeUp>
    );
}