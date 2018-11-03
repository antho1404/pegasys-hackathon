const crypto = require('crypto')

module.exports = (inputs, { success, error }) => {
  try {
    const buf = Buffer.from(inputs.encryptedData, 'base64')
    return success({
      data: crypto.privateDecrypt({
        key: inputs.privateKey,
        passphrase: inputs.passphrase
      }, buf).toString()
    })
  } catch (e) {
    return error({ message: e.toString() })
  }
}
