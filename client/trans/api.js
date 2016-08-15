import axios from 'axios'

// TODO: fix to mutate
export const create = {
  formatUrl() {
    const query = `
      {
        trans {
          name
        }
      }
    `
    return `/api/v1/graphql?query=${encodeURIComponent(query)}`
  },
  // serialize({ trans }) {
  //   return { super: 'todo' }
  // },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl()) // , api.serialize(args))
  },
  deserializeSuccess(res) {
    return res.data.data.trans
  },
  deserializeError(res) {
    // TODO: generalize
    return res.data
  }
}

export const findAll = {
  formatUrl() {
    const query = `
      {
        trans {
          id,
          name
        }
      }
    `
    return `/api/v1/graphql?query=${encodeURIComponent(query)}`
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl())
  },
  deserializeSuccess(res) {
    return res.data.data.trans
  },
  deserializeError(res) {
    return res.data
  }
}

export const find = {
  formatUrl({ id }) {
    const query = `
      {
        trans(id: ${id}) {
          id,
          name
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
    return res.data.data.trans[0]
  },
  deserializeError(res) {
    return res.data
  }
}
