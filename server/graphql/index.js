const debug = require('debug')('gg')
const koa = require('koa')
const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const route = require('koa-route')

const app = koa()

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world'
        }
      }
    }
  })
})

function* list() {
  debug('graphql list')
  const result = yield graphql(schema, this.query)
  debug('graphql list result', result)
  this.body = result
}

app.use(route.post('/', list))

module.exports = app
