import * as ArrayUtils from '../src/array'

describe('Array Utils', () => {

  it('array: undefined or empty', () => {

    expect(ArrayUtils.isNullOrEmpty([])).to.be.true
    expect(ArrayUtils.isNullOrEmpty(null)).to.be.true
    expect(ArrayUtils.isNullOrEmpty(undefined)).to.be.true

    expect(ArrayUtils.isNullOrEmpty([1])).to.be.false
    expect(ArrayUtils.isNullOrEmpty([, , ])).to.be.false
    expect(ArrayUtils.isNullOrEmpty([undefined])).to.be.false
    expect(ArrayUtils.isNullOrEmpty([null])).to.be.false

  })

  it('isArray', () => {

    expect(ArrayUtils.isArray([])).to.be.true
    expect(ArrayUtils.isArray([1, 2, 3])).to.be.true
    expect(ArrayUtils.isArray([, , ])).to.be.true

    expect(ArrayUtils.isArray(1)).to.be.false
    expect(ArrayUtils.isArray({})).to.be.false
    expect(ArrayUtils.isArray(false)).to.be.false
    expect(ArrayUtils.isArray(undefined)).to.be.false
    expect(ArrayUtils.isArray(null)).to.be.false
    expect(ArrayUtils.isArray('')).to.be.false
    expect(ArrayUtils.isArray(Symbol())).to.be.false
    expect(ArrayUtils.isArray(() => { /**/ })).to.be.false

  })

  it('shallowEqual', () => {

    expect(ArrayUtils.shallowEqual([], [])).to.be.true
    expect(ArrayUtils.shallowEqual([1, 2, 3], [1, 2, 3])).to.be.true

    expect(ArrayUtils.shallowEqual([1], [])).to.be.false
    expect(ArrayUtils.shallowEqual([{}], [{}])).to.be.false
  })

  it('deepMap', () => {

    let iteratee = x => x + 1
    expect(ArrayUtils.deepMap([1, 2, 3], iteratee)).to.be.deep.eq([2, 3, 4])
    expect(ArrayUtils.deepMap([1, [2, 3, 4], 5], iteratee)).to.be.deep.eq([ 2, [ 3, 4, 5 ], 6 ])
    expect(ArrayUtils.deepMap([[1, 2], [3, 4, 5 ], [6, 7]], iteratee))
      .to.be.deep.eq([ [ 2, 3 ], [ 4, 5, 6 ], [ 7, 8 ] ])

    expect(ArrayUtils.deepMap([[[[[1, 2, 3]]]]], iteratee)).to.be.deep.eq([[[[[2, 3, 4]]]]])

    expect(() => ArrayUtils.deepMap({} as any[], iteratee)).throws()

  })

  it('deepMap: position', () => {

    let posArray: any[] = []
    let iteratee2 = (x, pos) => posArray.push(pos)

    ArrayUtils.deepMap([1, [2, 3, 4], 5], iteratee2)
    expect(posArray).to.deep.eq([[0], [1, 0], [1, 1], [1, 2], [2]])

    posArray.length = 0
    ArrayUtils.deepMap([[1, 2], [3, 4, 5 ], [6, 7]], iteratee2)
    expect(posArray).to.deep.eq([[0, 0], [0, 1], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1]])

  })

  it('deepMap: index', () => {

    let indice: number[] = []
    let iteratee2 = (x, _pos, index) => indice.push(index)

    ArrayUtils.deepMap([1, [2, 3, 4], 5], iteratee2)
    expect(indice).to.deep.eq([0, 1, 2, 3, 4])

    indice.length = 0
    ArrayUtils.deepMap([[1, 2], [3, 4, 5 ], [6, 7]], iteratee2)
    expect(indice).to.deep.eq([0, 1, 2, 3, 4, 5, 6])

  })

})