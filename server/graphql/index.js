const debug = require('debug')('gg')
const {
  graphql,
  GraphQLFloat,
  GraphQLID,
  GraphQLInputObjectType,
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

const transType = new GraphQLObjectType({
  name: 'trans',
  fields: {
    id: { type: GraphQLID },
    date: { type: new GraphQLNonNull(GraphQLString) },
    desc: { type: new GraphQLNonNull(GraphQLString) },
    amt: { type: new GraphQLNonNull(GraphQLFloat) },
    acct: { type: new GraphQLNonNull(GraphQLString) },
    cat: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const transInputType = new GraphQLInputObjectType({
  name: 'transInput',
  fields: {
    date: { type: GraphQLString },
    desc: { type: GraphQLString },
    amt: { type: GraphQLFloat },
    acct: { type: GraphQLString },
    cat: { type: GraphQLString }
  }
})

const transMutationFieldConfig = {
  createTrans: {
    type: transType,
    args: {
      trans: { type: transInputType }
    },
    resolve(_, { trans }) {
      return transRepo.create(trans)
    }
  }
}

const transQueryFieldConfig = {
  trans: {
    type: new GraphQLList(transType),
    args: {
      id: { type: GraphQLID }
    },
    resolve(_, args) {
      return args.id
        ? transRepo.find(args.id)
        : transRepo.findAll()
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

app.use(mount('/', graphqlHTTP({
  schema,
  graphiql: true
})))

module.exports = app
