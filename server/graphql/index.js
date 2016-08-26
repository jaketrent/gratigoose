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
    type: { type: GraphQLString },
    desc: { type: GraphQLBoolean },
    name: { type: new GraphQLNonNull(GraphQLString) },

    created: { type: GraphQLString },
    updated: { type: GraphQLString }
  }
})

const catInputType = new GraphQLInputObjectType({
  name: 'catInput',
  fields: {
    abbrev: { type: GraphQLString },
    type: { type: GraphQLString },
    desc: { type: GraphQLBoolean },
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

app.use(mount('/', graphqlHTTP((req, context) => ({
  context,
  schema,
  graphiql: true
}))))

module.exports = app
