<!-- src/routes/+page.svelte (Updated with About, How to Use, and FAQ sections) -->

<script lang="ts">
    import { base } from '$app/paths';
    import { fade, fly } from 'svelte/transition';
</script>

<div class="container mt-5 pt-4">
    <div class="row justify-content-center">
        <div class="col-md-10 col-lg-8">
            <div class="glass-card p-5 text-center mb-5" in:fly={{ y: 50, duration: 1000, delay: 200 }}>
                <h1 class="display-4 mb-3">Crypto ROI Calculator</h1>
                <p class="lead text-muted mb-4">
                    Maximize your strategy. A simple, smooth tool to calculate your cryptocurrency investment Return on Investment (ROI) in-depth.
                </p>
                <div>
                    <a href="{base}/calculator" class="btn btn-primary btn-lg px-5">Start Calculating</a>
                </div>
            </div>
        </div>
    </div>
</div>

<section id="about" class="container py-5 scroll-margin-offset" in:fade={{ duration: 800, delay: 400 }}>
    <div class="glass-card p-4">
        <h2 class="mb-3"><i class="bi bi-info-circle-fill me-2"></i>About the Crypto ROI Calculator</h2>
        <p>
            The Crypto ROI Calculator is a powerful, privacy-focused web tool designed to provide cryptocurrency investors with accurate and transparent performance analysis. Built entirely client-side using modern JavaScript frameworks, it ensures that all your financial data—such as purchase prices, quantities, fees, and holding periods—remains securely on your device. No information is ever transmitted to servers, making it ideal for handling sensitive investment details.
        </p>
        <p>
            Unlike basic ROI calculators that only show price change percentages, this tool incorporates real-world factors that significantly impact returns. It accounts for transaction fees from exchanges and networks, which can erode profits substantially. The calculator also computes properly annualized returns using compounding formulas, allowing fair comparisons across different holding periods. This is especially valuable in crypto, where short-term gains can appear misleading without time adjustment.
        </p>
        <p>
            Advanced features include breakeven analysis to determine the exact price needed for full recovery after fees, target ROI planning to reverse-engineer required sale prices for specific goals, and a built-in Monte Carlo simulator that runs 10,000 price path scenarios using Geometric Brownian Motion. This risk assessment helps investors understand probability of success, expected outcomes, and worst-case Value at Risk (VaR) under various volatility assumptions.
        </p>
        <p>
            The interface is intuitive and responsive, with real-time updates as you adjust inputs. Multiple currency support and detailed breakdowns make it suitable for both novice and experienced users. Whether you're evaluating past trades, planning exits, or assessing long-term holding strategies, this calculator delivers professional-grade insights without subscriptions or data collection.
        </p>
        <p>
            We believe in empowering investors with accurate tools that promote informed decisions in the volatile crypto market. By combining simplicity with depth, the Crypto ROI Calculator helps you move beyond guesswork to data-driven strategy.
        </p>
    </div>
</section>

<section id="how-to" class="container py-5 scroll-margin-offset">
    <div class="glass-card p-4">
        <h2 class="mb-3"><i class="bi bi-gear-wide-connected me-2"></i>How to Use the Calculator</h2>
        <p>
            Getting started with the Crypto ROI Calculator is straightforward. The tool is designed to be intuitive, requiring no registration or setup—just open it in your browser and begin.
        </p>
        <div class="row text-center mt-4">
            <div class="col-md-4 mb-3">
                <div class="step-circle mb-3">1</div>
                <h5>Navigate to Calculator</h5>
                <p class="small text-muted">
                    From the homepage, click "Start Calculating" or navigate directly to the calculator section. The interface loads instantly with all fields ready for input.
                </p>
            </div>
            <div class="col-md-4 mb-3">
                <div class="step-circle mb-3">2</div>
                <h5>Enter Your Investment Details</h5>
                <p class="small text-muted">
                    Fill in the required fields: Initial Investment amount, Purchase Price per unit, Sale/Current Price per unit, and Quantity of units. Add optional Transaction Fees and Holding Period in days for more precise analysis. Select your preferred currency (USD, EUR, GBP) if needed.
                </p>
            </div>
            <div class="col-md-4 mb-3">
                <div class="step-circle mb-3">3</div>
                <h5>Review Results Instantly</h5>
                <p class="small text-muted">
                    Click "Calculate ROI" to see comprehensive results: basic ROI, annualized ROI (if holding period provided), net profit/loss, breakeven price, and visual profit breakdown. Use the Target ROI slider to find required sale prices for custom goals.
                </p>
            </div>
        </div>
        <div class="row text-center mt-4">
            <div class="col-md-4 mb-3">
                <div class="step-circle mb-3">4</div>
                <h5>Explore Advanced Features</h5>
                <p class="small text-muted">
                    Toggle the Monte Carlo simulator section to run 10,000 price path simulations. Adjust volatility, time horizon, and target ROI to assess probability of success and risk metrics like Value at Risk.
                </p>
            </div>
            <div class="col-md-4 mb-3">
                <div class="step-circle mb-3">5</div>
                <h5>Share and Save</h5>
                <p class="small text-muted">
                    Use the "Copy Shareable Link" button to share your exact calculation. Optionally save inputs locally for later editing. All data stays private on your device.
                </p>
            </div>
            <div class="col-md-4 mb-3">
                <div class="step-circle mb-3">6</div>
                <h5>Interpret and Iterate</h5>
                <p class="small text-muted">
                    Review detailed breakdowns, cautionary notes for extreme results, and educational explanations. Adjust inputs to test scenarios and refine your investment strategy.
                </p>
            </div>
        </div>
    </div>
