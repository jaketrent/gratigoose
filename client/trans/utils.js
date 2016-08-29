export function hasRequiredFields(trans) {
  return trans
      && trans.date && trans.date.length > 0
      && trans.desc && trans.desc.length > 0
      && trans.amt && trans.amt.length > 0
      && trans.acct.id
      && trans.cat.id
}
