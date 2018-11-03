import { application } from 'mesg-js'

if (!process.env.SENDGRID_API_KEY
  || !process.env.ETHEREUM_ID
  || !process.env.API_ID
  || !process.env.PRIVATE_KEY
  || !process.env.CONTRACT_ADDRESS
  || !process.env.ENCRYPT_ID) throw "load env variables"

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
const ETHEREUM_ID = process.env.ETHEREUM_ID
const ENCRYPT_ID = process.env.ENCRYPT_ID
const API_ID = process.env.API_ID
const ETH_PRIVATE_KEY = process.env.PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PASSPHRASE = process.env.PASSPHRASE
const API_CONTRACT_ABI = require('../services/api-contract/build/contracts/Api.json').abi
const API_CALL_ABI = API_CONTRACT_ABI.filter((x: any) => x.type === 'event' && x.name === 'APIexecute')[0]
const SUBMIT_VERIFICATION_ABI = API_CONTRACT_ABI.filter((x: any) => x.type === 'function' && x.name === 'submitVerification')[0]

const MESG = application()

MESG.whenEvent({
  serviceID: ETHEREUM_ID,
  eventKey: 'log',
  filter: (eventKey: string, eventData: any) => eventData['address'].toLowerCase() === CONTRACT_ADDRESS.toLowerCase()
}, {
  serviceID: ETHEREUM_ID,
  taskKey: 'decodeLog',
  tags: ['decodelog'],
  inputs: (eventKey: string, eventData: Object) => ({
    ...eventData,
    abi: API_CALL_ABI
  }),
})

MESG.whenResult({
  serviceID: ETHEREUM_ID,
  taskKey: 'decodeLog',
  outputKey: 'success',
  tagFilters: ['decodelog']
}, {
  serviceID: ENCRYPT_ID,
  taskKey: 'decrypt',
  tags: ['decrypt'],
  inputs: (outputKey: string, outputData: any, taskKey: string, tags: string[]) => ({
    privateKey: PRIVATE_KEY,
    passphrase: PASSPHRASE,
    encryptedData: outputData.decodedData.data
  })
})

MESG.whenResult({
  serviceID: ENCRYPT_ID,
  taskKey: 'decrypt',
  outputKey: 'success',
  tagFilters: ['decrypt']
}, {
  serviceID: API_ID,
  taskKey: 'send',
  inputs: (outputKey: string, outputData: any, taskKey: string, tags: string[]) => {
    const data = JSON.parse(outputData.data)
    console.log(data)
    return {
      apiKey: SENDGRID_API_KEY,
      from: data.from || 'contact@mesg.com',
      to: data.to || 'anthony@mesg.com',
      subject: data.subject || 'hello',
      text: data.text || 'hello'
    }
  }
})

// MESG.whenResult({
//   serviceID: API_ID,
//   taskKey: 'send',
//   outputKey: 'success'
// }, {
//   serviceID: ETHEREUM_ID,
//   taskKey: 'executeSmartContractMethod',
//   inputs: (outputKey: string, outputData: any, taskKey: string, tags: string[]) => ({
//     methodAbi: SUBMIT_VERIFICATION_ABI,
//     contractAddress: CONTRACT_ADDRESS,
//     privateKey: ETH_PRIVATE_KEY,
//     data: {
//       status: outputData.status.toString()
//     }
//   })
// })