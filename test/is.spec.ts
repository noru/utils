import * as is from '../src/is'

describe('is', () => {
  it('isPremitive', () => {
    expect(is.isPremitive('hi')).to.be.true
    expect(is.isPremitive(1)).to.be.true
    expect(is.isPremitive(null)).to.be.true
    expect(is.isPremitive(undefined)).to.be.true
    expect(is.isPremitive(new Date())).to.be.false
    expect(is.isPremitive({})).to.be.false
  })

  it('isArray', () => {
    expect(is.isArray([])).to.be.true
    expect(is.isArray([1, 2, 3])).to.be.true
    expect(is.isArray([, , ])).to.be.true

    expect(is.isArray(1)).to.be.false
    expect(is.isArray({})).to.be.false
    expect(is.isArray(false)).to.be.false
    expect(is.isArray(undefined)).to.be.false
    expect(is.isArray(null)).to.be.false
    expect(is.isArray('')).to.be.false
    expect(is.isArray(Symbol())).to.be.false
    expect(
      is.isArray(() => {
        /**/
      }),
    ).to.be.false
  })

  it('isNumber', () => {
    expect(is.isNumber([])).to.be.false
    expect(is.isNumber(false)).to.be.false
    expect(is.isNumber([1, 2, 3])).to.be.false
    expect(is.isNumber(undefined)).to.be.false
    expect(is.isNumber(null)).to.be.false
    expect(is.isNumber({})).to.be.false
    expect(is.isNumber('')).to.be.false
    expect(is.isNumber(Symbol())).to.be.false
    expect(
      is.isNumber(() => {
        /**/
      }),
    ).to.be.false
    expect(is.isNumber(NaN)).to.be.true
    expect(is.isNumber(1)).to.be.true
    expect(is.isNumber(Infinity)).to.be.true
    expect(is.isNumber(Number.MAX_VALUE)).to.be.true
  })

  it('isString', () => {
    expect(is.isString([])).to.be.false
    expect(is.isString(false)).to.be.false
    expect(is.isString([1, 2, 3])).to.be.false
    expect(is.isString(undefined)).to.be.false
    expect(is.isString(null)).to.be.false
    expect(is.isString({})).to.be.false
    expect(is.isString(Symbol())).to.be.false
    expect(
      is.isString(() => {
        /**/
      }),
    ).to.be.false
    expect(is.isString(NaN)).to.be.false
    expect(is.isString(1)).to.be.false
    expect(is.isString(Infinity)).to.be.false
    expect(is.isString(Number.MAX_VALUE)).to.be.false
    expect(is.isString('')).to.be.true
  })

  it('isBool', () => {
    expect(is.isBoolean([])).to.be.false
    expect(is.isBoolean([1, 2, 3])).to.be.false
    expect(is.isBoolean(undefined)).to.be.false
    expect(is.isBoolean(null)).to.be.false
    expect(is.isBoolean({})).to.be.false
    expect(is.isBoolean(Symbol())).to.be.false
    expect(
      is.isBoolean(() => {
        /**/
      }),
    ).to.be.false
    expect(is.isBoolean(NaN)).to.be.false
    expect(is.isBoolean(1)).to.be.false
    expect(is.isBoolean(Infinity)).to.be.false
    expect(is.isBoolean(Number.MAX_VALUE)).to.be.false
    expect(is.isBoolean('')).to.be.false
    expect(is.isBoolean(false)).to.be.true
  })

  it('isFunction', () => {
    expect(is.isFunction([])).to.be.false
    expect(is.isFunction(false)).to.be.false
    expect(is.isFunction([1, 2, 3])).to.be.false
    expect(is.isFunction(undefined)).to.be.false
    expect(is.isFunction(null)).to.be.false
    expect(is.isFunction({})).to.be.false
    expect(is.isFunction('')).to.be.false
    expect(is.isFunction(Symbol())).to.be.false
    expect(
      is.isFunction(() => {
        /**/
      }),
    ).to.be.true
  })

  it('isEmpty', () => {
    expect(is.isEmpty('')).to.be.true
    expect(is.isEmpty({})).to.be.true
    expect(is.isEmpty([])).to.be.true
    expect(is.isEmpty(33)).to.be.false
    expect(is.isEmpty('hello')).to.be.false
    expect(is.isEmpty([2, 3, 4])).to.be.false
    expect(is.isEmpty({ test: 1 })).to.be.false
    expect(is.isEmpty({length: 0, custom_property: []})).to.be.true

  })

})
