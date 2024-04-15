import { arrayPush, ensureArray } from './array';

describe('arrayPush', () => {
  it('should be [1, 2, 3]', () => {
    expect(arrayPush([1, 2], 3)).toEqual([1, 2, 3]);
  });
});

describe('ensureArray', () => {
  it('should be array itself', () => {
    const array = [1, 2, 3];
    expect(ensureArray(array)).toBe(array);
  });

  it('should be a new empty array if null', () => {
    expect(ensureArray(null)).toEqual([]);
  });

  it('should be a new empty array if undefined', () => {
    expect(ensureArray()).toEqual([]);
    expect(ensureArray(undefined)).toEqual([]);
  });
});
