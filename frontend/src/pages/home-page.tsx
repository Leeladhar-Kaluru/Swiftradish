export function HomePage() {
  return (
    <section className="flex flex-col gap-3" aria-labelledby="home-empty-title">
      <h1 id="home-empty-title" className="text-2xl font-semibold">
        Your home is empty.
      </h1>
      <p className="text-base text-text-secondary">
        Follow someone to see their posts here. Following arrives in the next phase, so home stays quiet for now.
      </p>
    </section>
  );
}
