import FadeUp from "../ui/FadeUp";
import { motion } from "framer-motion";

export default function PersonaCard({
    emoji,
    role,
    sub,
    selected,
    onSelect,
    delay,
}) {
    return (
        <FadeUp delay={delay}>
            <motion.div
                whileTap={{
                    scale: 0.97,
                }}
                onClick={onSelect}
                className={`
          relative
          cursor-pointer
          overflow-hidden
          rounded-2xl
          border-2
          p-7
          text-center
          transition-all
          ${selected
                        ? "border-maroon bg-maroon"
                        : "border-neutral-200 bg-white"
                    }
        `}
            >
                <div className="mb-4 text-5xl">
                    {emoji}
                </div>

                <h3
                    className={`
            mb-2
            font-playfair
            text-xl
            font-bold
            ${selected
                            ? "text-white"
                            : "text-charcoal"
                        }
          `}
                >
                    {role}
                </h3>

                <p
                    className={
                        selected
                            ? "text-rose-100"
                            : "text-muted"
                    }
                >
                    {sub}
                </p>

                {selected && (
                    <div
                        className="
              absolute
              right-3
              top-3
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-white
              text-sm
              font-bold
              text-maroon
            "
                    >
                        ✓
                    </div>
                )}
            </motion.div>
        </FadeUp>
    );
}