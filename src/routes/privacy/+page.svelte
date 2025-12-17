<!-- src/routes/privacy/+page.svelte -->

<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Privacy Policy | Crypto ROI Calculator</title>
  <meta name="description" content="Learn how the In-Depth Crypto ROI Calculator protects your privacy with a fully client-side, no-data-collection approach." />
  <meta property="og:title" content="Privacy Policy | Crypto ROI Calculator" />
  <meta property="og:description" content="Learn how the In-Depth Crypto ROI Calculator protects your privacy with a fully client-side, no-data-collection approach." />
  <meta property="og:url" content="{base}/privacy" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Privacy Policy</p>
  </div>

  <article class="prose">
    <h1>Privacy Policy</h1>

    <p class="post-meta">Effective Date: December 17, 2025</p>

    <h2>1. Introduction</h2>
    <p>Welcome to the <strong>In-Depth Crypto ROI Calculator</strong>, a completely client-side web utility designed to help cryptocurrency investors accurately measure returns, analyze risk, and plan strategies. We prioritize your privacy above everything else. This tool operates <strong>entirely in your browser</strong>, meaning <strong>no data is ever collected, stored, or transmitted</strong> to any server. This Privacy Policy explains our commitment to protecting your information through a strict no-collection approach.</p>

    <h2>2. Information We Do Not Collect</h2>
    <p>The calculator is built with privacy as the core principle. We do not gather any information from users, including:</p>
    <ul>
      <li><strong>Personal data</strong>: Names, email addresses, IP addresses, or any identifiers.</li>
      <li><strong>Investment details</strong>: All inputs such as purchase prices, quantities, fees, or holding periods remain exclusively on your device.</li>
      <li><strong>Usage analytics</strong>: No tracking of page views, feature usage, or session duration.</li>
      <li><strong>Simulation data</strong>: Monte Carlo results and other calculations are processed locally and never shared.</li>
    </ul>
    <p>Because everything runs client-side using JavaScript, your sensitive financial scenarios stay private by design.</p>

    <h2>3. How the Tool Operates</h2>
    <p>When you use the calculator:</p>
    <ul>
      <li><strong>All processing happens locally</strong>: ROI calculations, breakeven analysis, target planning, and Monte Carlo simulations execute directly in your browser.</li>
      <li><strong>No server communication</strong>: Inputs are never sent over the internet to us or any third party.</li>
      <li><strong>Local storage is optional and temporary</strong>: Saved calculations use your browser’s localStorage only for convenience and are cleared when you choose.</li>
    </ul>
    <p>This architecture ensures <strong>complete data isolation</strong>—we have no access to your information at any point.</p>

    <h2>4. Third-Party Services</h2>
    <p>We do not integrate analytics providers, advertising networks, or external tracking services. The tool loads only necessary Bootstrap CSS/JS from a public CDN for styling and functionality, but these resources do not collect personal data or track usage.</p>

    <h2>5. Cookies and Tracking</h2>
    <p>The calculator <strong>does not use cookies</strong>, local beacons, or any tracking technologies. Your experience is completely stateless beyond optional local storage for your own convenience.</p>

    <h2>6. Security and Responsibility</h2>
    <p>While we collect nothing, we recommend using the tool on secure, updated devices and browsers. Exported results or copied data become your responsibility once shared externally.</p>

    <h2>7. Changes to This Policy</h2>
    <p>We may update this Privacy Policy occasionally. Changes will be reflected here with the new effective date. Continued use constitutes acceptance of the updated terms.</p>

    <h2>8. Contact</h2>
    <p>For questions about this policy, please open an issue on our public GitHub repository.</p>

    <p class="italic-note">Your privacy is built into the foundation of this tool—<strong>zero data collection, always</strong>.</p>
  </article>
</div>

<style>
  .post-layout {
    max-width: 800px;
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  .breadcrumbs a {
    color: var(--accent-secondary);
  }
  .breadcrumbs a:hover {
    text-decoration: underline;
  }
  .breadcrumbs p {
    margin: 0;
  }

  .prose {
    line-height: 1.8;
  }

  .prose .post-meta {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 1rem;
  }

  .prose h1, .prose h2 {
    color: var(--accent-secondary);
  }

  .prose h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .prose h2 {
    margin-top: 2.5rem;
    border-bottom: 1px solid var(--secondary-bg);
    padding-bottom: 0.5rem;
  }

  .prose p {
    color: var(--text-primary);
  }

  .prose ul {
    list-style-type: '→ ';
    padding-left: 1.5rem;
    color: var(--text-primary);
  }
  .prose ul li::marker {
    color: var(--accent-primary);
  }
  .prose ul li {
    padding-left: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .prose .italic-note {
    font-style: italic;
    color: var(--text-secondary);
    text-align: center;
    margin-top: 3rem;
  }
</style>