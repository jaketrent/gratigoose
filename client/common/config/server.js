if (!window.env)
  throw new Error('window.env must be set')

const env = Object.freeze(window.env)

export default env
