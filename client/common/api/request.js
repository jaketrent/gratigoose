function markErrorRes(res) {
  return { ...res, status: 400 }
}

export default function request(args) {
  const { api } = args
  return new Promise((resolve, reject) => {
    api.request(args)
      .then(res => {
        if (Array.isArray(res.data.errors) && res.data.errors.length > 0)
          reject(api.deserializeError(markErrorRes(res), args))
        else 
          resolve(api.deserializeSuccess(res, args))
      })
      .catch(err => {
        reject(api.deserializeError(err.response, args))
      })
  })
}
