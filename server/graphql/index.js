const debug = require('debug')('gg')
const {
  graphql,
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
    name: { type: new GraphQLNonNull(GraphQLString) }
  }
})

const transInputType = new GraphQLInputObjectType({
  name: 'transInput',
  fields: {
    name: { type: GraphQLString }
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
