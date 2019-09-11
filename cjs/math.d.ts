/**
 * Math.PI * 2, a whole radiant circle
 *
 * @export
 * @constant
 */
export declare const TAU: number;
/**
 * Golden ratio
 *
 * @export
 * @constant
 */
export declare const PHI = 1.618033988749895;
export interface Vector2D {
    x: number;
    y: number;
}
/**
 * Rotate a 2D vector by given angle, returns a new vector
 *
 * @export
 * @param {Vector2D} vector2D
 * @param {number} angle
 * @returns {Vector2D}
 */
export declare function rotate2D(v: Vector2D, angle: number): Vector2D;
