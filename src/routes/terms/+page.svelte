<!-- src/routes/terms/+page.svelte -->

<script lang="ts">
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>Terms and Conditions | Crypto ROI Calculator</title>
  <meta name="description" content="Read the terms of use for the In-Depth Crypto ROI Calculator, a free client-side tool for cryptocurrency investment analysis." />
  <meta property="og:title" content="Terms and Conditions | Crypto ROI Calculator" />
  <meta property="og:description" content="Read the terms of use for the In-Depth Crypto ROI Calculator, a free client-side tool for cryptocurrency investment analysis." />
  <meta property="og:url" content="{base}/terms" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="container fade-in post-layout">
  <div class="breadcrumbs">
    <a href="{base}/">Home</a>
    <span>/</span>
    <p>Terms and Conditions</p>
  </div>

  <article class="prose">
    <h1>Terms and Conditions</h1>

    <p class="post-meta">Effective Date: December 17, 2025</p>

    <h2>1. Acceptance of Terms</h2>
    <p>By accessing or using the <strong>In-Depth Crypto ROI Calculator</strong> (the "Tool"), you agree to be bound by these Terms and Conditions. This free, open-source, client-side web utility is provided for informational and educational purposes only. If you do not agree with any part of these terms, please refrain from using the Tool.</p>

    <h2>2. Nature of the Tool</h2>
    <p>The Tool performs calculations entirely in your browser using JavaScript. It includes features for ROI computation, breakeven analysis, target planning, and Monte Carlo risk simulation. All results are generated locally based on user-provided inputs and mathematical models.</p>

    <h2>3. No Financial Advice</h2>
    <p><strong>The Tool does not provide financial, investment, or trading advice.</strong> Calculations and simulations are simplified mathematical representations and should not be considered recommendations. Cryptocurrency investing involves substantial risk, including the potential for complete loss of capital. You are solely responsible for your investment decisions.</p>

    <h2>4. Accuracy and Limitations</h2>
    <p>While we strive for mathematical accuracy, the Tool uses standard financial formulas and assumptions (such as Geometric Brownian Motion for simulations) that may not reflect real market conditions. Results are estimates only and past performance does not guarantee future outcomes. We make no warranties regarding accuracy, completeness, or suitability for any purpose.</p>

    <h2>5. User Responsibilities</h2>
    <p>You agree to:</p>
    <ul>
      <li>Provide accurate inputs for meaningful results.</li>
      <li>Use the Tool only for lawful purposes.</li>
      <li>Accept that outputs are for educational use and not professional advice.</li>
      <li>Not hold the developers liable for any losses resulting from use.</li>
    </ul>

    <h2>6. Intellectual Property</h2>
    <p>The Tool is open-source and freely available. Code may be viewed, forked, or modified under applicable open-source licenses. Commercial redistribution or creation of derivative paid products requires attribution and compliance with licensing terms.</p>

    <h2>7. Disclaimer of Warranties</h2>
    <p>The Tool is provided "as is" without warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee uninterrupted access or error-free operation.</p>

    <h2>8. Limitation of Liability</h2>
    <p>To the fullest extent permitted by law, the developers shall not be liable for any direct, indirect, incidental, or consequential damages arising from use of the Tool, including financial losses from investment decisions informed by its outputs.</p>

    <h2>9. Changes to Terms</h2>
    <p>We reserve the right to modify these Terms at any time. Continued use after changes constitutes acceptance of the new terms.</p>

    <p class="italic-note">Use responsibly—<strong>knowledge empowers, but risk remains yours</strong>.</p>
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