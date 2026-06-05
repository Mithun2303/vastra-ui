import { motion } from "framer-motion";
import { NAV_LINKS } from "../../constants/data";

export default function Navbar() {
    return (
        <motion.nav
            initial={{
                y: -60,
                opacity: 0,
            }}
            animate={{
                y: 0,
                opacity: 1,
            }}
            transition={{
                duration: 0.6,
            }}
            className="
        fixed
        top-0
        left-0
        right-0
        z-40
        border-b
        border-maroon/10
        bg-cream/90
        backdrop-blur-xl
      "
        >
            <div
                className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-6
          py-4
        "
            >
                <h1
                    className="
            font-playfair
            text-2xl
            font-bold
            tracking-[0.15em]
            text-charcoal
          "
                >
                    <span>VAS</span>
                    <span className="text-maroon">TRA</span>
                </h1>

                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((item) => (
                        <button
                            key={item}
                            className="
                text-sm
                text-muted
                transition-colors
                duration-300
                hover:text-maroon
              "
                        >
                            {item}
                        </button>
                    ))}
                </div>

                <button
                    className="
            rounded-xl
            bg-maroon
            px-5
            py-2
            text-sm
            font-medium
            text-white
            transition-all
            hover:scale-105
          "
                >
                    Join Waitlist
                </button>
            </div>
        </motion.nav>
    );
}