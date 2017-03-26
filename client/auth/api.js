import axios from 'axios'

import deserializeError from '../common/api/deserialize-error'

function serialize({ username, password }) {
  return {
    username,
    password
  }
}

function deserializeSuccess(res, args) {
  return res.data
}

export const create = {
  formatUrl() {
    return '/api/v1/auth'
  },
  serialize,
  request(args) {
    const { api } = args
    return axios.post(api.formatUrl(), api.serialize(args))
  },
  deserializeSuccess,
  deserializeError
}

export const show = {
  formatUrl() {
    return '/api/v1/auth'
  },
  request(args) {
    const { api } = args
    return axios.get(api.formatUrl())
  },
  deserializeSuccess,
  deserializeError
}

export const destroy = {
  formatUrl({ trans }) {
    return `/api/v1/auth`
  },
  request(args) {
    const { api } = args
    return axios.delete(api.formatUrl(args))
  },
  deserializeSuccess() {}, // unused
  deserializeError
}
