import * as FuncUtils from '../src/func'

describe('String Utils', () => {

  it('identity', () => {
    let a = {}
    expect(FuncUtils.identity(a) === a).to.be.true
  })

})