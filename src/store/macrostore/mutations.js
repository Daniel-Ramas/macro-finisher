export function SET_ADDRESS(state, payload) {
  state.address = payload
}

export function SET_MACROS(state, payload) {
  state.macros.proteins = payload.proteins
  state.macros.carbs = payload.carbs
  state.macros.fats = payload.fats
  state.macros.calories = payload.calories
}

export function PUSH_BRANDIDS(state, payload) {
  state.brandIds = [...state.brandIds, ...payload]
}

export function SUBTRACT_SELECTION(state, { proteins, carbs, fats, calories }) {
  state.macros.proteins = state.macros.proteins - proteins
  state.macros.carbs = state.macros.carbs - carbs
  state.macros.fats = state.macros.fats - fats
  state.macros.calories = state.macros.calories - calories
}

export function ADD_BACK_MACROS(state, { proteins, carbs, fats, calories }) {
  state.macros.proteins = state.macros.proteins + proteins
  state.macros.carbs = state.macros.carbs + carbs
  state.macros.fats = state.macros.fats + fats
  state.macros.calories = state.macros.calories + calories
}
