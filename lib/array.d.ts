/**
 * To test if an argument is an Array
 *
 * @export
 * @param {*} testee
 * @returns {boolean}
 */
export declare function isArray(testee: any): testee is any[];
/**
 * Check if an array contains any elements.
 * null/undefined are considered empty.
 *
 * @export
 * @param {(any[] | undefined | null)} arr
 * @returns
 */
export declare function isNullOrEmpty(arr: any[] | undefined | null): boolean;
/**
 * Like flatMap, this function walks through the nested(multi-demension) array.
 * This function keep the original demesions.
 * e.g.: deepMap([1, [2, 3]], x => x + 1) => [2, [3, 4]]
 *
 * @export
 * @param {any[]} deepArray
 * @param {(item: any, cord: number[], index: number) => any} iteratee
 * @returns
 */
export declare function deepMap(deepArray: any[], iteratee: (item: any, cord: number[], index: number) => any, pos?: number[], index?: any): any;
/**
 * Shallow compare two arrays/objects
 *
 * @export
 * @param {(object | any[])} a
 * @param {(object | any[])} b
 * @returns {boolean}
 */
export declare function shallowEqual(a: object | any[], b: object | any[]): boolean;
/**
 * Swap value of array's two postions
 *
 * @export
 * @param {any[]} arr
 * @param {*} pos1
 * @param {*} pos2
 * @returns arr
 */
export declare function swap(arr: any[], pos1: number | number[], pos2: number | number[]): void;
/**
 * Pick a value from a deep array by its indices.
 * e.g.: pick(arr, 1, 2, 3) = arr[1][2][3]
 * if an array is supplied as the last parameter, it will be filled with arrays in each level
 * e.g.: [rootArray, subArray, ..., parentArray]
 * @export
 * @param {any[]} array
 * @param {any} indices target value indices in a deep array. e.g. the indice of value `arr[i1][i2][i3]` is [i1, i2, i3]
 * the last one can be an empty array to hold parents in each level
 * @returns {any}
 */
export declare function pick(array: any[], ...indices: any[]): any;
/**
 * Perform binary search on a sorted array. Element will be fed to predict function, if true, the target is
 * found and returned, otherwise onward function is called and the returned value determins the next
 * move:
 *   true  - left-ward continuance
 *   false - right-ward continuance
 *
 * null is returned if none is suitable
 *
 * @export
 * @template T
 * @param {T[]} array
 * @param {((i: T) => boolean | undefined)} predict
 * @param {(i: T) => boolean} onward
 * @returns {[T, number]| null} result and its index, null if not found
 */
export declare function binarySearch<T>(array: T[], predict: (i: T) => boolean, onward: (i: T) => boolean, start?: number, end?: number): [T, number] | null;
/**
 * Experiment feature...
 *
 * @export
 * @template T
 * @param {T[]} arr
 * @param {string} keyProperty
 * @param {string} linkProperty
 * @param {string} [childrenProp='__children__']
 * @returns {T[]}
 */
export declare function unflatten<T>(arr: T[], keyProperty: string, linkProperty: string, childrenProp?: string): T[];
