const MESG = require('mesg-js').service()

MESG.listenTask({
  encrypt: require('./tasks/encrypt'),
  decrypt: require('./tasks/decrypt'),
  generate: require('./tasks/generate')
})
