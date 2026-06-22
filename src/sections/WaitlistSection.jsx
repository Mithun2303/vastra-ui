
import FeedbackForm from "../components/forms/FeedbackForm";

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="mx-auto max-w-4xl px-6 py-24">
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-charcoal
          p-8
          md:p-12
        "
      >
        <div
          className="
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-maroon/20
          "
        />

        <div className="relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-maroon">
            Get Early Access
          </p>

          <h2
            className="
              mt-3
              font-playfair
              text-4xl
              font-bold
              text-white
            "
          >
            Join The TRYND Waitlist
          </h2>

          <p className="mt-4 text-neutral-400">
            Be among the first brands
            using intelligence-first
            fashion planning.
          </p>

          <div className="mt-10">
            <FeedbackForm />
          </div>
        </div>
      </div>
    </section>
  );
}