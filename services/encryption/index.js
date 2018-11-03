const MESG = require('mesg-js').service()

MESG.listenTask({
  encrypt: require('./tasks/encrypt').default,
  decrypt: require('./tasks/decrypt').default,
  generate: require('./tasks/generate').default
})