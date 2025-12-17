<!-- src/routes/blog/+page.svelte  (Blog Index Page) -->

<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    {
      href: '/blog/posts/post1',
      title: 'Introduction to the In-Depth Crypto ROI Calculator',
      description: 'Discover how this powerful client-side tool helps you accurately calculate cryptocurrency returns, including fees, compounding, and annualized performance.'
    },
    {
      href: '/blog/posts/post2',
      title: 'Understanding ROI vs Annualized ROI in Crypto',
      description: 'Learn the difference between basic ROI and properly annualized returns using compounding — essential for comparing investments over different time periods.'
    },
    {
      href: '/blog/posts/post3',
      title: 'How Transaction Fees Impact Your Real Returns',
      description: 'A deep dive into how exchange fees, withdrawal costs, and network fees reduce your actual profit — and why including them matters.'
    },
    {
      href: '/blog/posts/post4',
      title: 'Breakeven Analysis: When Will You Recover Your Investment?',
      description: 'Explore how to calculate the exact price you need to reach to break even after fees — crucial for risk management and setting realistic targets.'
    },
    {
      href: '/blog/posts/post5',
      title: 'Using Target ROI to Plan Your Exit Strategy',
      description: 'Learn how to reverse-engineer sale prices needed to achieve specific return goals like 2x, 5x, or custom percentages.'
    },
    {
      href: '/blog/posts/post6',
      title: 'Monte Carlo Simulation for Crypto Risk Assessment',
      description: 'An introduction to the built-in 10,000-path simulator that models future price uncertainty using Geometric Brownian Motion.'
    },
    {
      href: '/blog/posts/post7',
      title: 'Interpreting Probability and Value at Risk (VaR) Results',
      description: 'Understand what the simulation outputs mean: probability of success, expected profit, worst-case scenarios, and how to use them wisely.'
    }
  ];
</script>

<svelte:head>
  <title>Blog | Crypto ROI Calculator Insights</title>
  <meta name="description" content="In-depth articles, guides, and technical explanations about cryptocurrency ROI calculation, risk modeling, and investment analysis." />
</svelte:head>

<div class="container fade-in blog-index">
  <header class="blog-header">
    <h1><i class="bi bi-journal-richtext"></i> Blog: ROI Insights</h1>
    <p class="subtitle">
      Technical guides, explanations, and best practices for understanding cryptocurrency returns using the In-Depth Crypto ROI Calculator. 
      From basic calculations to advanced Monte Carlo risk simulation — all running entirely in your browser.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card">
        <div class="card-body">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-description">{post.description}</p>
          <span class="read-more">Read Article &rarr;</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2rem;
  }

  .blog-header h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .post-card {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .post-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  .post-card .card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .post-title {
    font-size: 1.25rem;
    color: var(--accent-secondary);
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .post-description {
    color: var(--text-secondary);
    flex-grow: 1;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .read-more {
    color: var(--accent-primary);
    font-weight: 600;
    align-self: flex-start;
    transition: var(--transition-fast);
  }

  .post-card:hover .read-more {
    transform: translateX(5px);
  }
</style>