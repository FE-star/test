export function addFloat(a: number, b: number): number {
  const scale = 1000000;
  return (a * scale + b * scale) / scale;
}

export function addFloatBySplitStr(a: number, b: number): number {
  const aStrList = a.toString().split('.');
  const bStrList = b.toString().split('.');
  const resultInt = parseInt(aStrList[0]) + parseInt(bStrList[0]);
  const resultFloat = parseInt(aStrList[1]) + parseInt(bStrList[1]);
  return parseFloat(`${resultInt}.${resultFloat}`);
}
