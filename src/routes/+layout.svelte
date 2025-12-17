<script lang="ts">
  import { base } from '$app/paths';
  import { fly, slide } from 'svelte/transition';
  import '../app.css';

  const paypalUsername = 'AxelLab427'; // UPDATE THIS
  const donationAmounts = [1, 3, 5, 10];
  let isDropdownOpen = false;
  let year = new Date().getFullYear();

  // Buy Me A Coffee Logic
  function toggleDropdown() { isDropdownOpen = !isDropdownOpen; }
  function closeDropdown() { isDropdownOpen = false; }

  // Click Outside Logic
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

  // Theme Toggle Logic
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
      
      <ul class="d-none d-lg-flex list-unstyled m-0 align-items-center gap-3">
        <li><a class="nav-link-custom" href="{base}/">Home</a></li>
        <li><a class="nav-link-custom" href="{base}/#about">About</a></li>
        <li><a class="nav-link-custom" href="{base}/#how-to">How to use</a></li>
        <li><a class="nav-link-custom" href="{base}/#faq">FAQ</a></li>
        <li><a class="nav-link-custom" href="{base}/blog">Blog</a></li>
      </ul>

      <div class="position-relative" use:clickOutside on:click_outside={closeDropdown}>
        <button class="bmac-button" on:click={toggleDropdown}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12.35,22.2L12,22A10,10,0,0,1,2,12V10A2,2,0,0,1,4,8H7.2A5.13,5.13,0,0,1,12,3A5.13,5.13,0,0,1,16.8,8H20A2,2,0,0,1,22,10V12A10,10,0,0,1,12.35,22.2M4,10V12A8,8,0,0,0,12,20A8,8,0,0,0,20,12V10H16.8A5.11,5.11,0,0,1,12.5,5.12A5.15,5.15,0,0,1,7.2,10H4Z"/>
          </svg>
          <span class="d-none d-md-inline">Donate</span>
        </button>

        {#if isDropdownOpen}
          <div class="bmac-dropdown glass" transition:fly={{ y: 10, duration: 250 }}>
            {#each donationAmounts as amount}
              <a href="https://paypal.me/{paypalUsername}/{amount}" target="_blank" rel="noopener noreferrer" on:click={closeDropdown}>
                ${amount}
              </a>
            {/each}
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
    <small class="text-muted">© {year} AxelBase Crypto ROI Calculator</small>
    <span class="mx-2">|</span>
    <a href="{base}/privacy" class="footer-link">Privacy</a>
    <span class="mx-1">•</span>
    <a href="{base}/terms" class="footer-link">Terms</a>
  </div>
</footer>

<style>
  /* Navbar Brand Animation */
  .navbar-brand-logo { height: 35px; width: auto; transition: transform 0.3s ease; }
  .logo-group:hover .navbar-brand-logo { transform: rotate(15deg) scale(1.1); }
  
  /* Navigation Links */
  .nav-link-custom { 
    position: relative; 
    color: var(--color-text-muted); 
    font-weight: 600; 
    transition: color 0.3s;
    font-size: 0.95rem;
  }
  .nav-link-custom::after { 
    content: ''; position: absolute; width: 0; height: 3px; 
    bottom: -5px; left: 50%; background-color: var(--color-accent); 
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
    transform: translateX(-50%); border-radius: 2px; 
  }
  .nav-link-custom:hover { color: var(--color-accent); }
  .nav-link-custom:hover::after { width: 80%; }

  /* BMAC Button */
  .bmac-button {
    background: linear-gradient(135deg, #FFD700, #FFA500); /* Gold Gradient */
    color: #3d3d3d; border: none; border-radius: 30px;
    padding: 8px 16px; font-weight: 700; display: flex; align-items: center; gap: 8px;
    transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(255, 215, 0, 0.3);
  }
  .bmac-button svg { width: 18px; height: 18px; }
  .bmac-button:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 6px 15px rgba(255, 215, 0, 0.5); }
  
  /* BMAC Dropdown */
  .bmac-dropdown {
    position: absolute; top: 120%; right: 0; min-width: 100px;
    border-radius: 15px; padding: 5px; display: flex; flex-direction: column; gap: 2px;
  }
  .bmac-dropdown a {
    display: block; padding: 8px 12px; border-radius: 10px;
    text-align: center; font-weight: bold; color: var(--color-accent);
  }
  .bmac-dropdown a:hover { background: rgba(255,255,255,0.5); }

  /* Theme Toggle Button */
  .theme-toggle-btn {
    background: transparent; border: 2px solid var(--color-text-muted);
    border-radius: 50%; width: 40px; height: 40px;
    display: flex; align-items: center; justify-content: center;
    color: var(--color-text-main); transition: all 0.3s ease;
  }
  .theme-toggle-btn:hover {
    background: var(--color-accent); border-color: var(--color-accent); color: #fff;
    transform: rotate(15deg);
  }
  #theme-icon { transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
  
  /* Theme Icon Rotation logic */
  :global([data-bs-theme="dark"]) #theme-icon { transform: rotate(360deg); }
  :global([data-bs-theme="dark"]) .bi-moon-stars-fill::before { content: "\f1d5"; /* Change to Sun icon code if desired, or keep moon */ }

  /* Footer Links */
  .footer-link { color: var(--color-text-muted); margin: 0 5px; }
  .footer-link:hover { color: var(--color-accent); text-decoration: underline; }
</style>