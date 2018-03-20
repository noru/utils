import * as FuncUtils from '../src/func'

describe('String Utils', () => {

  it('identity', () => {
    let a = {}
    expect(FuncUtils.identity(a) === a).to.be.true
  })

  it('flow', () => {

    let increment = x => x + 1
    let double = x => x * 2
    let sum = (x, y) => x + y

    expect(FuncUtils.flow(0, increment, increment)).to.be.eq(2)
    expect(FuncUtils.flow(0, increment, increment, double)).to.be.eq(4)
    expect(FuncUtils.flow([1, 2], sum, increment, double)).to.be.eq(8)

    let arg = {}
    expect(FuncUtils.flow(arg)).to.be.eq(arg)
    expect(FuncUtils.flow()).to.be.undefined
    expect(FuncUtils.flow(null)).to.be.null

  })

  it('attempt', () => {

    expect(FuncUtils.attempt(() => undefined)).to.not.throws
    expect(FuncUtils.attempt(() => { throw new Error() })).to.not.throws
    expect(FuncUtils.attempt(() => { throw new Error() })).to.be.undefined
    expect(FuncUtils.attempt(() => { throw new Error() }, 1)).to.be.eq(1)
    expect(FuncUtils.attempt(() => 2, 1)).to.be.eq(2)

  })

})