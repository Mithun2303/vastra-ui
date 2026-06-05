import { motion } from "framer-motion";

export default function FounderCard({
  name,
  title,
  img,
  bio,
}) {
  return (
    <motion.div
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      initial={{
        opacity: 0,
        y: 80,
      }}
      viewport={{ once: false }}
      transition={{
        duration: 0.8,
      }}
      className="
        overflow-hidden
        rounded-[40px]
        bg-[#F7F5F2]
      "
    >
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={img}
          alt={name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            hover:scale-105
          "
        />
      </div>

      <div className="p-10 md:p-14">
        <p
          className="
            text-sm
            uppercase
            tracking-[0.3em]
            text-maroon
          "
        >
          {title}
        </p>

        <h3
          className="
            mt-3
            font-playfair
            text-4xl
            font-bold
            text-charcoal
            md:text-5xl
          "
        >
          {name}
        </h3>

        <p
          className="
            mt-6
            max-w-2xl
            text-lg
            leading-relaxed
            text-muted
          "
        >
          {bio}
        </p>
      </div>
    </motion.div>
  );
}