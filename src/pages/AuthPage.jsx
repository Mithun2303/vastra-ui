import { motion } from "framer-motion";
import { useState } from "react";
import heroBg from "@/assets/hero-bg.jpeg"; // fashion image

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-cream lg:grid lg:grid-cols-2">
            {/* Left Visual */}

            <div className="relative hidden overflow-hidden lg:block">
                <img
                    src={heroBg}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-white/30" />

                <div className="relative z-10 flex h-full flex-col justify-between p-16">
                    <div>
                        <p className="text-sm uppercase tracking-[0.45em] text-maroon">
                            VASTRA
                        </p>
                    </div>

                    <div>
                        <h1 className="font-playfair text-7xl font-bold leading-none text-charcoal">
                            Fashion
                            <br />
                            Intelligence.
                        </h1>

                        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
                            Demand signals, city intelligence,
                            trend forecasting and competitor
                            monitoring for modern fashion brands.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {[
                            "Demand Signals",
                            "City Intelligence",
                            "Trend Forecasting",
                            "Competitor Monitoring",
                        ].map((item) => (
                            <div
                                key={item}
                                className="flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-charcoal"
                            >
                                <span className="h-1 w-1 rounded-full bg-maroon" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}

            <div className="flex items-center justify-center px-6 py-12">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="
            w-full
            max-w-md
            rounded-[32px]
            border
            border-black/5
            bg-white/80
            p-8
            backdrop-blur-xl
            md:p-10
          "
                >
                    {/* Mobile Logo */}

                    <div className="mb-8 text-center lg:hidden">
                        <p className="text-xs uppercase tracking-[0.4em] text-maroon">
                            VASTRA
                        </p>
                    </div>

                    {/* Header */}

                    <div className="text-center">
                        <motion.h2
                            initial={{
                                opacity: 0,
                                y: 40,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.8,
                                delay: 0.3,
                            }}
                            className="
    font-playfair
    text-5xl
    font-bold
  "
                        >
                            {isLogin
                                ? "Welcome back."
                                : "Join VASTRA."}
                        </motion.h2>
                        <p className="mt-4 text-muted">
                            {isLogin
                                ? "Continue building with intelligence."
                                : "Start making fashion decisions with confidence."}
                        </p>
                    </div>

                    {/* Social */}

                    <div className="mt-10 space-y-3">
                        <button
                            className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-black/10
                bg-white
                transition-all
                hover:bg-black/[0.02]
              "
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                                />
                            </svg>

                            Continue with Google
                        </button>

                        <button
                            className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-3
                rounded-2xl
                border
                border-black/10
                bg-white
                transition-all
                hover:bg-black/[0.02]
              "
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.36-1.09-.45-2.08-.47-3.22 0-1.43.61-2.18.43-3.04-.36C2.83 15.4 3.56 8.02 8.94 7.73c1.31.07 2.22.72 2.99.78 1.15-.23 2.24-.89 3.47-.8 1.48.12 2.59.71 3.33 1.75-3.07 1.84-2.34 5.84.47 7.01-.56 1.38-1.28 2.74-2.15 3.81zM11.84 7.68c-.15-2.05 1.53-3.73 3.44-3.89.26 2.16-1.46 3.84-3.44 3.89z" />
                            </svg>

                            Continue with Apple
                        </button>
                    </div>

                    {/* Divider */}

                    <div className="my-8 flex items-center">
                        <div className="h-px flex-1 bg-black/10" />
                        <span className="px-4 text-sm text-muted">
                            or
                        </span>
                        <div className="h-px flex-1 bg-black/10" />
                    </div>

                    {/* Form */}

                    <form className="space-y-4">
                        {!isLogin && (
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="
                  h-14
                  w-full
                  rounded-2xl
                  border
                  border-black/10
                  bg-white/60
                  px-5
                  outline-none
                  transition-all
                  focus:border-maroon
                "
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Email Address"
                            className="
                h-14
                w-full
                rounded-2xl
                border
                border-black/10
                bg-white/60
                px-5
                outline-none
                transition-all
                focus:border-maroon
              "
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="
                h-14
                w-full
                rounded-2xl
                border
                border-black/10
                bg-white/60
                px-5
                outline-none
                transition-all
                focus:border-maroon
              "
                        />

                        {isLogin && (
                            <div className="text-right">
                                <button
                                    type="button"
                                    className="text-sm text-maroon"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="
                h-14
                w-full
                rounded-2xl
                bg-maroon
                font-medium
                text-white
                transition-all
                hover:scale-[1.01]
              "
                        >
                            {isLogin
                                ? "Sign In"
                                : "Create Account"}
                        </button>
                    </form>

                    {/* Toggle */}

                    <div className="mt-8 text-center text-sm">
                        <span className="text-muted">
                            {isLogin
                                ? "Don't have an account?"
                                : "Already have an account?"}
                        </span>

                        <button
                            onClick={() =>
                                setIsLogin(!isLogin)
                            }
                            className="
                ml-2
                font-medium
                text-maroon
              "
                        >
                            {isLogin
                                ? "Register"
                                : "Sign In"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}