<script>
    import { base } from '$app/paths';
    import { page } from '$app/stores';
    import { tick } from 'svelte';
    import { slide, fade, fly } from 'svelte/transition';
    import { calculateBasicROI, calculateAnnualizedROI, calculateNetProfit, formatNumber, calculateBreakevenPrice, calculateSalePriceForTargetROI, convertToCurrency, getCurrencySymbol } from '$lib/calculator';

    const params = $page.url.searchParams;

    const initialInvestment = parseFloat(params.get('initial') || '0');
    const purchasePrice = parseFloat(params.get('purchase') || '0');
    const salePrice = parseFloat(params.get('sale') || '0');
    const quantity = parseFloat(params.get('qty') || '0');
    const fees = parseFloat(params.get('fees') || '0');
    const holdingPeriodDays = parseFloat(params.get('days') || '0');
    const currency = params.get('currency') || 'USD';

    const convInitial = convertToCurrency(initialInvestment, currency);
    const convPurchase = convertToCurrency(purchasePrice, currency);
    const convSale = convertToCurrency(salePrice, currency);
    const convFees = convertToCurrency(fees, currency);
    const currSymbol = getCurrencySymbol(currency);

    const basicROI = calculateBasicROI(initialInvestment, purchasePrice, salePrice, quantity, fees);
    const netProfit = calculateNetProfit(purchasePrice, salePrice, quantity, fees);
    const convNetProfit = convertToCurrency(netProfit, currency);
    const annualizedROI = calculateAnnualizedROI(basicROI, holdingPeriodDays);

    const breakevenPrice = calculateBreakevenPrice(initialInvestment, purchasePrice, quantity, fees);
    const convBreakeven = convertToCurrency(breakevenPrice, currency);
    const aboveBreakeven = salePrice - breakevenPrice;
    const convAbove = convertToCurrency(aboveBreakeven, currency);

    let targetROI = 50;
    $: requiredSalePrice = calculateSalePriceForTargetROI(initialInvestment, purchasePrice, quantity, fees, targetROI);
    $: convRequiredSale = convertToCurrency(requiredSalePrice, currency);
    $: requiredProfit = (targetROI / 100) * initialInvestment;
    $: convRequiredProfit = convertToCurrency(requiredProfit, currency);

    const grossGains = (salePrice - purchasePrice) * quantity;
    const totalForBar = Math.max(grossGains, 0);
    const netGainsPercent = totalForBar > 0 ? ((grossGains - fees) / totalForBar) * 100 : 0;
    const feesPercent = totalForBar > 0 ? (fees / totalForBar) * 100 : 100;

    const breakdownText = `
Crypto ROI Breakdown – ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

Inputs (${currency}):
• Initial Investment: ${currSymbol}${formatNumber(convInitial)}
• Purchase Price per Unit: ${currSymbol}${formatNumber(convPurchase)}
• Sale Price per Unit: ${currSymbol}${formatNumber(convSale)}
• Quantity: ${formatNumber(quantity)}
• Transaction Fees: ${currSymbol}${formatNumber(convFees)}
• Holding Period: ${holdingPeriodDays > 0 ? holdingPeriodDays + ' days' : 'N/A'}

Calculations:
1. Gross Gains = (Sale Price - Purchase Price) × Quantity = ${currSymbol}${formatNumber(convertToCurrency(grossGains, currency))}
2. Net Profit = Gross Gains - Fees = ${currSymbol}${formatNumber(convertToCurrency(grossGains - fees, currency))}
3. Basic ROI = ${formatNumber(basicROI)}%
`.trim();

    let showLinkCopied = false;
    let showBreakdownCopied = false;

    async function copyLink() {
        await navigator.clipboard.writeText(window.location.href);
        showLinkCopied = true;
        setTimeout(() => showLinkCopied = false, 2000);
    }

    async function copyBreakdown() {
        await navigator.clipboard.writeText(breakdownText);
        showBreakdownCopied = true;
        setTimeout(() => showBreakdownCopied = false, 2000);
    }

    let showBreakdown = false;
    let showWarning = true;

    // === MONTE CARLO RISK SIMULATOR ===
    let showMonteCarlo = false;
    let mcTargetROI = 100;      
    let mcVolatility = 80;      
    let mcTimeHorizon = 365;      
    let mcSimulations = 10000;    
    let mcResults = null;
    let mcRunning = false;

    async function runMonteCarlo() {
        mcRunning = true;
        mcResults = null;
        await tick();
        const targetPrice = calculateSalePriceForTargetROI(initialInvestment, purchasePrice, quantity, fees, mcTargetROI);
        const mu = holdingPeriodDays > 0 ? Math.log(1 + basicROI / 100) / (holdingPeriodDays / 365) : 0;
        const sigma = mcVolatility / 100;
        const T = mcTimeHorizon / 365;
        const dt = 1 / 365;
        const steps = Math.round(T / dt);
        let hits = 0;
        let finalProfits = [];
        for (let i = 0; i < mcSimulations; i++) {
            let price = salePrice;
            for (let j = 0; j < steps; j++) {
                const Z = gaussianRandom();
                price = price * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * Z);
            }
            const profit = (price - purchasePrice) * quantity - fees;
            finalProfits.push(profit);
            if (price >= targetPrice) hits++;
        }
        finalProfits.sort((a, b) => a - b);
        mcResults = {
            probability: formatNumber((hits / mcSimulations) * 100),
            expected: formatNumber(convertToCurrency(finalProfits.reduce((a, b) => a + b, 0) / mcSimulations, currency)),
            var95: formatNumber(convertToCurrency(finalProfits[Math.floor(0.05 * mcSimulations)], currency)),
            median: formatNumber(convertToCurrency(finalProfits[Math.floor(0.5 * mcSimulations)], currency)),
            worst: formatNumber(convertToCurrency(finalProfits[0], currency)),
            best: formatNumber(convertToCurrency(finalProfits[mcSimulations - 1], currency))
        };
        mcRunning = false;
    }

    function gaussianRandom() {
        const u = 1 - Math.random();
        const v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }
