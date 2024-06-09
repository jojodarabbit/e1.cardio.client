export const formatNumber = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const convertAmountToCurrency = (amount: number) => {
    const amountWithoutDecimals = Math.trunc(amount);
    return amountWithoutDecimals.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
