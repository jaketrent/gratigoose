export default function standardDeserialize(resOrErr) {
  let errs = []
  if (resOrErr instanceof Error) {
    errs = [{
      title: resOrErr.message,
      status: 500
    }]
  } else {
    errs = resOrErr.data.errors
  }

  return errs.map(err => {
    return {
      ...err,
      status: err.status || resOrErr.status
    }
  })
}
