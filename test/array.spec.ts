import * as ArrayUtils from '../src/array'

describe('Utils', () => {

  it('array: undefined or empty', () => {

    expect(ArrayUtils.isNullOrEmpty([])).to.be.true
    expect(ArrayUtils.isNullOrEmpty(null)).to.be.true
    expect(ArrayUtils.isNullOrEmpty(undefined)).to.be.true

  })

})