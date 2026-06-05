import FounderCard from "../components/cards/FounderCard";
import FadeUp from "../components/ui/FadeUp";
import Aishwarya from "@/assets/Aishwarya.jpeg"
import Kanishka from "@/assets/Kanishka.jpeg"
import FounderSlide from "@/components/ui/FounderSlide";
const founders = [
    {
        name: "Kanishka",
        title: "Co-Founder & CEO",
        img: Kanishka,
        bio: "Fashion entrepreneur with deep experience in South India's garment ecosystem.",
    },
    {
        name: "Aishwarya",
        title: "Co-Founder & CTO",
        img: Aishwarya,
        bio: "Engineer and consumer insights specialist focused on retail intelligence.",
    },
];


export default function FoundersSection() {
    return (
        <section className="overflow-hidden bg-white py-32">
            <div className="mx-auto max-w-7xl px-6 justify-center flex flex-col items-center">
                {/* Eyebrow */}
                <p className="text-center text-sm uppercase tracking-[0.4em] text-maroon">
                    The Founders
                </p>

                {/* Headline */}
                <h2
                    className="
            mt-4
            text-center
            font-playfair
            text-5xl
            font-bold
            leading-tight
            text-charcoal
            md:text-6xl
            lg:text-7xl
          "
                >
                    Built by women.
                    <br />
                    Built for fashion.
                </h2>

                {/* Desktop */}
                <div className="mt-10 md:w-1/2 space-y-4 flex md:flex-nowrap flex-wrap items-center justify-center gap-10">
                    {founders.map((founder, index) => (
                        <div className="md:max-w-[750px] md:max-h-[900px]">
                            <FounderSlide
                                key={founder.name}
                                founder={founder}
                                index={index}
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile Apple-style swipe */}
                
                {/* <div className="mt-6 text-center md:hidden">
                    <span className="text-xs uppercase tracking-[0.3em] text-muted">
                        Swipe →
                    </span>
                </div> */}
                <p
                    className="
            mx-auto
            mt-10
            max-w-4xl
            text-center
            text-lg
            leading-relaxed
            text-muted
            md:text-xl
          "
                >
                    One understands fashion.
                    One understands technology.
                    Together, they're building the intelligence layer
                    for South India's fashion brands.
                </p>
            </div>

        </section>
    );
}