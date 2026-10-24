import { Link } from "react-router";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { buttonClassName } from "@/src/components/ui/button";

export function IntroPage() {
  return (
    <div className="min-h-svh bg-background-full text-text-primary">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="mx-auto flex w-full max-w-[40rem] items-center justify-between px-5 py-4">
        <a href="#main" className="font-serif text-2xl">
          Swiftradish
        </a>
        <ThemeToggle appearance="segmented" transitionDuration={200} />
      </header>
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-[40rem] px-5 pt-12 pb-16">
        <h1 className="font-serif text-4xl leading-tight font-medium min-[768px]:text-5xl">
          Publish something worth following.
        </h1>
        <p className="mt-5 text-base text-text-secondary">
          Swiftradish is a place for posts, people, and communities. Home stays quiet until you follow someone.
        </p>
        <div className="mt-8 flex flex-col gap-3 min-[768px]:flex-row">
          <Link className={buttonClassName("primary")} to="/register">
            Create account
          </Link>
          <Link className={buttonClassName("secondary")} to="/login">
            Sign in
          </Link>
        </div>
      </main>
    </div>
  );
}
