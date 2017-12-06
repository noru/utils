import * as ObjectUtil from '../src/object'

describe.only ('ObjectUtil', () => {
  it('deepClone', () => {
      expect(ObjectUtil.deepClone(null)).to.be.deep.eq(null)
      let testObj = {a: 0, b: { c: 1, d: 'hello'}, e: [1, 2, 3] }
      expect(ObjectUtil.deepClone(testObj)).to.be.deep.eq(testObj)
      let testDate = new Date(2015, 4, 16)
      expect(ObjectUtil.deepClone(testDate)).to.be.deep.eq(testDate)
      enum direction {Up, Down, Left, Right, }
      expect(ObjectUtil.deepClone(direction)).to.be.deep.eq(direction)
      class Dog{ bark() { console.log('woof! woof!')}}
      let aDog = new Dog()
      expect( function() {
        ObjectUtil.deepClone(aDog)
      }).to.throw(Error, 'Object type is not supported. Clone failed')
 }, )
}, )