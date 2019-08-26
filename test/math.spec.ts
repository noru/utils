import * as MathUtil from '../src/math'

function almostEql(a: number, b: number, digits: number = 4): boolean {
  let diff = Math.abs(a - b)
  return diff * Math.pow(10, digits) < 1
}

describe('Math Utils', () => {
  it('rotate2D', () => {
    let { x, y } = MathUtil.rotate2D({ x: 0, y: 1 }, Math.PI / 2)
    expect(almostEql(x, -1)).to.be.eq(true)
    expect(almostEql(y, 0)).to.be.eq(true)

    let { x: x2, y: y2 } = MathUtil.rotate2D({ x, y }, -Math.PI / 2)
    expect(almostEql(x2, 0)).to.be.eq(true)
    expect(almostEql(y2, 1)).to.be.eq(true)
  })
})
