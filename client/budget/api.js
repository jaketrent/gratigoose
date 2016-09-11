import axios from 'axios'

import deserializeError from '../common/api/deserialize-error'
import * as expectedUtils from '../expected/utils'
import * as transUtils from '../trans/utils'

export const findInYearMonth = {
  formatUrl({ month, year }) {
    return `/api/v1/trans/year/${year}/month/${month}/budget`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl(args))
  },
  deserializeSuccess(res, args) {
    return {
      ...res.data.data,
      expecteds: expectedUtils.combineRelations(res.data.data.expecteds, args),
      transs: transUtils.combineRelations(res.data.data.transs, args)
    }
  },
  deserializeError
}

export const createExpected = {
  formatUrl() {
    return `/api/v1/expected`
  },
  serialize({ amt, cat, month, year }) {
    return {
      amt,
      catId: cat.id,
      date: `${year}-${month}-01`
    }
  },
  request(args) {
    const { api } = args
    return axios.post(api.formatUrl(), api.serialize(args))
  },
  deserializeSuccess(res, args) {
    return expectedUtils.combineRelations(res.data.data, args)
  },
  deserializeError
}

export const updateExpected = {
  formatUrl({ expected }) {
    return `/api/v1/expected/${expected.id}`
  },
  serialize({ amt, expected }) {
    return {
      amt,
      catId: expected.cat.id,
      date: expected.date,
      id: expected.id,
    }
  },
  request(args) {
    const { api } = args
    return axios.put(api.formatUrl(args), api.serialize(args))
  },
  deserializeSuccess(res, args) {
    return expectedUtils.combineRelations(res.data.data, args)
  },
  deserializeError
}
