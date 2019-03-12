import { Func, Func0, Func1, Func2, Func3, Func4 } from '../src/types'

describe('types', () => {

  test('Function types', () => {
    let func: Func<string> = (_, __) => '23'
    let func$: Func<0> = () => 0
    let func$$: Func<number> = (_, __, ___) => 123
    let func$$$: Func<Func> = () => () => 123

    let func0: Func0<string> = () => 'str'
    let func1: Func1<string> = (_) => 'str'
    let func2: Func2<string> = (_, __) => 'str'
    let func3: Func3<string> = (_, __, ___) => 'str'
    let func4: Func4<string> = (_, __, ___, ____) => 'str'

    expect(true).to.be.true
  })

})
