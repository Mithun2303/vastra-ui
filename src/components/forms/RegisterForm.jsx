import SocialLogin from "./SocialLogin";

export default function RegisterForm({ onSwitch }) {
    return (
        <>
            <div className="text-center">
                <h2 className="font-playfair text-5xl font-semibold">
                    Join VASTRA.
                </h2>

                <p className="mt-4 text-muted">
                    Start making fashion decisions with confidence.
                </p>
            </div>

            <SocialLogin />

            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="h-14 w-full rounded-2xl border border-black/10 px-5"
                />

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

                <button
                    type="submit"
                    className="h-14 w-full rounded-2xl bg-maroon text-white"
                >
                    Create Account
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