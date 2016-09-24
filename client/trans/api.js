import axios from 'axios'

import * as dateUtils from '../common/date'
import deserializeError from '../common/api/deserialize-error'
import * as utils from './utils'

function serializeCreate({ trans }) {
  return {
    acctId: trans.acct.id,
    amt: trans.amt,
    catId: trans.cat.id,
    date: dateUtils.format(trans.date),
    desc: trans.desc
    // TODO: add cols
    // location, checkNum, clearedDate
  }
}

function serializeUpdate({ trans }) {
  const serialized = serializeCreate({ trans })
  return {
    ...serialized ,
    id: trans.id
  }
}

function deserializeSuccess(res, args) {
  return utils.combineRelations(res.data.data, args)
}

export const create = {
  formatUrl() {
    return '/api/v1/trans'
  },
  serialize: serializeCreate,
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

export const update = {
  formatUrl({ trans }) {
    return `/api/v1/trans/${trans.id}`
  },
  serialize: serializeUpdate,
  request(args) {
    const { api } = args
    return axios.put(api.formatUrl(args), api.serialize(args))
  },
  deserializeSuccess,
  deserializeError
}
