import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "@/lib/mockApi";
import SocialLogin from "./SocialLogin";

export default function RegisterForm({ onSwitch }) {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser({ name, mobile_number: mobileNumber, email, password });
      nav("/onboarding");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="font-playfair text-5xl font-semibold">
          Join TRYND.
        </h2>

        <p className="mt-4 text-muted">
          Start making fashion decisions with confidence.
        </p>
      </div>

      <SocialLogin />

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-14 w-full rounded-2xl border border-black/10 px-5 outline-none focus:border-maroon"
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
          className="h-14 w-full rounded-2xl border border-black/10 px-5 outline-none focus:border-maroon"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-14 w-full rounded-2xl border border-black/10 px-5 outline-none focus:border-maroon"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-14 w-full rounded-2xl border border-black/10 px-5 outline-none focus:border-maroon"
        />

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-14 w-full rounded-2xl bg-maroon text-white transition-all hover:scale-[1.01] disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-muted">
          Already have an account?
        </span>

        <button
          onClick={onSwitch}
          className="ml-2 font-medium text-maroon"
        >
          Sign In
        </button>
      </div>
    </>
  );
}