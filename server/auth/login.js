module.exports = async function requireLogin(ctx, next) {
  if (ctx.isAuthenticated()) {
    await next()
  } else {
    ctx.status = 401
    ctx.body = {
      errors: [{ title: 'Login required', status: 401 }]
    }
  }
}