</script>

<div class="container mt-5 pt-3">
    
    <div class="d-flex justify-content-between align-items-center mb-4" in:fly={{ y: -20, duration: 600 }}>
        <h2 class="fw-bold mb-0">ROI Results ({currency})</h2>
        <a href="{base}/calculator?{params.toString()}" class="btn btn-outline-secondary rounded-pill">
            <i class="bi bi-pencil-fill me-1"></i> Edit
        </a>
    </div>

    <div class="glass-card mb-4 p-4 text-center" in:fly={{ y: 20, duration: 800 }}>
        <div class="row g-3">
            <div class="col-md-4">
                <div class="p-3 rounded-4 h-100 d-flex flex-column justify-content-center" style="background: rgba(var(--color-accent-rgb), 0.08);">
                    <small class="text-uppercase fw-bold opacity-60">Basic ROI</small>
                    <div class="display-4 fw-bold {basicROI >= 0 ? 'text-success' : 'text-danger'}">
                        {formatNumber(basicROI)}<span class="fs-4">%</span>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="p-3 rounded-4 h-100 d-flex flex-column justify-content-center" style="background: rgba(var(--color-accent-rgb), 0.04);">
                    <small class="text-uppercase fw-bold opacity-60">Net Profit</small>
                    <div class="fs-2 fw-bold {netProfit >= 0 ? 'text-success' : 'text-danger'}">
                        {currSymbol}{formatNumber(convNetProfit)}
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="p-3 rounded-4 h-100 d-flex flex-column justify-content-center" style="background: rgba(var(--color-accent-rgb), 0.04);">
                    <small class="text-uppercase fw-bold opacity-60">Annualized ROI</small>
                    <div class="fs-3 fw-semibold">
                        {#if holdingPeriodDays > 0 && annualizedROI !== null}
                            {annualizedROI === Infinity ? '∞' : formatNumber(annualizedROI) + '%'}
                        {:else}
                            <span class="fs-6 opacity-40">Enter holding days</span>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>

{#if showWarning && (basicROI > 500 || (annualizedROI !== null && (annualizedROI > 10000 || annualizedROI === Infinity)))}
    <div class="alert alert-dismissible fade show glass-card mb-4 shadow-lg custom-warning"
         role="alert" in:slide>
        <div class="d-flex align-items-start gap-3">
            <i class="bi bi-exclamation-triangle-fill fs-3 warning-icon flex-shrink-0"></i>
            <div class="flex-grow-1">
                <strong class="warning-title d-block mb-2">
                    Very high returns detected!
                </strong>
                <ul class="mb-2 small warning-list">
                    <li>Leverage or very small equity compared to position size?</li>
                    <li>Possible typo? (e.g. quantity 2 instead of 0.02 for BTC?)</li>
                    <li>Short holding period + huge price jump?</li>
                </ul>
                <p class="small mb-0 warning-note">
                    <em>These returns are mathematically correct but extremely rare in real markets.  
                    Double-check your inputs – extreme numbers usually mean extreme risk!</em>
                </p>
            </div>
        </div>
        <button type="button" class="warning-close"
                aria-label="Close warning" on:click={() => showWarning = false}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
{/if}
    <div class="row">
        <div class="col-lg-6">
            <div class="glass-card mb-4 p-4 h-100" in:fly={{ x: -20, duration: 800, delay: 200 }}>
                <h5 class="mb-3"><i class="bi bi-graph-up-arrow me-2 text-primary"></i>Profit Breakdown</h5>
                <div class="progress rounded-pill mb-3" style="height: 25px; background: rgba(var(--color-accent-rgb), 0.1);">
                    {#if grossGains > 0}
                        <div class="progress-bar bg-success" style="width: {netGainsPercent}%;" title="Net Gains"></div>
                        <div class="progress-bar bg-warning" style="width: {feesPercent}%;" title="Fees"></div>
                    {:else}
                        <div class="progress-bar bg-danger" style="width: 100%;"></div>
                    {/if}
                </div>
                <div class="d-flex justify-content-between small mb-3">
                    <span class="text-success"><i class="bi bi-circle-fill small"></i> Net: {currSymbol}{formatNumber(convertToCurrency(grossGains - fees, currency))}</span>
                    <span class="text-warning"><i class="bi bi-circle-fill small"></i> Fees: {currSymbol}{formatNumber(convFees)}</span>
                </div>
                <hr class="opacity-25 my-3">
                <h5 class="mb-2">Breakeven Price</h5>
                <div class="fs-4 fw-bold">{currSymbol}{formatNumber(convBreakeven)} <span class="fs-6 opacity-50 fw-normal">/ unit</span></div>
                {#if aboveBreakeven > 0}
                    <p class="text-success fw-bold small"><i class="bi bi-check-circle-fill"></i> Safe by {currSymbol}{formatNumber(convAbove)}</p>
                {:else if aboveBreakeven < 0}
                    <p class="text-danger fw-bold small"><i class="bi bi-x-circle-fill"></i> Under by {currSymbol}{formatNumber(Math.abs(convAbove))}</p>
                {:else}
                    <p class="text-info small">At breakeven</p>
                {/if}
            </div>
        </div>

        <div class="col-lg-6">
            <div class="glass-card mb-4 p-4 h-100" in:fly={{ x: 20, duration: 800, delay: 200 }}>
                <h5 class="mb-3"><i class="bi bi-crosshair me-2 text-danger"></i>Target Planner</h5>
                <label for="targetROI" class="form-label d-flex justify-content-between fw-bold">
                    <span>Goal ROI</span>
                    <span class="text-primary">{targetROI}%</span>
                </label>
                <input type="range" class="form-range" id="targetROI" min="10" max="500" step="5" bind:value={targetROI}>
                <div class="mt-4 p-3 rounded-4" style="background: rgba(var(--color-accent-rgb), 0.05);">
                    <div class="row text-center">
                        <div class="col-6 border-end border-secondary border-opacity-25">
                            <small class="opacity-50 d-block">Sell Price</small>
                            <strong class="text-primary fs-5">{currSymbol}{formatNumber(convRequiredSale)}</strong>
                        </div>
                        <div class="col-6">
                            <small class="opacity-50 d-block">Est. Profit</small>
                            <strong class="text-success fs-5">{currSymbol}{formatNumber(convRequiredProfit)}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="glass-card mb-4 p-0 overflow-hidden" in:fly={{ y: 20, duration: 800, delay: 300 }}>
        <button class="w-100 p-3 d-flex justify-content-between align-items-center bg-transparent border-0 text-start" 
                on:click={() => showBreakdown = !showBreakdown}
                style="color: var(--color-text-main);">
            <h5 class="mb-0"><i class="bi bi-list-columns-reverse me-2"></i>Full Math Breakdown</h5>
            <i class="bi bi-chevron-{showBreakdown ? 'up' : 'down'}"></i>
        </button>
        {#if showBreakdown}
            <div class="p-3 border-top border-secondary border-opacity-25" transition:slide>
                <div class="position-relative">
                    <pre class="p-3 rounded-4" style="background: rgba(var(--color-accent-rgb), 0.05); border: 1px solid var(--glass-border); font-family: 'SFMono-Regular', monospace; font-size: 0.85rem; white-space: pre-wrap; color: var(--color-text-main);">{breakdownText}</pre>
                    <button on:click={copyBreakdown} class="position-absolute top-0 end-0 m-2 btn btn-sm btn-dark shadow-sm">
                        {#if showBreakdownCopied}<i class="bi bi-check-lg text-success"></i>{:else}<i class="bi bi-clipboard"></i>{/if}
                    </button>
                </div>
            </div>
        {/if}
    </div>

    <div class="glass-card mb-5 overflow-hidden" 
         style="background: var(--glass-bg); color: var(--color-text-main); border: 1px solid rgba(var(--color-accent-rgb), 0.2);" 
         in:fly={{ y: 30, duration: 1000, delay: 400 }}>
        <div class="p-3 d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-50">
            <h5 class="mb-0 d-flex align-items-center gap-2">
                <span class="badge bg-danger rounded-pill">PRO</span>
                Monte Carlo Risk Simulator
            </h5>
            <button class="btn btn-sm btn-outline-primary rounded-pill px-3" on:click={() => showMonteCarlo = !showMonteCarlo}>
                {showMonteCarlo ? 'Hide' : 'Open Simulator'}
            </button>
        </div>

        {#if showMonteCarlo}
            <div class="p-4" transition:slide>
                <p class="small opacity-75 mb-4">
                    Using <strong>Geometric Brownian Motion</strong> (GBM), we simulate 10,000 distinct price paths to forecast probabilities based on historical volatility.
                </p>

                <div class="row g-3 mb-4">
                    <div class="col-6 col-md-3">
                        <label for="mcTargetROI" class="form-label small opacity-60 fw-bold">Target ROI (%)</label>
                        <input id="mcTargetROI" type="number" class="form-control" bind:value={mcTargetROI} step="10">
                    </div>
                    <div class="col-6 col-md-3">
                        <label for="mcVolatility" class="form-label small opacity-60 fw-bold">Volatility (%)</label>
                        <input id="mcVolatility" type="number" class="form-control" bind:value={mcVolatility} step="10">
                    </div>
                    <div class="col-6 col-md-3">
                        <label for="mcTimeHorizon" class="form-label small opacity-60 fw-bold">Days Out</label>
                        <input id="mcTimeHorizon" type="number" class="form-control" bind:value={mcTimeHorizon} step="30">
                    </div>
                    <div class="col-6 col-md-3 d-flex align-items-end">
                        <button type="button" on:click={runMonteCarlo} class="btn btn-danger w-100 rounded-pill fw-bold" disabled={mcRunning}>
                            {#if mcRunning}
                                <span class="spinner-border spinner-border-sm me-2"></span>
                            {:else}
                                <i class="bi bi-play-fill"></i> Run Sim
                            {/if}
                        </button>
                    </div>
                </div>

                {#if mcResults}
                    <div class="row g-3 mb-3" in:fade>
                        <div class="col-md-4">
                            <div class="p-3 rounded-4 text-center h-100" style="background: rgba(25, 135, 84, 0.1); border: 1px solid rgba(25, 135, 84, 0.2);">
                                <h2 class="text-success mb-0 fw-bold">{mcResults.probability}%</h2>
                                <small class="opacity-60 text-uppercase fw-bold" style="font-size: 0.7rem;">Probability</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="p-3 rounded-4 text-center h-100" style="background: rgba(13, 110, 253, 0.1); border: 1px solid rgba(13, 110, 253, 0.2);">
                                <h3 class="text-primary mb-0 fw-bold">{currSymbol}{mcResults.expected}</h3>
                                <small class="opacity-60 text-uppercase fw-bold" style="font-size: 0.7rem;">Exp. Profit</small>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="p-3 rounded-4 text-center h-100" style="background: rgba(255, 193, 7, 0.1); border: 1px solid rgba(255, 193, 7, 0.2);">
                                <h3 class="text-warning mb-0 fw-bold">{currSymbol}{mcResults.var95}</h3>
                                <small class="opacity-60 text-uppercase fw-bold" style="font-size: 0.7rem;">95% VaR (Risk)</small>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-around small opacity-60 border-top border-secondary border-opacity-25 pt-3">
                        <span>Best: <strong class="text-success">{currSymbol}{mcResults.best}</strong></span>
                        <span>Median: <strong>{currSymbol}{mcResults.median}</strong></span>
                        <span>Worst: <strong class="text-danger">{currSymbol}{mcResults.worst}</strong></span>
                    </div>
                {/if}
            </div>
        {/if}
    </div>

    <div class="d-flex justify-content-center gap-3 mb-5">
        <button on:click={copyLink} class="btn btn-primary rounded-pill px-4 shadow-sm">
            {#if showLinkCopied}<i class="bi bi-check2"></i> Copied{:else}<i class="bi bi-share-fill"></i> Share{/if}
        </button>
        <a href="{base}/" class="btn btn-outline-secondary rounded-pill px-4">Home</a>
    </div>

</div>