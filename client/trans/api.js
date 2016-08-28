import axios from 'axios'

const frags = {
  trans: {
    view: `
      id,
      date,
      desc,
      amt,
      acct {
        id,
        abbrev
      },
      cat {
        id,
        abbrev
      }
    `
  }
}

export const create = {
  formatUrl() {
    return `/api/v1/graphql`
  },
  serialize({ trans }) {
    const query = `mutation newTrans {
      createTrans(trans: {
        date: "${trans.date}",
        desc: "${trans.desc}",
        amt: ${trans.amt},
        acct: "${trans.acct}",
        cat: "${trans.cat}"
      }) {
        ${frags.trans.view}
      }
    }`
    return { query }
  },
  request(args) {
    const { api } = args
    return axios.post(api.formatUrl(), api.serialize(args))
  },
  deserializeSuccess(res) {
    return res.data.data.createTrans
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
          ${frags.trans.view}
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
          ${frags.trans.view}
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
