export function add(a: number, b: number): number {
  return a + b;
}

export function addFloat(a: number, b: number): number {
  const scale = 1000000;
  return (a * scale + b * scale) / scale;
}
