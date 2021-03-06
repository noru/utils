import * as ArrayUtils from '../src/array';

describe('Array Utils', () => {
  it('array: undefined or empty', () => {
    expect(ArrayUtils.isNullOrEmpty([])).to.be.true;
    expect(ArrayUtils.isNullOrEmpty(null)).to.be.true;
    expect(ArrayUtils.isNullOrEmpty(undefined)).to.be.true;

    expect(ArrayUtils.isNullOrEmpty([1])).to.be.false;
    expect(ArrayUtils.isNullOrEmpty([, ,])).to.be.false;
    expect(ArrayUtils.isNullOrEmpty([undefined])).to.be.false;
    expect(ArrayUtils.isNullOrEmpty([null])).to.be.false;
  });

  it('deepMap', () => {
    let iteratee = (x) => x + 1;
    expect(ArrayUtils.deepMap([1, 2, 3], iteratee)).to.be.deep.eq([2, 3, 4]);
    expect(ArrayUtils.deepMap([1, [2, 3, 4], 5], iteratee)).to.be.deep.eq([2, [3, 4, 5], 6]);
    expect(
      ArrayUtils.deepMap(
        [
          [1, 2],
          [3, 4, 5],
          [6, 7],
        ],
        iteratee
      )
    ).to.be.deep.eq([
      [2, 3],
      [4, 5, 6],
      [7, 8],
    ]);

    expect(ArrayUtils.deepMap([[[[[1, 2, 3]]]]], iteratee)).to.be.deep.eq([[[[[2, 3, 4]]]]]);

    expect(() => ArrayUtils.deepMap({} as any[], iteratee)).throws();
  });

  it('deepMap: position', () => {
    let posArray: any[] = [];
    let iteratee2 = (x, pos) => posArray.push(pos);

    ArrayUtils.deepMap([1, [2, 3, 4], 5], iteratee2);
    expect(posArray).to.deep.eq([[0], [1, 0], [1, 1], [1, 2], [2]]);

    posArray.length = 0;
    ArrayUtils.deepMap(
      [
        [1, 2],
        [3, 4, 5],
        [6, 7],
      ],
      iteratee2
    );
    expect(posArray).to.deep.eq([
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
    ]);
  });

  it('deepMap: index', () => {
    let indice: number[] = [];
    let iteratee2 = (x, _pos, index) => indice.push(index);

    ArrayUtils.deepMap([1, [2, 3, 4], 5], iteratee2);
    expect(indice).to.deep.eq([0, 1, 2, 3, 4]);

    indice.length = 0;
    ArrayUtils.deepMap(
      [
        [1, 2],
        [3, 4, 5],
        [6, 7],
      ],
      iteratee2
    );
    expect(indice).to.deep.eq([0, 1, 2, 3, 4, 5, 6]);
  });

  it('swap', () => {
    let arr: any[] = [1, 2, 3];
    ArrayUtils.swap(arr, 0, 2);
    expect(arr).to.be.deep.eq([3, 2, 1]);

    arr = [1, [2, 2], 3];
    ArrayUtils.swap(arr, [1, 0], 2);
    expect(arr).to.be.deep.eq([1, [3, 2], 2]);

    arr = [1, [2, [3, [4, 5]]]];
    ArrayUtils.swap(arr, [1, 1, 1, 1], 0);
    expect(arr).to.be.deep.eq([5, [2, [3, [4, 1]]]]);

    arr = [undefined, 2];
    ArrayUtils.swap(arr, 0, 1);
    expect(arr).to.be.deep.eq([2, undefined]);

    expect(function () {
      ArrayUtils.swap([1, 2], 0, 2);
    }).to.throw(Error);
    expect(function () {
      ArrayUtils.swap([1, 2], 2, 0);
    }).to.throw(Error);
    expect(function () {
      ArrayUtils.swap([1, 2], -1, 0);
    }).to.throw(Error);
  });

  it('pick', () => {
    expect(ArrayUtils.pick([1, 2, 3], 0)).to.be.eq(1);
    expect(ArrayUtils.pick([1, [2, 4, 6], 3], 1, 2)).to.be.eq(6);

    let parents = [];
    ArrayUtils.pick([1, [2, 4, 6, [1, 2, 3]], 3], 1, 3, 0, parents);
    expect(parents).to.be.deep.eq([
      [1, [2, 4, 6, [1, 2, 3]], 3],
      [2, 4, 6, [1, 2, 3]],
      [1, 2, 3],
    ]);

    expect(function () {
      ArrayUtils.pick([1, 2], -1, []);
    }).to.throw(Error);
  });

  it('unflatten', () => {
    let testee = [
      { key: 1 },
      { key: 2, parent: 1 },
      { key: 3, parent: 1 },
      { key: 4, parent: 2 },
      { key: 5, parent: 3 },
      { key: 6, parent: 4 },
    ];
    let expected = [
      {
        key: 1,
        __children__: [
          {
            key: 2,
            parent: 1,
            __children__: [
              {
                key: 4,
                parent: 2,
                __children__: [{ key: 6, parent: 4 }],
              },
            ],
          },
          {
            key: 3,
            parent: 1,
            __children__: [{ key: 5, parent: 3 }],
          },
        ],
      },
    ];
    let unflattened = ArrayUtils.unflatten(testee, 'key', 'parent');
    expect(unflattened).to.be.deep.eq(expected);
  });

  it('binarySearch', () => {
    let arr = [1, 2, 3, 4, 5, 6];
    let predict = (t) => (i) => i === t;
    let onward = (t) => (i) => i > t;

    expect(ArrayUtils.binarySearch(arr, predict(4), onward(4))).to.be.deep.eq([4, 3]);
    expect(ArrayUtils.binarySearch(arr, predict(1), onward(1))).to.be.deep.eq([1, 0]);
    expect(ArrayUtils.binarySearch(arr, predict(6), onward(6))).to.be.deep.eq([6, 5]);
    expect(ArrayUtils.binarySearch(arr, predict(7), onward(7))).to.be.null;
    expect(ArrayUtils.binarySearch(arr, predict(-1), onward(-1))).to.be.null;
  });
});
