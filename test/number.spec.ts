import * as NumUtil from '../src/number'

describe('Number Utils', () => {

  it('toPercentage', () => {

    expect(NumUtil.toPercentage(5)).to.be.eq('500%')
    expect(NumUtil.toPercentage(.5)).to.be.eq('50%')
    expect(NumUtil.toPercentage(.12315, 2)).to.be.eq('12.31%')

  })

  it('isBetween', () => {

    expect(NumUtil.isBetween(5, 1, 10)).to.be.true
    expect(NumUtil.isBetween(1, 1, 10)).to.be.true
    expect(NumUtil.isBetween(10, 1, 10)).to.be.true
    expect(NumUtil.isBetween(10, 1, 10, [false, false])).to.be.false
    expect(NumUtil.isBetween(1, 1, 10, [false, false])).to.be.false

  })

})