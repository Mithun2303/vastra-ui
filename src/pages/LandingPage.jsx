import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import SplashScreen from "../components/hero/SplashScreen";
import Hero from "../components/hero/Hero";
import Marquee from "../components/hero/Marquee";

import SignalsSection from "../sections/SignalsSection";
import PersonasSection from "../sections/PersonasSection";
import StorySection from "../sections/StorySection";
import FoundersSection from "../sections/FoundersSection";
import WaitlistSection from "../sections/WaitlistSection";

export default function LandingPage() {
    const [splashDone, setSplashDone] =
        useState(false);

    return (
        <div className="min-h-screen overflow-x-hidden bg-cream">
            <SplashScreen
                onComplete={() =>
                    setSplashDone(true)
                }
            />

            <AnimatePresence>
                {splashDone && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <Navbar />

                        <Hero />

                        <Marquee />

                        <SignalsSection />

                        <PersonasSection />

                        <StorySection />

                        <FoundersSection />

                        <WaitlistSection />

                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}