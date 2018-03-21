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

  it('flattenDeepBy', () => {

    expect(ObjectUtil.flattenDeepBy(undefined, 'a')).to.be.deep.eq([])
    expect(ObjectUtil.flattenDeepBy(null, 'a')).to.be.deep.eq([])
    expect(ObjectUtil.flattenDeepBy([], 'a')).to.be.deep.eq([])
    expect(ObjectUtil.flattenDeepBy(123, 'a')).to.be.deep.eq([])
    expect(ObjectUtil.flattenDeepBy('a string', 'a')).to.be.deep.eq([])
    expect(ObjectUtil.flattenDeepBy({}, 'a')).to.be.deep.eq([])

    let testee = { a: [{a: [{a: []}], b: 2}, {b: 3}], b: 1 }
    let flattened = ObjectUtil.flattenDeepBy(testee, 'a')
    expect(flattened).to.be.deep.eq([
      {a: [{a: [{a: []}], b: 2}, {b: 3}], b: 1},
      {a: [{a: []}], b: 2},
      {a: []}, {b: 3},
    ])

    let thirdLvl = [
      { id: '3', name: '王大锤', timestamp: new Date, content: 'Defend this one, conservatives.', subComments: [] },
    ]
    let secLvl = [
      { id: '2', name: '王大锤', timestamp: new Date, content: 'Defend this one, conservatives.', subComments: thirdLvl },
      { id: '4', name: '王小锤', timestamp: new Date, content: ' Why are you discussing tariffs at the soup store!?' },
    ]

    let topLvl = [
      // tslint:disable-next-line:max-line-length
      { id: '1', name: '王大山', timestamp: new Date, content: 'Y\'know, we really have the best Stupid. It\'s American, American Stupid, and it\'s so great. It\'s not like that European Stupid, I\'ve seen their stupid... y\'know, I\'ve been all over the world, I\'ve met a lot of very rich', subComments: secLvl },
      { id: '5', name: '王小山', timestamp: new Date, content: '是评论对象的rid值,格式' },
    ]
    let flattened2 = ObjectUtil.flattenDeepBy(topLvl, 'subComments')

    expect(flattened2.map(c => c.id)).to.be.deep.eq(['1', '2', '3', '4', '5'])
  })

  it('defaults', () => {
    expect(() => ObjectUtil.defaults(undefined!, 'a', [1, 2, 3])).throws(Error)
    expect(() => ObjectUtil.defaults(123 as any, 'a', [1, 2, 3])).throws(Error)
    expect(() => ObjectUtil.defaults('string' as any, 'a', [1, 2, 3])).throws(Error)

    expect(ObjectUtil.defaults({}, 'a', [1, 2, 3]).a).to.be.deep.eq([1, 2, 3])
    expect(ObjectUtil.defaults([], 'a', [1, 2, 3]).a).to.be.deep.eq([1, 2, 3])
    expect(ObjectUtil.defaults({}, 'a', 1).a).to.be.deep.eq(1)
    expect(ObjectUtil.defaults({ a: 2 }, 'a', 1).a).to.be.deep.eq(2)
  })

})
