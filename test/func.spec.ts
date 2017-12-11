import * as FuncUtils from '../src/func'

describe('String Utils', () => {

  it('identity', () => {
    let a = {}
    expect(FuncUtils.identity(a) === a).to.be.true
  })

  it('apply', () => {

    let increment = x => x + 1
    let double = x => x * 2
    let sum = (x, y) => x + y

    expect(FuncUtils.apply(0, increment, increment)).to.be.eq(2)
    expect(FuncUtils.apply(0, increment, increment, double)).to.be.eq(4)
    expect(FuncUtils.apply([1, 2], sum, increment, double)).to.be.eq(8)

    let arg = {}
    expect(FuncUtils.apply(arg)).to.be.eq(arg)
    expect(FuncUtils.apply()).to.be.undefined
    expect(FuncUtils.apply(null)).to.be.null

  })

})