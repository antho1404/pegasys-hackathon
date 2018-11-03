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
const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS
const PRIVATE_KEY = process.env.PRIVATE_KEY
const PASSPHRASE = process.env.PASSPHRASE
const API_CONTRACT_ABI = require('../services/api-contract/Api.json')
const API_CALL_ABI = API_CONTRACT_ABI.filter((x: any) => x.type === 'event' && x.name === 'ExecutionCreated')[0]
const EDIT_EXECUTION_ABI = API_CONTRACT_ABI.filter((x: any) => x.type === 'function' && x.name === 'editExecution')[0]

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
  tags: (outputKey: string, outputData: any, taskKey: string, tags: string[]) => [...tags, `id=${outputData.decodedData.id}`, 'decrypt'],
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
  tags: (outputKey: string, outputData: any, taskKey: string, tags: string[]) => [...tags, 'send'],
  inputs: (outputKey: string, outputData: any, taskKey: string, tags: string[]) => {
    const data = JSON.parse(outputData.data)
    return {
      apiKey: SENDGRID_API_KEY,
      from: data.from || 'contact@mesg.com',
      to: data.to || 'anthony@mesg.com',
      subject: data.subject || 'hello',
      text: data.text || 'hello'
    }
  }
})

MESG.whenResult({
  serviceID: API_ID,
  taskKey: 'send',
  outputKey: 'success',
  tagFilters: ['send']
}, {
  serviceID: ETHEREUM_ID,
  taskKey: 'executeSmartContractMethod',
  inputs: (outputKey: string, outputData: any, taskKey: string, tags: string[]) => {
    const id = tags
      .filter(x => x.startsWith('id='))
      .map(x => x.split('=')[1])
      .join('')
    return {
      methodAbi: EDIT_EXECUTION_ABI,
      contractAddress: CONTRACT_ADDRESS,
      privateKey: ETH_PRIVATE_KEY,
      gasLimit: 8000000,
      inputs: {
        id,
        status: 1,
        result: outputData.status.toString()
      }
    }
  }
})
