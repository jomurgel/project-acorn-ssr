export const generateGetters = keys => {

  Array.isArray( keys ) || ( keys = [keys] )

  return keys.reduce( ( getters, key ) => {

    getters[key] = state => state[key]

    return getters
  }, {})
}
