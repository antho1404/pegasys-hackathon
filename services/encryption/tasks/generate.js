const crypto = require('crypto')

module.exports = (inputs, { success, error }) => {
  try {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: inputs.passphrase
      }
    })
    return success({
      publicKey,
      privateKey
    })
  } catch (e) {
    return error({ message: e.toString() })
  }
}
