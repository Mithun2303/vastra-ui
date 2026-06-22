import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/lib/mockApi";
import SocialLogin from "./SocialLogin";

export default function LoginForm({ onSwitch }) {
  const nav = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(identifier, password);
      if (res.onboarding_complete) {
        nav("/dashboard");
      } else {
        nav("/onboarding");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h2 className="font-playfair text-5xl font-bold">
          Welcome back.
        </h2>

        <p className="mt-4 text-muted">
          Continue building with intelligence.
        </p>
      </div>

      <SocialLogin />

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="text"
          placeholder="Email or Mobile Number"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-maroon"
          >
            Forgot Password?
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="h-14 w-full rounded-2xl bg-maroon text-white transition-all hover:scale-[1.01] disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-muted">
          Don't have an account?
        </span>

        <button
          onClick={onSwitch}
          className="ml-2 font-medium text-maroon"
        >
          Register
        </button>
      </div>
    </>
  );
}