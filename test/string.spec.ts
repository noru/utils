import * as StrUtils from '../src/string'

describe('String Utils', () => {

  it('ellipsis', () => {

    expect(StrUtils.ellipsis('hello', 5)).to.be.eq('hello')
    expect(StrUtils.ellipsis('helloworld!', 5)).to.be.eq('hello…')

    // @ts-ignore
    expect(() => StrUtils.ellipsis(123, 2)).throws()
  })

  it('query parse', () => {

    expect(StrUtils.parseQuery('')).to.be.deep.eq({})
    expect(StrUtils.parseQuery('?')).to.be.deep.eq({})
    expect(StrUtils.parseQuery('?a=1&b=2')).to.be.deep.eq({ a: '1', b: '2'})
    expect(StrUtils.parseQuery('a=1&b=2')).to.be.deep.eq({ a: '1', b: '2'})
    expect(StrUtils.parseQuery(`a=1&b=${encodeURIComponent('#$%')}`)).to.be.deep.eq({ a: '1', b: '#$%'})

  })

  it('replace all', () => {

    let target = 'The quick brown fox jumps over the lazy dog'
    expect(StrUtils.replaceAll(target, ' ', '')).to.be.eq('Thequickbrownfoxjumpsoverthelazydog')
    expect(StrUtils.replaceAll(target, 'o', '0')).to.be.eq('The quick br0wn f0x jumps 0ver the lazy d0g')

  })

})