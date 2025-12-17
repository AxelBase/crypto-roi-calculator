<script>
    import { base } from '$app/paths';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';

    // Pre-fill form from URL query parameters (for "Edit Inputs" functionality)
    const params = $page.url.searchParams;

    let initialInvestment = params.get('initial') || '';
    let purchasePrice = params.get('purchase') || '';
    let salePrice = params.get('sale') || '';
    let quantity = params.get('qty') || '';
    let fees = params.get('fees') || '';
    let holdingPeriodDays = params.get('days') || '';
    let currency = params.get('currency') || 'USD'; // Default currency
    let error = '';

    // Save/Load last calculation using localStorage
    onMount(() => {
        const saved = localStorage.getItem('lastCalculation');
        if (saved && !params.toString()) {  // Only prompt if no URL params (fresh visit)
            try {
                const parsed = JSON.parse(saved);
                // Simple toast/alert replacement for better UI could go here, keeping confirm for now to not break flow
                if (confirm('Welcome back! Restore your last calculation?')) {
                    initialInvestment = parsed.initial || '';
                    purchasePrice = parsed.purchase || '';
                    salePrice = parsed.sale || '';
                    quantity = parsed.qty || '';
                    fees = parsed.fees || '';
                    holdingPeriodDays = parsed.days || '';
                    currency = parsed.currency || 'USD';
                }
            } catch (e) {
                console.warn('Failed to load saved calculation');
            }
        }
    });

    function validateInputs() {
        if (!initialInvestment || isNaN(initialInvestment) || parseFloat(initialInvestment) <= 0) return 'Invalid initial investment.';
        if (!purchasePrice || isNaN(purchasePrice) || parseFloat(purchasePrice) <= 0) return 'Invalid purchase price.';
        if (!salePrice || isNaN(salePrice) || parseFloat(salePrice) <= 0) return 'Invalid sale price.';
        if (!quantity || isNaN(quantity) || parseFloat(quantity) <= 0) return 'Invalid quantity.';
        if (fees && (isNaN(fees) || parseFloat(fees) < 0)) return 'Invalid fees.';
        if (holdingPeriodDays && (isNaN(holdingPeriodDays) || parseFloat(holdingPeriodDays) < 0)) return 'Invalid holding period.';
        return null;
    }

    function handleSubmit() {
        error = validateInputs();
        if (error) return;

        const params = new URLSearchParams({
            initial: initialInvestment,
            purchase: purchasePrice,
            sale: salePrice,
            qty: quantity,
            fees: fees || '0',
            days: holdingPeriodDays || '0',
            currency: currency
        });

        // Save to localStorage
        localStorage.setItem('lastCalculation', JSON.stringify({
            initial: initialInvestment,
            purchase: purchasePrice,
            sale: salePrice,
            qty: quantity,
            fees: fees || '0',
            days: holdingPeriodDays || '0',
            currency: currency
        }));

        goto(`${base}/results?${params.toString()}`);
    }

    function clearSaved() {
        localStorage.removeItem('lastCalculation');
        alert('Saved calculation cleared.');
    }
</script>

<div class="container mt-5 pt-3">
    <div class="row justify-content-center">
        <div class="col-lg-8 col-xl-7">
            
            <div class="glass-card p-4 p-md-5" in:fly={{ y: 30, duration: 800 }}>
                <h2 class="text-center mb-4 fw-bold">
                    <i class="bi bi-calculator-fill me-2" style="color: var(--color-accent);"></i>
                    Investment Inputs
                </h2>

                {#if error}
                    <div class="alert alert-danger shadow-sm rounded-4" role="alert" transition:fade>
                        <i class="bi bi-exclamation-triangle-fill me-2"></i> {error}
                    </div>
                {/if}

                <form on:submit|preventDefault={handleSubmit} class="d-flex flex-column gap-3">
                    
                    <div class="form-floating">
                        <select class="form-select" id="currency" bind:value={currency}>
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                        </select>
                        <label for="currency">Currency</label>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="number" class="form-control" id="initialInvestment" bind:value={initialInvestment} required min="0.01" step="0.01" placeholder="0.00">
                                <label for="initialInvestment">Initial Investment</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="number" class="form-control" id="quantity" bind:value={quantity} required min="0.01" step="0.01" placeholder="0.00">
                                <label for="quantity">Quantity (Units)</label>
                            </div>
                        </div>
                    </div>

                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="number" class="form-control" id="purchasePrice" bind:value={purchasePrice} required min="0.01" step="0.01" placeholder="0.00">
                                <label for="purchasePrice">Buy Price (Per Unit)</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input type="number" class="form-control" id="salePrice" bind:value={salePrice} required min="0.01" step="0.01" placeholder="0.00">
                                <label for="salePrice">Sell Price (Per Unit)</label>
                            </div>
                        </div>
                    </div>

                    <div class="p-3 rounded-4" style="background: rgba(255,255,255,0.3); border: 1px dashed var(--glass-border);">
                        <h6 class="text-muted mb-3"><i class="bi bi-sliders me-1"></i> Optional Details</h6>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="number" class="form-control" id="fees" bind:value={fees} min="0" step="0.01" placeholder="0.00">
                                    <label for="fees">Total Fees</label>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-floating">
                                    <input type="number" class="form-control" id="holdingPeriodDays" bind:value={holdingPeriodDays} min="0" step="1" placeholder="0">
                                    <label for="holdingPeriodDays">Holding Days</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-grid gap-2 mt-2">
                        <button type="submit" class="btn btn-primary btn-lg shadow-lg">
                            Calculate ROI <i class="bi bi-arrow-right-circle-fill ms-2"></i>
                        </button>
                    </div>
                </form>

                <div class="d-flex justify-content-between mt-4 pt-3 border-top border-light">
                    <a href="{base}/" class="btn btn-link text-decoration-none text-muted">
                        <i class="bi bi-arrow-left"></i> Back Home
                    </a>
                    <button on:click={clearSaved} class="btn btn-sm btn-outline-secondary rounded-pill px-3">
                        <i class="bi bi-trash3"></i> Clear Cache
                    </button>
                </div>

            </div>
        </div>
    </div>
</div>