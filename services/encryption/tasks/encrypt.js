const crypto = require('crypto')

const encrypt = (inputs, { success }) => {
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

exports.default = encrypt