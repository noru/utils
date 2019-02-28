
export function assert(condition: boolean, errorMsg: string) {
  if (!condition) throw new Error(errorMsg)
}

export const invariant = assert
export const preCondition = assert
export const postCondition = assert