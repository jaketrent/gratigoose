import axios from 'axios'

const frags = {
  acct: {
    view: `
      id,
      name,
      abbrev,
      liquidable
    `
  }
}

export const search = {
  formatUrl({ term }) {
    const query = `
      {
        acct(search: "${term}") {
          ${frags.acct.view}
        }
      }
    `
    return `/api/v1/graphql?query=${encodeURIComponent(query)}`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl(args))
  },
  deserializeSuccess(res) {
    return res.data.data.acct
  },
  deserializeError(res) {
    return res.data
  }
}
