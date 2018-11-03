const crypto = require('crypto')

const generate = (inputs, { success, error }) => {
  try {
    crypto.generateKeyPair('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: ''
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        return error({ message: err.toString() })
      }
      return success({
        publicKey,
        privateKey
      })
    })
  } catch (e) {
    return error({ message: e.toString() })
  }
}

exports.default = generate