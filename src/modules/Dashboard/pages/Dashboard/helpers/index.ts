export const fmt = (n: number) =>
   String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
export const pct = (n: number, d: number) =>
   (d ? (n / d) * 100 : 0).toFixed(1).replace('.', ',') + '%';
export const sum = (values: number[]) =>
   values.reduce((s, v) => s + (Number(v) || 0), 0);
