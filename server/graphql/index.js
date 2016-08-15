const debug = require('debug')('gg')
const { graphql, GraphQLList, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql')
const graphqlHTTP = require('koa-graphql')
const koa = require('koa')
const mount = require('koa-mount')

const transRepo = require('../trans/repo')

const app = koa()

const transType = new GraphQLObjectType({
  name: 'trans',
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  }
})

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      trans: {
        type: new GraphQLList(transType),
        args: {
          id: { type: GraphQLInt }
        },
        resolve(_, args) {
          return args.id
            ? transRepo.find(args.id)
            : transRepo.findAll()
        }
      }
    }
  })
})

app.use(mount('/', graphqlHTTP({
  schema,
  graphiql: true
})))

module.exports = app
