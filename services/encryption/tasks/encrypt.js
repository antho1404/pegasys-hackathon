const crypto = require('crypto')

module.exports = (inputs, { success, error }) => {
  try {
    return success({
      encryptedData: crypto.publicEncrypt(
        inputs.publicKey,
        Buffer.from(inputs.data)
      ).toString('base64')
    })
  } catch (e) {
    return error({ message: e.toString() })
  }
}
