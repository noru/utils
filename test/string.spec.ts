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
    expect(StrUtils.parseQuery(`a=1&a=2&a=${encodeURIComponent('#$%')}`)).to.be.deep.eq({ a: ['1', '2', '#$%'] })
    expect(StrUtils.parseQuery(`a=1&b=${encodeURIComponent('#$%')}`)).to.be.deep.eq({ a: '1', b: '#$%'})

  })

  it('replace all', () => {

    let target = 'The quick brown fox jumps over the lazy dog'
    expect(StrUtils.replaceAll(target, ' ', '')).to.be.eq('Thequickbrownfoxjumpsoverthelazydog')
    expect(StrUtils.replaceAll(target, 'o', '0')).to.be.eq('The quick br0wn f0x jumps 0ver the lazy d0g')

  })

  it('hashOf', () => {
    expect(StrUtils.hashOf('')).to.be.eq(0)
    expect(StrUtils.hashOf(undefined)).to.be.eq(0)
    expect(StrUtils.hashOf(null)).to.be.eq(0)
    expect(StrUtils.hashOf('str')).to.be.gt(0)

  })

  it('padding', () => {
    expect(StrUtils.padding(123, '0', 10)).to.be.eq('0000000123')
    expect(StrUtils.padding(123, '0', 10, false)).to.be.eq('1230000000')
    expect(StrUtils.padding('acbs', '0', 10)).to.be.eq('000000acbs')
    expect(StrUtils.padding('acbs', '0', 10, false)).to.be.eq('acbs000000')
    expect(StrUtils.padding(123, 'a0', 10, false)).to.be.eq('123a0a0a0a0a0a0a0')
  })

})