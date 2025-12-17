// src/lib/calculator.js

/**
 * Calculates basic ROI.
 * @param {number} initialInvestment - Initial amount invested.
 * @param {number} purchasePrice - Price per unit at purchase.
 * @param {number} salePrice - Price per unit at sale.
 * @param {number} quantity - Number of units.
 * @param {number} fees - Transaction fees (fixed amount).
 * @returns {number} ROI percentage.
 */
export function calculateBasicROI(initialInvestment, purchasePrice, salePrice, quantity, fees) {
    if (initialInvestment <= 0 || quantity <= 0) return 0;
    const netProfit = (salePrice - purchasePrice) * quantity - fees;
    return (netProfit / initialInvestment) * 100;
}

/**
 * Annualized ROI using standard compounding formula:
 * (1 + total_roi)^(365 / days) - 1
 */
// src/lib/calculator.js  (tiny update – added safety check for huge exponents)
export function calculateAnnualizedROI(roi, holdingPeriodDays) {
    if (holdingPeriodDays <= 0) return null;
    const totalReturn = 1 + (roi / 100);
    const exponent = 365 / holdingPeriodDays;
    // Prevent JavaScript overflow on insane exponents
    if (exponent > 50) return Infinity; // We'll display as "Extremely high"
    return (Math.pow(totalReturn, exponent) - 1) * 100;
}
/**
 * Calculates net profit.
 */
export function calculateNetProfit(purchasePrice, salePrice, quantity, fees) {
    return (salePrice - purchasePrice) * quantity - fees;
}

/**
 * Calculates breakeven sale price.
 */
export function calculateBreakevenPrice(initialInvestment, purchasePrice, quantity, fees) {
    if (quantity <= 0) return 0;
    return ((initialInvestment + fees) / quantity) + purchasePrice;
}

/**
 * Calculates required sale price for target ROI.
 */
export function calculateSalePriceForTargetROI(initialInvestment, purchasePrice, quantity, fees, targetROI) {
    if (quantity <= 0) return 0;
    const requiredProfit = (targetROI / 100) * initialInvestment;
    const requiredGross = requiredProfit + fees;
    return (requiredGross / quantity) + purchasePrice;
}

/**
 * Formats number to 2 decimal places.
 */
export function formatNumber(num) {
    return typeof num === 'number' ? num.toFixed(2) : num;
}

/**
 * Converts value to selected currency (simple fixed rates).
 * Rates: USD=1, EUR=0.92, GBP=0.78 (approximate, static).
 */
export function convertToCurrency(value, currency) {
    const rates = { USD: 1, EUR: 0.92, GBP: 0.78 };
    return value * (rates[currency] || 1);
}

/**
 * Gets currency symbol.
 */
export function getCurrencySymbol(currency) {
    const symbols = { USD: '$', EUR: '€', GBP: '£' };
    return symbols[currency] || '$';
}