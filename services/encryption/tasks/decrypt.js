const crypto = require('crypto')

const decrypt = (inputs, { success, error }) => {
  try {
    return success({
      data: crypto.privateDecrypt(
        {
          key: inputs.privateKey,
          passphrase: inputs.passphrase,
        },
        b
      ).toString()
    })
  } catch (e) {
    return error({ message: e.toString() })
  }
}
exports.default = decrypt