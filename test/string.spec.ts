import * as StrUtils from '../src/string'

describe('String Utils', () => {

  it('ellipsis', () => {

    expect(StrUtils.ellipsis('hello', 5)).to.be.eq('hello')
    expect(StrUtils.ellipsis('helloworld!', 5)).to.be.eq('hello…')

    expect(() => StrUtils.ellipsis(123, 2)).throws()
  })

  it('query parse', () => {

    expect(StrUtils.parseQuery('')).to.be.deep.eq({})
    expect(StrUtils.parseQuery('?')).to.be.deep.eq({})
    expect(StrUtils.parseQuery('?a=1&b=2')).to.be.deep.eq({ a: '1', b: '2'})
    expect(StrUtils.parseQuery('a=1&b=2')).to.be.deep.eq({ a: '1', b: '2'})
    expect(StrUtils.parseQuery(`a=1&b=${encodeURIComponent('#$%')}`)).to.be.deep.eq({ a: '1', b: '#$%'})

  })

})