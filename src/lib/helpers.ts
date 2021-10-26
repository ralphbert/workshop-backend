export function roundTo(value: number, decimals: number) {
  const divider = Math.pow(10, decimals);
  return Math.round(value * divider) / divider;
}
