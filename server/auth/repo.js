const bcrypt = require('bcrypt')

async function serializeCreate(user) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(user.password, saltRounds)
  return {
    username: user.username,
    password_hash: hash
  }
}

function deserialize(doc) {
  return {
    username: doc.username,
    passwordHash: doc.password_hash
  }
}

function create(db, user) {
  return new Promise(async (resolve, reject) => {
    const serialized = await serializeCreate(user)
    db.auth_user.insert(serialized, (err, newDoc) => {
      if (err) return reject(err)

      resolve({ username: user.username })
    })
  })
}

function find(db, username) {
  return new Promise((resolve, reject) => {
    db.auth_user.find({ username }, (err, docs) => {
      if (err) return reject(err)

      if (Array.isArray(docs) && docs.length > 0)
        return resolve(deserialize(docs[0]))
      else
        return reject(new Error('User not found'))
    })
  })
}

exports.create = create
exports.find = find