</section>

<section id="faq" class="container py-5 mb-5 scroll-margin-offset">
    <div class="glass-card p-4">
        <h2 class="mb-3"><i class="bi bi-question-circle-fill me-2"></i>Frequently Asked Questions</h2>
        <div class="accordion accordion-flush" id="faqAccordion">
            <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed glass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne">
                        Is the Crypto ROI Calculator completely free?
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        Yes, the tool is 100% free to use with no hidden fees, subscriptions, or ads. It will remain free indefinitely as an open-source project.
                    </div>
                </div>
            </div>

            <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed glass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo">
                        Does it work offline?
                    </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        Yes! Once loaded in your browser, the calculator functions completely offline. All calculations, including the Monte Carlo simulator, run locally with no internet required.
                    </div>
                </div>
            </div>

            <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed glass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree">
                        Is my investment data secure?
                    </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        Absolutely. The tool is fully client-side—your inputs never leave your device. No data is collected, stored, or transmitted. Optional local storage for saved calculations is private to your browser.
                    </div>
                </div>
            </div>

            <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed glass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour">
                        How accurate are the calculations?
                    </button>
                </h2>
                <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        Calculations use standard financial formulas and are mathematically accurate. However, results depend on your inputs and assumptions (e.g., volatility for simulations). They are for educational purposes only—not financial advice.
                    </div>
                </div>
            </div>

            <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed glass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive">
                        Can I use it for leveraged trading?
                    </button>
                </h2>
                <div id="flush-collapseFive" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        Yes. Enter your actual equity investment amount—the calculator correctly reflects returns on your invested capital, including fee impacts.
                    </div>
                </div>
            </div>

            <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed glass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix">
                        What does the Monte Carlo simulator do?
                    </button>
                </h2>
                <div id="flush-collapseSix" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        It runs 10,000 simulated price paths using Geometric Brownian Motion to estimate probabilities of achieving targets, expected profits, and risk metrics like Value at Risk. It's a powerful way to understand uncertainty.
                    </div>
                </div>
            </div>

            <div class="accordion-item bg-transparent">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed glass" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven">
                        Is there a mobile app?
                    </button>
                </h2>
                <div id="flush-collapseSeven" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div class="accordion-body">
                        Currently web-only, but fully responsive and works excellently on mobile browsers. Add to home screen for app-like experience.
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .scroll-margin-offset {
        scroll-margin-top: 100px;
    }

    .step-circle {
        width: 50px; height: 50px;
        background: var(--color-accent);
        color: #fff;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-weight: bold; font-size: 1.2rem;
        margin: 0 auto;
        box-shadow: 0 4px 10px rgba(100, 28, 52, 0.4);
    }

    .accordion-button {
        background: rgba(255,255,255,0.3);
        border-radius: 15px !important;
        color: var(--color-text-main);
        box-shadow: none;
    }
    .accordion-button:not(.collapsed) {
        background-color: var(--color-accent);
        color: white;
        box-shadow: 0 4px 15px rgba(100, 28, 52, 0.2);
    }
    .accordion-button::after {
        transition: filter 0.3s;
    }
    .accordion-button:not(.collapsed)::after {
        filter: brightness(0) invert(1);
    }
</style>