<script lang="ts">
  import { base } from '$app/paths';
  import { fly } from 'svelte/transition';
  import '../app.css';

  const currentYear = new Date().getFullYear();

  let isDropdownOpen = false;

  function toggleDropdown() { isDropdownOpen = !isDropdownOpen; }
  function closeDropdown() { isDropdownOpen = false; }

  function clickOutside(node: HTMLElement) {
    const handleClick = (event: MouseEvent) => {
      if (node && !node.contains(event.target as Node)) {
        node.dispatchEvent(new CustomEvent('click_outside'));
      }
    };
    document.addEventListener('click', handleClick, true);
    return {
      destroy() { document.removeEventListener('click', handleClick, true); }
    };
  }

  // Theme Toggle
  function toggleTheme() {
    const current = document.body.getAttribute('data-bs-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-bs-theme', next);
  }
</script>

<header class="fixed-top p-3 w-100" style="pointer-events: none; z-index: 1040;">
  <nav class="container glass rounded-pill px-4 py-2 d-flex justify-content-between align-items-center shadow-sm"
       style="pointer-events: auto; max-width: 1200px;">

    <div class="d-flex align-items-center gap-3">
      <a href="{base}/" class="d-flex align-items-center gap-2 logo-group text-decoration-none" aria-label="Home">
        <img src="{base}/AxelLab-Logo.ico" alt="Logo" class="navbar-brand-logo" />
        <span class="navbar-brand-text d-none d-sm-inline">AxelBase</span>
      </a>
    </div>

    <div class="d-flex align-items-center gap-3">

      <ul class="d-none d-lg-flex list-unstyled m-0 align-items-center gap-4">
        <li><a class="nav-link-custom" href="{base}/">Home</a></li>
        <li><a class="nav-link-custom" href="{base}/#about">About</a></li>
        <li><a class="nav-link-custom" href="{base}/#how-to">How to use</a></li>
        <li><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
        <li><a class="nav-link-custom" href="{base}/blog">Blog</a></li>
      </ul>

      <!-- Buy Me a Coffee + Bitcoin Dropdown (File 1 style adapted) -->
      <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
        <button
          class="bmac-button d-flex align-items-center gap-2 px-4 py-2 rounded-pill shadow-sm"
          on:click={toggleDropdown}
          aria-label="Support options"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2,21V19H20V21H2M20,8V5H4V8H20M20,10H4V13C4,14.38 4.5,15.63 5.31,16.58L11.64,19H12.36L18.69,16.58C19.5,15.63 20,14.38 20,13V10M16,2H8V4H16V2Z" />
          </svg>
          <span class="d-none d-md-inline fw-semibold">Support</span>
        </button>

        {#if isDropdownOpen}
          <div
            class="bmac-dropdown glass mt-2"
            transition:fly={{ y: 10, duration: 220 }}
          >
            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
            >
              <span class="amount">$3</span> Coffee
            </a>
            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
            >
              <span class="amount">$5</span> Two Coffees
            </a>
            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
            >
              <span class="amount">$10</span> Big Thanks
            </a>

            <a
              href="https://buymeacoffee.com/axelbase"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
              class="custom-amount"
            >
              Custom Amount
            </a>

            <a
              href="bitcoin:bc1q3p0e6vt492m4w4fpz5m2cl4zcfuqqkgaj6myc9?label=AxelBase&message=Buy%20me%20a%20coffee"
              target="_blank"
              rel="noopener"
              on:click={closeDropdown}
              class="custom-amount bitcoin-option"
            >
              Donate via Bitcoin
            </a>
          </div>
        {/if}
      </div>

      <button
        type="button"
        class="theme-toggle-btn"
        on:click={toggleTheme}
        aria-label="Toggle dark mode"
      >
        <i class="bi bi-moon-stars-fill" id="theme-icon"></i>
      </button>

      <button class="d-lg-none btn btn-link p-0 text-dark" aria-label="Menu">
        <i class="bi bi-list fs-2" style="color: var(--color-accent);"></i>
      </button>
    </div>
  </nav>
</header>

<main class="mb-5">
  <slot />
</main>

<footer class="glass border-top py-3 mt-auto" style="position: relative; z-index: 1030;">
  <div class="container text-center">
    <small class="text-muted">© {currentYear} AxelBase Crypto ROI Calculator</small>
    <span class="mx-2">|</span>
    <a href="{base}/privacy" class="footer-link">Privacy</a>
    <span class="mx-1">•</span>
    <a href="{base}/terms" class="footer-link">Terms</a>
  </div>
</footer>

<style>
  /* ── Buy Me a Coffee Button (closer to File 1 feeling, but using theme vars) ── */
  .bmac-button {
    background: var(--color-accent);
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    transition: all 0.3s ease;
    box-shadow: 0 3px 12px rgba(var(--color-accent-rgb), 0.25);
  }

  .bmac-button:hover {
    background: var(--color-accent-hover);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(var(--color-accent-rgb), 0.35);
  }

  /* Dropdown - File 1 style + glass effect */
  .bmac-dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 240px;
    background: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
    overflow: hidden;
    z-index: 1000;
    padding: 6px 0;
  }

  .bmac-dropdown a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 11px 20px;
    color: var(--color-text-main);
    text-decoration: none;
    font-size: 0.97rem;
    transition: all 0.2s ease;
  }

  .bmac-dropdown a:hover {
    background: rgba(var(--color-accent-rgb), 0.12);
    color: var(--color-accent);
    padding-left: 28px;
  }

  .bmac-dropdown .amount {
    font-weight: 800;
    color: var(--color-accent);
    font-size: 1.12rem;
    min-width: 42px;
  }

  .bmac-dropdown .custom-amount {
    font-weight: 700;
    color: var(--color-accent);
    border-top: 1px solid rgba(var(--color-accent-rgb), 0.15);
    justify-content: center !important;
    margin-top: 4px;
    padding-top: 12px;
  }

  .bitcoin-option {
    color: #f7931a !important;
    font-weight: 700;
  }

  .bitcoin-option:hover {
    background: rgba(247, 147, 26, 0.12) !important;
  }

  /* Keep your existing nav-link-custom, theme-toggle-btn, etc. styles */
  /* ... your original styles from file 2 ... */

  .nav-link-custom {
    position: relative;
    color: var(--color-text-muted);
    font-weight: 600;
    transition: color 0.3s;
    font-size: 0.95rem;
  }

  .nav-link-custom::after {
    content: '';
    position: absolute;
    width: 0;
    height: 3px;
    bottom: -5px;
    left: 50%;
    background-color: var(--color-accent);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform: translateX(-50%);
    border-radius: 2px;
  }

  .nav-link-custom:hover {
    color: var(--color-accent);
  }

  .nav-link-custom:hover::after {
    width: 80%;
  }

  .theme-toggle-btn {
    background: transparent;
    border: 2px solid var(--color-text-muted);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-main);
    transition: all 0.3s ease;
  }

  .theme-toggle-btn:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: white;
    transform: rotate(15deg);
  }

  .footer-link {
    color: var(--color-text-muted);
    margin: 0 5px;
  }

  .footer-link:hover {
    color: var(--color-accent);
    text-decoration: underline;
  }
</style>