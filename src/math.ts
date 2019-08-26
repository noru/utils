export interface Vector2D {
  x: number
  y: number
}

/**
 * Rotate a 2D vector by given angle, returns a new vector
 *
 * @export
 * @param {Vector2D} vector2D
 * @param {number} angle
 * @returns {Vector2D}
 */
export function rotate2D(v: Vector2D, angle: number): Vector2D {
  let { x, y } = v
  return {
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: x * Math.sin(angle) + y * Math.cos(angle),
  }
}
