export function getMacros(state) {
  return state.macros
}

export function getBrandIds(state) {
  return state.brandIds.map(item => item.brandId)
}

export function getBrandNames(state) {
  return state.brandIds.map(item => item.name)
}

export function getFullLocationInfo(state) {
  return state.brandIds
}

export function getLocation(state) {
  return state.address
}
