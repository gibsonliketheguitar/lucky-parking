export function clamp<T>(ele: T, minBound : T, maxBound: T) {
  if(ele <= minBound) return minBound
  if(ele >= maxBound) return maxBound
  return ele
}
