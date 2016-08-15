export function isFor(fieldName, err) {
  return err.field ? new RegExp(fieldName).test(err.field) : false
}

export function existFor(fieldName, errors) {
  return errors.filter(err => isFor(fieldName, err)).length > 0
}
