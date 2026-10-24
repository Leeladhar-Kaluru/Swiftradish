import { type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { Button } from "@/src/components/ui/button";
import { TextField } from "@/src/components/ui/text-field";

function AuthFrame({
  title,
  children,
  alternateHref,
  alternateLabel,
}: {
  title: string;
  children: ReactNode;
  alternateHref: string;
  alternateLabel: string;
}) {
  return (
    <div className="min-h-svh bg-background-full text-text-primary">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="mx-auto flex w-full max-w-[40rem] items-center justify-between px-5 py-4">
        <Link to="/" className="font-serif text-2xl">
          Swiftradish
        </Link>
        <ThemeToggle appearance="segmented" transitionDuration={200} />
      </header>
      <main id="main" tabIndex={-1} className="mx-auto w-full max-w-[40rem] px-5 pt-8 pb-16">
        <h1 className="font-serif text-4xl leading-tight font-medium">{title}</h1>
        {children}
        <p className="mt-6 text-base">
          <Link to={alternateHref} className="font-medium text-[var(--swiftradish-link)]">
            {alternateLabel}
          </Link>
        </p>
      </main>
    </div>
  );
}

function stopSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

export function LoginPage() {
  return (
    <AuthFrame title="Sign in" alternateHref="/register" alternateLabel="Create account">
      <form className="mt-8 flex flex-col gap-5" onSubmit={stopSubmit} noValidate>
        <TextField id="login-email" label="Email" name="email" type="email" autoComplete="email" />
        <TextField
          id="login-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled aria-describedby="login-unavailable">
            Sign in
          </Button>
          <p id="login-unavailable" className="text-base text-text-secondary">
            Sign in connects in the next phase.
          </p>
        </div>
      </form>
    </AuthFrame>
  );
}

export function RegisterPage() {
  return (
    <AuthFrame title="Create account" alternateHref="/login" alternateLabel="Sign in">
      <form className="mt-8 flex flex-col gap-5" onSubmit={stopSubmit} noValidate>
        <TextField id="register-name" label="Display name" name="name" type="text" autoComplete="nickname" />
        <TextField id="register-email" label="Email" name="email" type="email" autoComplete="email" />
        <TextField
          id="register-password"
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        <div className="flex flex-col gap-2">
          <Button type="submit" disabled aria-describedby="register-unavailable">
            Create account
          </Button>
          <p id="register-unavailable" className="text-base text-text-secondary">
            Create account connects in the next phase.
          </p>
        </div>
      </form>
    </AuthFrame>
  );
}
