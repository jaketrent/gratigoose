export default function request(args) {
  const { api } = args
  return new Promise((resolve, reject) => {
    api.request(args)
      .then(res => {
        if (Array.isArray(res.errors) && res.errors.length > 0)
          reject(api.deserializeError(res, args))
        else 
          resolve(api.deserializeSuccess(res, args))
      })
      .catch(err => {
        reject(api.deserializeError(err.response, args))
      })
  })
}
