import { Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h2 className="font-playfair text-4xl font-bold tracking-[0.25em] text-white">
              TRYND
            </h2>

            <p className="mt-3 text-xs uppercase tracking-[0.35em] text-maroon">
              Vol. I · South India Edition
            </p>

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-neutral-400">
              Fashion intelligence platform helping brands understand demand,
              trends, consumer behavior, and market opportunities across South
              India.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Contact
            </h3>

            <div className="space-y-4">
              <a
                href="mailto:hello@vastra.in"
                className="flex items-center gap-3 text-neutral-400 transition hover:text-white"
              >
                <Mail size={16} />
                <span>hello@vastra.in</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-neutral-400 transition hover:text-white"
              >
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.25em] text-white">
              Connect
            </h3>

            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-full border border-white/10
                  text-neutral-400 transition-all duration-300
                  hover:border-maroon hover:text-white
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-full border border-white/10
                  text-neutral-400 transition-all duration-300
                  hover:border-maroon hover:text-white
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1.02 4.6 1.02 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1.5 8h3V22h-3V8zm7 0h2.88v1.91h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V22h-3v-7.04c0-1.68-.03-3.84-2.34-3.84-2.34 0-2.7 1.83-2.7 3.72V22h-3V8z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-neutral-500 md:flex-row">
            <p>© 2026 TRYND. All rights reserved.</p>

            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </a>

              <a href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}