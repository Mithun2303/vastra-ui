import Google from "@/assets/icons/Google.svg";
import Apple from "@/assets/icons/Apple.svg";

export default function SocialLogin() {
  return (
    <>
      <div className="mt-6 flex items-center justify-center w-full gap-4">
        <button className="group flex h-14 -14 flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white transition-all hover:shadow-lg">
          <img
            src={Google}
            alt="Google"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          />
        </button>

        <button className="group flex h-14 flex-1 items-center justify-center rounded-2xl border border-black/10 bg-white transition-all hover:shadow-lg">
          <img
            src={Apple}
            alt="Apple"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          />
        </button>
      </div>
      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-black/10" />
        <span className="px-4 text-sm text-muted">or</span>
        <div className="h-px flex-1 bg-black/10" />
      </div>

    </>
  );
}