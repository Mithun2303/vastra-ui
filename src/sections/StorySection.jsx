import { motion } from "framer-motion";

const leftFlow = ["Make.", "Launch.", "Hope."];
const rightFlow = ["Know.", "Decide.", "Launch."];

export default function StorySection() {
  return (
    <section
      id="about"
      className="
        bg-cream
        py-32
      "
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.4,
          }}
          className="text-center"
        >
          <p
            className="
              text-sm
              uppercase
              tracking-[0.4em]
              text-maroon
            "
          >
            Why VASTRA Exists
          </p>

          <h2
            className="
              font-playfair
              text-5xl
              font-bold
              leading-tight
              text-charcoal
              md:text-7xl
            "
          >
            Fashion brands have
            <br />
            more data than ever.
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-2xl
              text-lg
              leading-relaxed
              text-muted
            "
          >
            But almost none of it arrives before
            decisions are made.
          </p>
        </motion.div>

        {/* Divider */}

        <div
          className="
            mx-auto
            mt-8
            h-px
            max-w-5xl
            bg-black/10
          "
        />

        {/* Comparison */}

        <div
          className="
            mt-10
            grid
            gap-16
            md:grid-cols-2
          "
        >
          {/* Today */}

          <div>
            <motion.p
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: false,
              }}
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-muted
              "
            >
              Today
            </motion.p>

            <div className="mt-10 space-y-8">
              {leftFlow.map((item, index) => (
                <motion.h3
                  key={item}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: false,
                  }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  className={`
                    font-playfair
                    text-5xl
                    md:text-6xl
                    ${
                      item === "Hope."
                        ? "text-black/25"
                        : "text-charcoal"
                    }
                  `}
                >
                  {item}
                </motion.h3>
              ))}
            </div>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
              }}
              className="
                mt-12
                max-w-sm
                leading-relaxed
                text-muted
              "
            >
              Production decisions are often
              made before demand becomes visible.
            </motion.p>
          </div>

          {/* VASTRA */}

          <div>
            <motion.p
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: false,
              }}
              className="
                text-sm
                uppercase
                tracking-[0.3em]
                text-maroon
              "
            >
              With VASTRA
            </motion.p>

            <div className="mt-10 space-y-8">
              {rightFlow.map((item, index) => (
                <motion.h3
                  key={item}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: false,
                  }}
                  transition={{
                    delay: index * 0.15,
                  }}
                  className="
                    font-playfair
                    text-5xl
                    text-maroon
                    md:text-6xl
                  "
                >
                  {item}
                </motion.h3>
              ))}
            </div>

            <motion.p
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
              }}
              className="
                mt-12
                max-w-sm
                leading-relaxed
                text-muted
              "
            >
              Demand signals, city intelligence,
              trend forecasting and competitor
              insights before production begins.
            </motion.p>
          </div>
        </div>

        {/* Statement */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.4,
          }}
          className="
            mt-28
            text-center
          "
        >
          <p
            className="
              font-playfair
              text-4xl
              md:text-6xl
            "
          >
            Not intuition.
            <br className="md:hidden"/>
            <span className="text-maroon">
              {" "} Intelligence.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}