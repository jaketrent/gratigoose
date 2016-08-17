export function hasRequiredFields(trans) {
  return trans
      && trans.date
      && trans.desc && trans.desc.length > 0
      && trans.amt && trans.amt.length > 0
      && trans.acct && trans.acct.length > 0
      && trans.cat && trans.cat.length > 0
}
