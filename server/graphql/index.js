const debug = require('debug')('gg')
const {
  graphql,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} = require('graphql')
const graphqlHTTP = require('koa-graphql')
const koa = require('koa')
const mount = require('koa-mount')

const acctRepo = require('../acct/repo')
const catRepo = require('../cat/repo')
const transRepo = require('../trans/repo')

const app = koa()

const acctType = new GraphQLObjectType({
  name: 'acct',
  fields: {
    id: { type: GraphQLID },

    abbrev: { type: new GraphQLNonNull(GraphQLString) },
    liquidable: { type: GraphQLBoolean },
    name: { type: new GraphQLNonNull(GraphQLString) },

    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
})

const acctInputType = new GraphQLInputObjectType({
  name: 'acctInput',
  fields: {
    abbrev: { type: GraphQLString },
    liquidable: { type: GraphQLBoolean },
    name: { type: GraphQLString }
  }
})

const catType = new GraphQLObjectType({
  name: 'cat',
  fields: {
    id: { type: GraphQLID },

    abbrev: { type: new GraphQLNonNull(GraphQLString) },
    desc: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    name: { type: new GraphQLNonNull(GraphQLString) },

    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
})

const catInputType = new GraphQLInputObjectType({
  name: 'catInput',
  fields: {
    abbrev: { type: GraphQLString },
    desc: { type: GraphQLBoolean },
    type: { type: GraphQLString },
    name: { type: GraphQLString }
  }
})

const transType = new GraphQLObjectType({
  name: 'trans',
  fields: {
    id: { type: GraphQLID },

    acct: { type: acctType },
    amt: { type: new GraphQLNonNull(GraphQLFloat) },
    cat: { type: catType },
    checkNum: { type: GraphQLInt },
    clearedDate: { type: GraphQLString },
    date: { type: new GraphQLNonNull(GraphQLString) },
    desc: { type: GraphQLString },
    location: { type: GraphQLString },

    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
})

const transInputType = new GraphQLInputObjectType({
  name: 'transInput',
  fields: {
    acct: { type: GraphQLID },
    amt: { type: GraphQLFloat },
    cat: { type: GraphQLID },
    checkNum: { type: GraphQLInt },
    clearedDate: { type: GraphQLString },
    date: { type: GraphQLString },
    desc: { type: GraphQLString },
    location: { type: GraphQLString }
  }
})

const transMutationFieldConfig = {
  createTrans: {
    type: transType,
    args: {
      trans: { type: transInputType }
    },
    resolve(_, { trans }, app) {
      return transRepo.create(app.db, trans)
    }
  }
}

const acctQueryFieldConfig = {
  acct: {
    type: new GraphQLList(acctType),
    args: {
      id: { type: GraphQLID },
      search: { type: GraphQLString }
    },
    resolve(_, args, app) {
      if (args.id)
        return acctRepo.find(app.db, args.id)
      else if (args.search)
        return acctRepo.search(app.db, args.search)
      else
        return acctRepo.findAll(app.db)
    }
  }
}

const catQueryFieldConfig = {
  cat: {
    type: new GraphQLList(catType),
    args: {
      id: { type: GraphQLID },
      search: { type: GraphQLString }
    },
    resolve(_, args, app) {
      if (args.id)
        return catRepo.find(app.db, args.id)
      else if (args.search)
        return catRepo.search(app.db, args.search)
      else
        return catRepo.findAll(app.db)
    }
  }
}

const transQueryFieldConfig = {
  trans: {
    type: new GraphQLList(transType),
    args: {
      id: { type: GraphQLID }
    },
    resolve(_, args, app) {
      return args.id
        ? transRepo.find(app.db, args.id)
        : transRepo.findAll(app.db)
    }
  }
}

const rootQueryType = new GraphQLObjectType({
  name: 'rootQuery',
  fields: Object.assign({},
    acctQueryFieldConfig,
    catQueryFieldConfig,
    transQueryFieldConfig
  )
})

const rootMutationType = new GraphQLObjectType({
  name: 'rootMutation',
  fields: Object.assign({},
    transMutationFieldConfig
  )
})

const schema = new GraphQLSchema({
  mutation: rootMutationType,
  query: rootQueryType
})

function formatError(err) {
  return {
    title: err.message,
    locations: err.locations,
    stack: err.stack
  }
}

app.use(mount('/', graphqlHTTP((req, context) => ({
  context,
  formatError,
  schema,
  graphiql: true
}))))

module.exports = app
