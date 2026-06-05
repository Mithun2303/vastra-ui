import { motion } from "framer-motion";

export default function AnimatedStatement({
  text,
}) {
  const words = text.split(" ");

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{
            opacity: 0,
            y: 30,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: false,
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            inline-block
            font-playfair
            text-3xl
            leading-tight
            text-charcoal
            md:text-5xl
          "
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}