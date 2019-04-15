function gcd(a, b) {
  if (a === b) return a;
  if (a === 0n) return b;
  if (b === 0n) return a;
  if (~a & 1n) return b & 1n ? gcd(a >> 1n, b) : gcd(a >> 1n, b >> 1n) << 1n;
  if (~b & 1n) return gcd(a, b >> 1n);

  return a > b ? gcd((a - b) >> 1n, b) : gcd((b - a) >> 1n, a);
}
