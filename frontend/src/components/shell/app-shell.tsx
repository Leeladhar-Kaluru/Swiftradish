import { Link, Outlet } from "react-router";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { DestinationNav } from "@/src/components/shell/destination-nav";

export function AppShell() {
  return (
    <div className="min-h-svh bg-background-full text-text-primary">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="min-[1280px]:grid min-[1280px]:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="hidden min-h-svh border-e border-border-button-default px-4 py-6 min-[1280px]:block">
          <Link to="/home" className="block px-3 text-xl font-semibold">
            Swiftradish
          </Link>
          <nav aria-label="Primary" className="mt-8">
            <DestinationNav placement="rail" />
          </nav>
        </aside>
        <div className="min-w-0">
          <header className="flex items-center justify-between gap-4 px-5 py-4 min-[1280px]:justify-end">
            <Link to="/home" className="text-xl font-semibold min-[1280px]:hidden">
              Swiftradish
            </Link>
            <ThemeToggle appearance="segmented" transitionDuration={200} />
          </header>
          <main id="main" tabIndex={-1} className="mx-auto w-full max-w-[40rem] px-5 pb-24 min-[1280px]:pb-16">
            <Outlet />
          </main>
        </div>
      </div>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 border-t border-border-button-default bg-background-full px-3 py-2 min-[1280px]:hidden"
      >
        <DestinationNav placement="bar" />
      </nav>
    </div>
  );
}
