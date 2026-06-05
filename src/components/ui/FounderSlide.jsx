import { motion } from "framer-motion";
export default function FounderSlide({ founder, index }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 40,
            }}
            whileInView={{
                opacity: 1,
                y: 0,
            }}
            viewport={{ once: false }}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
            }}
            className="
        group
        overflow-hidden
        rounded-[36px]
        bg-[#F7F5F2]
      "
        >
            <div className="relative overflow-hidden">
                <img
                    src={founder.img}
                    alt={founder.name}
                    className="
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
                />

                {/* Overlay */}
                <div
                    className="
            absolute
            inset-0
            bg-linear-to-t
            from-black/80
            via-black/30
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
                />

                {/* Hover Details */}
                <div
                    className="
            absolute
            bottom-0
            left-0
            right-0
            translate-y-8
            p-6
            text-white
            opacity-0
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
                >
                    <p className="text-sm uppercase tracking-[0.25em] text-white/70">
                        {founder.title}
                    </p>

                    <p className="mt-3 text-sm leading-relaxed text-white/90">
                        {founder.bio}
                    </p>
                </div>
            </div>

            <div className="p-6">
                <h3
                    className="
            font-playfair
            text-3xl
            font-bold
            text-charcoal
          "
                >
                    {founder.name}
                </h3>

                <p className="mt-2 text-sm tracking-[0.2em] uppercase text-maroon">
                    {founder.title}
                </p>
            </div>
        </motion.div>
    );
}