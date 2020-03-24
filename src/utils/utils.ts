export const formatPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

export const formatNumber = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0
});

export const sortNumber = (a: number, b: number) => a - b;

export const sortText = (a: string, b: string) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};
