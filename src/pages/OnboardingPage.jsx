import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import { saveBrand } from "@/lib/mockApi";

const cities = [
  "Tirupur",
  "Coimbatore",
  "Erode",
  "Madurai",
  "Kerala",
  "Multiple Cities",
];

const categories = [
  { icon: "👗", name: "Kurtis" },
  { icon: "🪡", name: "Coords" },
  { icon: "👘", name: "Salwar Sets" },
  { icon: "🎀", name: "Tops" },
  { icon: "🧣", name: "Dupattas" },
  { icon: "💫", name: "Occasion Wear" },
  { icon: "🥻", name: "Sarees", comingSoon: true },
  { icon: "✂️", name: "Unstitched", comingSoon: true },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [brandName, setBrandName] = useState("");
  const [city, setCity] = useState("");
  const [asp, setAsp] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-cream px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto w-full max-w-6xl">

        <h1
          className="
            font-playfair
            text-2xl
            font-bold
            tracking-[0.15em]
            text-charcoal
          "
        >
          <span>TR</span>
          <span className="text-maroon">YND</span>
        </h1>
        {/* Progress */}

        <div className="my-4">
          <div className="flex justify-between text-xs uppercase tracking-[0.25em] text-muted mb-3">
            <span>Brand Profile</span>
            <span>Product Focus</span>
          </div>

          <div className="h-1 rounded-full bg-black/5 overflow-hidden">
            <div
              className={`h-full bg-maroon transition-all duration-500 ${step === 1 ? "w-1/2" : "w-full"
                }`}
            />
          </div>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8 lg:grid-cols-2 mt-6"
          >
            {/* Form */}

            <div className="rounded-3xl border border-black/5 bg-white p-8">
              <p className="text-xs uppercase tracking-[0.4em] text-maroon">
                Step 01
              </p>

              <h1 className="mt-4 font-playfair text-3xl font-bold sm:text-4xl lg:text-5xl">
                Tell us about your brand.
              </h1>

              <p className="mt-4 text-muted">
                We'll personalise demand signals, competitor tracking,
                trend forecasting and market intelligence for your
                business.
              </p>

              <div className="mt-10 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Brand Name
                  </label>

                  <input
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="e.g. Kavitha Collections"
                    className="h-14 w-full rounded-2xl border border-black/10 px-5 outline-none focus:border-maroon"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Primary Market
                  </label>

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-black/10 px-5 outline-none focus:border-maroon"
                  >
                    <option value="">Select Market</option>

                    {cities.map((city) => (
                      <option key={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Average Selling Price
                  </label>

                  <input
                    value={asp}
                    onChange={(e) => setAsp(e.target.value)}
                    placeholder="₹799"
                    className="h-14 w-full rounded-2xl border border-black/10 px-5 outline-none focus:border-maroon"
                  />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="mt-10 h-14 w-full rounded-2xl bg-maroon text-white transition hover:scale-[1.01]"
              >
                Continue to Product Categories →
              </button>
            </div>

            {/* Preview */}

            <div className="rounded-3xl border border-maroon/10 bg-gradient-to-br from-maroon/5 to-transparent p-8">
              <p className="text-xs uppercase tracking-[0.35em] text-maroon">
                Your TRYND Profile
              </p>

              <div className="mt-8">
                <h2 className="font-playfair text-4xl font-bold">
                  {brandName || "Your Brand"}
                </h2>

                <div className="mt-8 space-y-4">
                  <div className="flex justify-between border-b border-black/5 pb-4">
                    <span className="text-muted">Market</span>
                    <span>{city || "Not selected"}</span>
                  </div>

                  <div className="flex justify-between border-b border-black/5 pb-4">
                    <span className="text-muted">Price Tier</span>
                    <span>{asp ? `₹${asp}` : "Not set"}</span>
                  </div>
                </div>

                <div className="mt-10 rounded-2xl bg-white p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-maroon">
                    We Will Track
                  </p>

                  <ul className="mt-4 space-y-3 text-sm">
                    <li>✓ Local demand shifts</li>
                    <li>✓ Competitor pricing</li>
                    <li>✓ Fashion trend movements</li>
                    <li>✓ Festival opportunities</li>
                    <li>✓ Market demand signals</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 lg:grid-cols-[1fr_320px] mt-6"
          >
            {/* LEFT SECTION */}

            <div className="flex flex-col rounded-3xl border border-black/5 bg-white p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-maroon">
                  Step 02 of 02
                </p>

                <h1 className="mt-1 font-playfair text-3xl font-bold">
                  What do you create?
                </h1>

                <p className="mt-1 text-xs text-muted">
                  Select the categories your brand actively designs and sells.
                </p>
              </div>

              {/* Categories */}

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {categories.map((category) => (
                  <button
  key={category.name}
  disabled={category.comingSoon}
  onClick={() => toggleCategory(category.name)}
  className={`
    group
    relative
    h-20
    overflow-hidden
    rounded-2xl
    border
    p-3
    transition-all
    duration-300
    ease-out

    ${
      selectedCategories.includes(category.name)
        ? "border-maroon bg-maroon text-white shadow-lg shadow-maroon/20"
        : "border-black/10 bg-white hover:-translate-y-1 hover:border-maroon/30 hover:shadow-xl hover:shadow-black/5"
    }

    ${category.comingSoon ? "cursor-not-allowed opacity-50" : ""}
  `}
>
  {/* Hover Gradient */}
  <div
    className="
      absolute
      inset-0
      bg-gradient-to-br
      from-maroon/5
      to-transparent
      opacity-0
      transition-opacity
      duration-300
      group-hover:opacity-100
    "
  />

  {category.comingSoon && (
    <span
      className="
        absolute
        right-2
        top-2
        z-10
        rounded-full
        bg-black/10
        px-2
        py-0.5
        text-[9px]
        uppercase
      "
    >
      V2
    </span>
  )}

  <div
    className="
      relative
      text-xl
      transition-transform
      duration-300
      group-hover:scale-110
      group-hover:-translate-y-0.5
    "
  >
    {category.icon}
  </div>

  <div
    className="
      relative
      mt-1
      text-xs
      font-medium
      transition-all
      duration-300
      group-hover:tracking-wide
    "
  >
    {category.name}
  </div>
</button>
                ))}
              </div>

              {/* Footer Actions */}

              <div className="mt-auto flex flex-col md:flex-row  md:flex-nowrap flex-wrap gap-4 pt-6">
                <button
                  onClick={() => setStep(1)}
                  className="
            h-12
            flex-1
            rounded-2xl
            border
            p-4
            md:p-0
            border-black/10
            bg-white
            font-medium
          "
                >
                  ← Back
                </button>

                <button
                  onClick={async () => {
                    setSaving(true);
                    try {
                      const categoryMap = {
                        "Kurtis": "kurtis",
                        "Coords": "coords",
                        "Salwar Sets": "salwar_sets",
                        "Tops": "tops",
                        "Dupattas": "dupattas",
                        "Occasion Wear": "occasion_wear",
                        "Sarees": "sarees",
                        "Unstitched": "unstitched"
                      };
                      const mappedCategories = selectedCategories.map(c => categoryMap[c] || c.toLowerCase());
                      const email = localStorage.getItem("user_email") || "ravi@example.com";
                      const mobile_number = localStorage.getItem("user_mobile") || "9876543210";

                      await saveBrand({
                        brand_name: brandName,
                        primary_city: city,
                        avg_selling_price: Number(asp) || 1299,
                        categories: mappedCategories,
                        mobile_number,
                        email,
                      });
                      navigate("/dashboard");
                    } catch (err) {
                      console.error("Failed to save brand:", err);
                      // Still navigate for dev convenience
                      localStorage.setItem("jwt_token", "dev-temp-token");
                      navigate("/dashboard");
                    } finally {
                      setSaving(false);
                    }
                  }}
                  disabled={saving}
                  className="
            h-12
            flex-[2]
            rounded-2xl
            bg-maroon
            p-4
            md:p-0
            font-medium
            text-white
            transition-all
            hover:scale-[1.01]
          "
                >
                  Unlock My Market Insights →
                </button>
              </div>
            </div>

            {/* RIGHT SECTION */}

            <div
              className="
        flex
        flex-col
        rounded-3xl
        border
        border-maroon/10
        bg-gradient-to-br
        from-maroon/5
        to-transparent
        p-6
      "
            >
              <p className="text-xs uppercase tracking-[0.35em] text-maroon">
                Brand Summary
              </p>

              <h2 className="mt-4 font-playfair text-3xl font-bold">
                {brandName || "Your Brand"}
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between border-b border-black/5 pb-3">
                  <span className="text-sm text-muted">
                    Market
                  </span>

                  <span className="text-sm font-medium">
                    {city || "Not Selected"}
                  </span>
                </div>

                <div className="flex justify-between border-b border-black/5 pb-3">
                  <span className="text-sm text-muted">
                    Avg. Selling Price
                  </span>

                  <span className="text-sm font-medium">
                    {asp ? `₹${asp}` : "Not Set"}
                  </span>
                </div>
              </div>

              {/* Categories */}

              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.25em] text-muted">
                  Product Focus
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedCategories.length > 0 ? (
                    selectedCategories.map((category) => (
                      <span
                        key={category}
                        className="
                  rounded-full
                  bg-maroon
                  px-3
                  py-1.5
                  text-xs
                  text-white
                "
                      >
                        {category}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted">
                      Select categories
                    </span>
                  )}
                </div>
              </div>

              {/* Intelligence */}

              <div className="mt-4 rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-maroon">
                  Included Intelligence
                </p>

                <div className="mt-3 space-y-2 text-xs">
                  <div>✓ Demand Signals</div>
                  <div>✓ Competitor Monitoring</div>
                  <div>✓ Trend Forecasting</div>
                  <div>✓ Pricing Intelligence</div>
                  <div>✓ Festival Opportunities</div>
                  <div>✓ Weather-Based Demand</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}