import { useState } from "react";
import { motion } from "framer-motion";
import { CITIES } from "../../constants/data";

export default function FeedbackForm() {
    const [submitted, setSubmitted] =
        useState(false);

    const [form, setForm] = useState({
        name: "",
        brand: "",
        city: "",
        role: "",
        message: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true);
    }

    if (submitted) {
        return (
            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.95,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                className="
          py-16
          text-center
        "
            >
                <div className="mb-6 text-5xl">
                    ✦
                </div>

                <h3
                    className="
            font-playfair
            text-4xl
            text-white
          "
                >
                    You're on the list.
                </h3>

                <p
                    className="
            mt-4
            text-neutral-400
          "
                >
                    We'll reach out when VASTRA
                    launches.
                </p>
            </motion.div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="
        grid
        gap-4
      "
        >
            <input
                required
                placeholder="Your Name"
                value={form.name}
                onChange={(e) =>
                    setForm({
                        ...form,
                        name: e.target.value,
                    })
                }
                className="input"
            />

            <input
                required
                placeholder="Brand Name"
                value={form.brand}
                onChange={(e) =>
                    setForm({
                        ...form,
                        brand: e.target.value,
                    })
                }
                className="input"
            />

            <select
                required
                className="input"
                value={form.city}
                onChange={(e) =>
                    setForm({
                        ...form,
                        city: e.target.value,
                    })
                }
            >
                <option value="">
                    Select City
                </option>

                {CITIES.map((city) => (
                    <option key={city}>
                        {city}
                    </option>
                ))}
            </select>

            <textarea
                rows={5}
                placeholder="Tell us about your brand..."
                className="input resize-none"
            />

            <button
                type="submit"
                className="
          mt-4
          rounded-xl
          bg-maroon
          px-8
          py-4
          font-semibold
          text-white
          transition-all
          hover:scale-105
        "
            >
                Request Early Access →
            </button>
        </form>
    );
}