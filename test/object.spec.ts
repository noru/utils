import * as ObjectUtil from '../src/object'

describe('ObjectUtil', () => {

  it('isPremitive', () => {

    expect(ObjectUtil.isPremitive('hi')).to.be.true
    expect(ObjectUtil.isPremitive(1)).to.be.true
    expect(ObjectUtil.isPremitive(null)).to.be.true
    expect(ObjectUtil.isPremitive(undefined)).to.be.true
    expect(ObjectUtil.isPremitive(new Date())).to.be.false
    expect(ObjectUtil.isPremitive({})).to.be.false

  })

  it('recursiveCopy', () => {
      expect(ObjectUtil.recursiveCopy(null)).to.be.eq(null)
      let testObj = {a: 0, b: { c: 1, d: 'hello'}, e: [1, 2, [3, 3, 3]]}
      expect(ObjectUtil.recursiveCopy(testObj)).to.be.deep.eq(testObj)
      expect(ObjectUtil.recursiveCopy(new Date(2015, 4, 16))).to.be.deep.eq(new Date(2015, 4, 16))
  }, )

  it('isEqual', () => {
    expect(ObjectUtil.isEqual(null, null)).to.be.true
    expect(ObjectUtil.isEqual(undefined, undefined)).to.be.true
    expect(ObjectUtil.isEqual([1, 2, [3, 3, 3]], [1, 2, [3, 3, 4]])).to.be.false
    expect(ObjectUtil.isEqual({}, {})).to.be.true
    expect(ObjectUtil.isEqual({a: 1, b: 2}, {b: 2, a: 1})).to.be.true
    let testObj = {a: 0, b: { c: 1, d: 'hello'}, e: [1, 2, [3, 3, 3]]}
    expect(ObjectUtil.isEqual(testObj, testObj)).to.be.true
    expect(ObjectUtil.isEqual(testObj, {a: 0, b: { c: 1, d: 3}, e: [1, 2, [3, 3, 3]]})).to.be.false
    expect(ObjectUtil.isEqual(new Date(2015, 4, 16), new Date(2015, 4, 16))).to.be.true
    expect(ObjectUtil.isEqual(new Date(2015, 4, 16), new Date())).to.be.false
 })

  it('merge', () => {
     let a = { a: { b: 1 }}
     let b = { a: { c: 2 }}
     let c = {a: {d: 3}, a2: 'Hello'}
     let aUbUc = {a: {b: 1, c: 2, d: 3}, a2: 'Hello'}
     expect(ObjectUtil.merge(a, b)).to.be.deep.eq({ a: { b: 1, c: 2}})
     expect(ObjectUtil.merge({a: 1}, {a: 33})).to.be.deep.eq({a: 33})
     expect(ObjectUtil.merge({a: 1}, 123)).to.be.eq(123)
     expect(ObjectUtil.merge(a, undefined)).to.be.eq(a)
     expect(ObjectUtil.merge(a, null)).to.be.eq(a)
     expect(ObjectUtil.merge(null, undefined)).to.be.eq(undefined)
     expect(ObjectUtil.merge(null, undefined, a, null)).to.be.deep.eq(a)
     expect(ObjectUtil.merge(a, b, c)).to.be.deep.eq(aUbUc)
     expect(ObjectUtil.merge(a, b, 'hello')).to.be.eq('hello')
     expect(ObjectUtil.merge('hello', 123, a)).to.be.deep.eq(aUbUc)
     expect(ObjectUtil.merge(aUbUc, a, b, c)).to.be.deep.eq(aUbUc)
  })

  it('isEmpty', () => {
    expect(ObjectUtil.isEmpty('')).to.be.true
    expect(ObjectUtil.isEmpty({})).to.be.true
    expect(ObjectUtil.isEmpty([])).to.be.true
    expect(ObjectUtil.isEmpty(33)).to.be.false
    expect(ObjectUtil.isEmpty('hello')).to.be.false
    expect(ObjectUtil.isEmpty([2, 3, 4])).to.be.false
    expect(ObjectUtil.isEmpty({ test: 1 })).to.be.false
    expect(ObjectUtil.isEmpty({length: 0, custom_property: []})).to.be.true

  })

})
