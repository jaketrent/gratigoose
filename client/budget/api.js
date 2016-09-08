import axios from 'axios'

import deserializeError from '../common/api/deserialize-error'

export const findInYearMonth = {
  formatUrl({ month, year }) {
    return `/api/v1/trans/year/${year}/month/${month}/budget`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl(args))
  },
  deserializeSuccess(res) {
    return res.data.data
  },
  deserializeError
}
