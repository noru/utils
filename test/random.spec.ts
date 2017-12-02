import * as RandUtils from '../src/random'

describe('Random Utils', () => {

  it('random', () => {

    let result = RandUtils.random()

    expect(result).to.lte(1)
    expect(result).to.gte(0)

    result = RandUtils.random(100)

    expect(result).to.lte(100)
    expect(result).to.gte(0)

    result = RandUtils.random(90, 100)

    expect(result).to.lte(100)
    expect(result).to.gte(90)

  })

  it('random int', () => {

    let result = RandUtils.randomInt(10)

    expect(result).to.lte(10)
    expect(result).to.gte(0)
    expect(result | 0).to.be.eq(result)

  })

})