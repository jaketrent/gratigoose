import axios from 'axios'

export const create = {
  formatUrl() {
    return '/api/v1/graphql'
  },
  serialize({ trans }) {
    return { super: 'todo' }
  },
  request(args) {
    const { api } = args
    return axios.post(api.formatUrl(), api.serialize(args))
  },
  deserializeSuccess(res) {
    console.log('succ', res)
    return res.data
  },
  deserializeError(res) {
    console.log('err', res)
    return res.data
  }
}

