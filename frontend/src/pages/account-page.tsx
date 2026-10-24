import { Avatar } from "@/components/base/avatar/avatar";

export function AccountPage() {
  return (
    <section className="flex flex-col gap-4" aria-labelledby="account-title">
      <div className="flex items-center gap-4">
        <Avatar initials="S" size="lg" color="neutral" />
        <h1 id="account-title" className="text-2xl font-semibold">
          Account
        </h1>
      </div>
      <p className="text-base text-text-secondary">
        Your profile will live here after sign-in is connected. Nothing on this page is saved yet.
      </p>
    </section>
  );
}
