export function addToSet(set, value) {
  if (set.find(entry => entry === value)) {
    // already in set
    return false
  }
  set.push(value)
  return false
}

export function removeFromSet(set, value) {
  const index = set.findIndex(entry => entry === value)
  if (index === -1) {
    return false
  }
  set.splice(index, 1)
  return true
}
