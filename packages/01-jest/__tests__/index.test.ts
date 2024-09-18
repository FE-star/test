import { add, addFloat } from '../src/index';

describe('add()', () => {
  test('add(1, 2)', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('add(0.1, 0.2)', () => {
    expect(add(0.1, 0.2) === 0.3).toBeFalsy();
  });
});

describe('addFloat()', () => {
  test('addFloat(1, 2)', () => {
    expect(addFloat(1, 2)).toBe(3);
  });

  test('addFloat(0.1, 0.2)', () => {
    expect(addFloat(0.1, 0.2)).toBe(0.3);
  });
});
