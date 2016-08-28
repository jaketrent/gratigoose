import axios from 'axios'

const frags = {
  cat: {
    view: `
      id,

      abbrev,
      desc,
      name,
      type
    `
  }
}

export const search = {
  formatUrl({ term }) {
    const query = `
      {
        cat(search: "${term}") {
          ${frags.cat.view}
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
    return res.data.data.cat
  },
  deserializeError(res) {
    return res.data
  }
}
