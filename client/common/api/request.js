export default function request(args) {
  const { api } = args
  return new Promise((resolve, reject) => {
    api.request(args)
      .then(res => {
        resolve(api.deserializeSuccess(res, args))
      })
      .catch(res => {
        if (res instanceof Error) throw res

        reject(api.deserializeError(res, args))
      })
  })
}
