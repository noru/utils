import * as ObjectUtil from '../src/object'

describe.only('ObjectUtil', () => {
  let testObj = {a: 0, b: { c: 1, d: 'hello'}, e: [1, 2, [3, 3, 3]]}
  let testObj2 = {a: 0, b: { c: 1, d: 'bello'}, e: [1, 2, [3, 3, 3]]}
  let testObj3 = {a: 0, f: { c: 1, d: 'hello'}, e: [1, 2, [3, 3, 3]]}
  let testDate = new Date(2015, 4, 16)
  enum direction {Up, Down, Left, Right, }

  it('deepClone', () => {
      expect(ObjectUtil.deepClone(null)).to.be.deep.eq(null)
      expect(ObjectUtil.deepClone(testObj)).to.be.deep.eq(testObj)
      expect(ObjectUtil.deepClone(testDate)).to.be.deep.eq(testDate)
      expect(ObjectUtil.deepClone(direction)).to.be.deep.eq(direction)
 }, )

  it('isObjectEqual', () => {
      expect(ObjectUtil.isObjectEqual(null, null)).to.be.true
      expect(ObjectUtil.isObjectEqual(undefined, undefined)).to.be.true
      expect(ObjectUtil.isObjectEqual([1, 2, [3, 3, 3]], [1, 2, [3, 3, 4]])).to.be.false
      expect(ObjectUtil.isObjectEqual(testObj, testObj)).to.be.true
      expect(ObjectUtil.isObjectEqual(testObj, testObj2)).to.be.false
      expect(ObjectUtil.isObjectEqual(testObj, testObj3)).to.be.false
      expect(ObjectUtil.isObjectEqual(testDate, testDate)).to.be.true
      expect(ObjectUtil.isObjectEqual(testDate, 123)).to.be.false
      expect(ObjectUtil.isObjectEqual(direction, direction)).to.be.true
 })
}, )
