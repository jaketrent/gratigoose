export default function standardDeserialize(res) {
  return (res.data.errors || []).map(err => {
    return { ...err, status: res.status }
  })
}
