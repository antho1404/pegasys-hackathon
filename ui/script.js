const CONTRACT_ADDRESS = '0x82d8496d668D2E1e298C7B061aA88498Fd068971'
const ABI = [
  {
    constant: false,
    inputs: [
      { name: 'id', type: 'bytes32' },
      { name: 'status', type: 'uint256' },
      { name: 'result', type: 'string' }
    ],
    name: 'editExecution',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'price',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'data', type: 'string' }],
    name: 'execute',
    outputs: [{ name: 'id', type: 'bytes32' }],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ name: '_price', type: 'uint256' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'id', type: 'bytes32' },
      { indexed: false, name: 'data', type: 'string' }
    ],
    name: 'ExecutionCreated',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, name: 'id', type: 'bytes32' }],
    name: 'ExecutionChanged',
    type: 'event'
  }
]

;(function () {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/"));
  }

  const data = JSON.stringify({
    from: '__FROM_EMAIL_HERE__',
    to: '__TO_EMAIL_HERE__',
    subject: '__SUBJECT_HERE__',
    text: '__TEXT_HERE__'
  })

  const ids = {}

  const appendLog = text => {
    const div = document.createElement("div")
    div.innerText = text
    div.classList.add('alert')
    div.classList.add('alert-success')
    document.querySelector(".results").appendChild(div)
  }

  const contract = web3.eth.contract(ABI).at(CONTRACT_ADDRESS)

  contract.ExecutionCreated({
    fromBlock: 0,
    toBlock: 'latest'
  }, (error, event) => {
    if (error) { return alert(error) }
    if (event.args.data !== data) { return }
    ids[event.args.id] = true
    console.log(event)
    appendLog(`Sending email: ${event.args.id}`)
  })

  contract.ExecutionChanged({
    fromBlock: 0,
    toBlock: 'latest'
  }, (error, event) => {
    if (error) { return alert(error) }
    if (!ids[event.args.id]) { return }
    ids[event.args.id] = false
    appendLog(`Verification sent: ${event.args.id}`)
  })

  window.execute = async () => {
    return new Promise((resolve, reject) => {
      contract.execute(data, { value: "1000000" }, (err, res) => {
        if (err) { return alert(res) }
        appendLog(`Processing transaction: ${res}`)
      })
    })
  }
})()