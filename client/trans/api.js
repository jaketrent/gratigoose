import axios from 'axios'

import deserializeError from '../common/api/deserialize-error'
import * as utils from './utils'

function deserializeSuccess(res, args) {
  return utils.combineRelations(res.data.data, args)
}

export const create = {
  formatUrl() {
    return '/api/v1/trans'
  },
  serialize({ trans }) {
    console.log('trans', trans)
    return {
      acctId: trans.acct.id,
      // TODO: maybe move this into ingest/utils#formatTrans
      amt: trans.amt.replace('\$', ''),
      catId: trans.cat.id,
      date: trans.date,
      desc: trans.desc
      // TODO: add cols
      // location, checkNum, clearedDate
    }
  },
  request(args) {
    const { api } = args
    return axios.post(api.formatUrl(), api.serialize(args))
  },
  deserializeSuccess,
  deserializeError
}

export const findAll = {
  formatUrl() {
    return '/api/v1/trans'
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl())
  },
  deserializeSuccess,
  deserializeError
}

export const findInYear = {
  formatUrl({ year }) {
    return `/api/v1/trans/year/${year}`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl(args))
  },
  deserializeSuccess,
  deserializeError
}

export const findInYearMonth = {
  formatUrl({ month, year }) {
    return `/api/v1/trans/year/${year}/month/${month}`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl(args))
  },
  deserializeSuccess,
  deserializeError
}
