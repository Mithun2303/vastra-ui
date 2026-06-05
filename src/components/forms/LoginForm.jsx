import SocialLogin from "./SocialLogin";

export default function LoginForm({ onSwitch }) {
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

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email Address"
          className="h-14 w-full rounded-2xl border border-black/10 px-5"
        />

        <input
          type="password"
          placeholder="Password"
          className="h-14 w-full rounded-2xl border border-black/10 px-5"
        />

        <div className="text-right">
          <button
            type="button"
            className="text-sm text-maroon"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="h-14 w-full rounded-2xl bg-maroon text-white"
        >
          Sign In
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