module.exports = async function requireLogin(ctx, next) {
  console.log('auth')
  if (ctx.isAuthenticated()) {
    console.log('bef')
    await next()
    console.log('aft')
  } else {
    ctx.status = 401
    ctx.body = {
      errors: [{ title: 'Login required', status: 401 }]
    }
  }
}
