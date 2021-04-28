import * as FuncUtils from '../src/func'
import { spy } from 'sinon'

describe('String Utils', () => {

  it('identity', () => {
    let a = {}
    expect(FuncUtils.identity(a) === a).to.be.true
  })

  it('flow', () => {

    let increment = x => x + 1
    let double = x => x * 2
    let sum = (x, y) => x + y

    expect(FuncUtils.flow(0, increment, increment)).to.be.eq(2)
    expect(FuncUtils.flow(0, increment, increment, double)).to.be.eq(4)
    expect(FuncUtils.flow([1, 2], sum, increment, double)).to.be.eq(8)

    let arg = {}
    expect(FuncUtils.flow(arg)).to.be.eq(arg)
    expect(FuncUtils.flow()).to.be.undefined
    expect(FuncUtils.flow(null)).to.be.null

  })

  it('compose', () => {

    expect(FuncUtils.compose()).to.be.eq(FuncUtils.identity)

    let increment = x => x + 1
    let double = x => x * 2
    let sum = (x, y) => x + y

    expect(FuncUtils.compose(increment, increment)(0)).to.be.eq(2)
    expect(FuncUtils.compose(increment, increment, double)(0)).to.be.eq(4)
    expect(FuncUtils.compose(sum, increment, double)(1, 2)).to.be.eq(8)

    let arg = {}
    expect(FuncUtils.compose()()).to.be.undefined
    expect(FuncUtils.compose()(arg)).to.be.eq(arg)
    expect(FuncUtils.compose()(null)).to.be.null

  })

  it('attempt', () => {

    function iThrowError<T>(arg: T): T {
      if ('true') {
        throw new Error()
      }
      return arg;
    }

    expect(FuncUtils.attempt(() => undefined)).to.not.throws
    expect(FuncUtils.attempt(iThrowError)).to.not.throws
    expect(FuncUtils.attempt(iThrowError)).to.be.undefined
    expect(FuncUtils.attempt(iThrowError, 1)).to.be.eq(1)
    expect(FuncUtils.attempt(() => 2, 1)).to.be.eq(2)

    let _spy = spy(console, 'error')
    FuncUtils.attempt(() => { throw new Error() })
    expect(_spy.called).to.be.false
    FuncUtils.attempt(iThrowError, undefined, false)
    expect(_spy.called).to.be.true

    // type check
    let result1: number = FuncUtils.attempt(() => iThrowError(1), 1)
    let result2: number | undefined = FuncUtils.attempt(() => iThrowError(1))
    let result3: string = FuncUtils.attempt(() => iThrowError('123'), '123')

    // // @ts-expect-error
    // let error: number = FuncUtils.attempt(() => iThrowError(1))
    // @ts-expect-error
    let error2: number = FuncUtils.attempt(() => iThrowError('123'))
    // @ts-expect-error
    let error3: number = FuncUtils.attempt(() => iThrowError('123'), 123)
  })

})