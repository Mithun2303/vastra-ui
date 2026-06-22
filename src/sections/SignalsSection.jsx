import { motion } from "framer-motion";

const flow = [
  {
    question: "Is demand growing?",
    answer: "Demand Signals",
    description:
      "Track weddings, festivals, weather patterns and seasonal demand shifts before inventory decisions are made.",
  },
  {
    question: "Which cities?",
    answer: "City Intelligence",
    description:
      "Understand hyper-local demand across South India and identify where collections will perform best.",
  },
  {
    question: "What are competitors doing?",
    answer: "AI Brand Recognition",
    description:
      "Monitor pricing, launches, product categories and competitor movements automatically.",
  },
  {
    question: "What should we create?",
    answer: "Reel Intelligence",
    description:
      "Discover emerging trends and generate content directions backed by market activity.",
  },
  {
    question: "When should we launch?",
    answer: "Weather & Wedding Signals",
    description:
      "Align campaigns and inventory with upcoming events and seasonal demand peaks.",
  },
];

export default function SignalsSection() {
  return (
    <section
      id="intelligence"
      className="
        relative
        overflow-hidden
        bg-[#faf7f2]
        py-32
      "
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}

        <div className="text-center">
          <p
            className="
              text-sm
              uppercase
              tracking-[0.4em]
              text-maroon
            "
          >
            Platform Intelligence
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
            Know before
            <br />
            you make.
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              text-muted
            "
          >
            Every production decision starts
            with a question. TRYND provides
            the intelligence needed before
            capital is committed.
          </p>
        </div>

        {/* Start */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.5,
          }}
          className="
            mt-24
            text-center
          "
        >
          <p
            className="
              font-playfair
              text-4xl
              font-bold
              md:text-6xl
            "
          >
            You want to launch
            <br />
            a collection.
          </p>
        </motion.div>

        {/* Flow */}

        <div className="mt-20">
          {flow.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.4,
              }}
              transition={{
                duration: 0.8,
                delay: 0.1,
              }}
              className="
                relative
                flex
                flex-col
                items-center
              "
            >
              {/* Connector */}

              <motion.div
                initial={{
                  scaleY: 0,
                }}
                whileInView={{
                  scaleY: 1,
                }}
                viewport={{
                  once: false,
                }}
                transition={{
                  duration: 0.8,
                }}
                className="
                  h-20
                  w-px
                  origin-top
                  bg-maroon/30
                "
              />

              {/* Question */}

              <p
                className="
                  text-xl
                  text-muted
                  md:text-2xl
                "
              >
                {item.question}
              </p>

              {/* Arrow */}

              <div
                className="
                  my-6
                  text-maroon
                "
              >
                ↓
              </div>

              {/* Capability */}

              <div
                className="
                  max-w-2xl
                  rounded-[32px]
                  border
                  border-maroon/10
                  bg-white
                  px-8
                  py-10
                  text-center
                  shadow-sm
                "
              >
                <h3
                  className="
                    font-playfair
                    text-3xl
                    font-bold
                    text-charcoal
                    md:text-5xl
                  "
                >
                  {item.answer}
                </h3>

                <p
                  className="
                    mx-auto
                    mt-4
                    max-w-xl
                    text-muted
                  "
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final Node */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: false,
          }}
          className="
            mt-20
            text-center
          "
        >
          <div className="mb-8 text-maroon">
            ↓
          </div>

          <div
            className="
              inline-flex
              items-center
              rounded-full
              bg-maroon
              px-10
              py-5
              text-xl
              font-semibold
              text-white
            "
          >
            Launch.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
