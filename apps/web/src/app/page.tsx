import { eventNames } from "@synphere/analytics";
import { projectConfig } from "@synphere/config";
import { productPillars } from "@synphere/domain";
import { brandPalette } from "@synphere/ui";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Synphere scaffold</p>
        <h1>Social music discovery, now on a clean monorepo foundation.</h1>
        <p className="lede">
          This repository starts with the product spec, shared package boundaries,
          and a minimal Next.js app aligned with the serverless architecture.
        </p>
      </section>

      <section className="grid">
        <article className="card">
          <h2>Core Pillars</h2>
          <ul>
            {productPillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Configured Domain</h2>
          <p>{projectConfig.siteUrl}</p>
          <p className="muted">Target production domain for the hosted service.</p>
        </article>

        <article className="card">
          <h2>Initial Analytics Events</h2>
          <ul>
            {eventNames.map((eventName) => (
              <li key={eventName}>{eventName}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>Brand Tokens</h2>
          <div className="swatches">
            {brandPalette.map((color) => (
              <div key={color.name} className="swatch">
                <span
                  aria-hidden="true"
                  className="swatch-chip"
                  style={{ backgroundColor: color.value }}
                />
                <span>{color.name}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
