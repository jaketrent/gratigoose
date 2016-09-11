export default function request(args) {
  const { api } = args
  return new Promise((resolve, reject) => {
    api.request(args)
      .then(res => {
        resolve(api.deserializeSuccess(res, args))
      })
      .catch(err => {
        reject(api.deserializeError(err.response || err, args))
      })
  })
}
