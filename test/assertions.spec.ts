import { assert } from '../src/assertions'

describe('Assertions', () => {

  it('assert', () => {
    expect(assert(true, 'msg')).to.be.undefined
    expect(() => assert(false, 'msg')).to.throws
  })

})