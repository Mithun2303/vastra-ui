import { useState } from "react";
import { motion } from "framer-motion";
import FadeUp from "../components/ui/FadeUp";
import PersonaCard from "../components/cards/PersonaCard";
import AnimatedStatement from "@/components/animation/AnimatedStatement";

const personas = [
  {
    title: "Brand Owner",
    statement:
      "A wrong production decision can cost months of inventory.",
    description:
      "You decide what gets made, when it gets made, and how much gets produced. VASTRA helps you understand demand before you commit capital.",
  },
  {
    title: "Marketing Manager",
    statement:
      "A wrong campaign can cost weeks of momentum.",
    description:
      "You create content, manage reels, monitor competitors and drive engagement. VASTRA helps you identify trends before they become mainstream.",
  }
];

export default function PersonasSection() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}

        <FadeUp>
          <div className="text-center">
            <p
              className="
                text-sm
                uppercase
                tracking-[0.4em]
                text-maroon
              "
            >
              Who Opens VASTRA?
            </p>

            <h2
              className="
                mt-6
                font-playfair
                text-5xl
                font-bold
                leading-tight
                text-charcoal
                md:text-7xl
              "
            >
              Some build products.
              <br />
              Some build audiences.
              <br />
              Some do both.
            </h2>
          </div>
        </FadeUp>

        {/* Personas */}

        <div className="mt-28 space-y-32 ">
          {personas.map((persona, index) => (
            <FadeUp
              key={persona.title}
              delay={index * 0.1}
            >
                <div className="relative">

                 <motion.div
  initial={{
    opacity: 0,
    x: 80,
  }}
  whileInView={{
    opacity: 1,
    x: 0,
  }}
  viewport={{
    once: false,
    amount: 0.3,
  }}
  transition={{
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    pointer-events-none
    absolute
    -right-10
    top-1/2
    hidden
    -translate-y-1/2
    font-playfair
    text-[180px]
    font-bold
    tracking-tight
    text-black/3
    lg:block
  "
>
  {persona.title.toUpperCase()}
</motion.div>
                <div className="pt-12">
  <motion.div
    initial={{
      scaleX: 0,
    }}
    whileInView={{
      scaleX: 1,
    }}
    viewport={{
      once: false,
    }}
    transition={{
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      mb-12
      h-px
      origin-left
      bg-black/10
    "
  />
                    <div
                    className="
                        grid
                        gap-10
                        md:grid-cols-[1fr_1.3fr]
                    "
                    >
                    {/* Left */}

                    <div>
                        <p
                        className="
                            text-sm
                            uppercase
                            tracking-[0.35em]
                            text-maroon
                        "
                        >
                        0{index + 1}
                        </p>

                        <h3
                        className="
                            mt-4
                            font-playfair
                            text-4xl
                            font-bold
                            text-charcoal
                            md:text-6xl
                        "
                        >
                        {persona.title}
                        </h3>
                    </div>

                    {/* Right */}

                    <div>
                        <AnimatedStatement
                        text={persona.statement}
                        />

                        <p
                        className="
                            mt-8
                            max-w-2xl
                            text-lg
                            leading-relaxed
                            text-muted
                        "
                        >
                        {persona.description}
                        </p>
                    </div>
                    </div>
                </div>
                </div>

            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}