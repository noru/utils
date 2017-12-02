import * as StrUtils from '../src/string'

describe('String Utils', () => {

  it('ellipsis', () => {

    expect(StrUtils.ellipsis('hello', 5)).to.be.eq('hello')
    expect(StrUtils.ellipsis('helloworld!', 5)).to.be.eq('hello…')

  })

})