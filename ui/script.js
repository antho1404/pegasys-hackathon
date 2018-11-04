const CONTRACT_ADDRESS = "0x82d8496d668D2E1e298C7B061aA88498Fd068971"
const PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwggP6WGF6gBiUG53y3QO\ntz4xlF4yXHST7gpFP3rNgZmrKyvqnrPb9vFyMOMoBMn62w2LYp619dwLFcg7ulaH\na4YEV37Pz2hssx05nD2w6aP0Moj9tEW8PvNBWKDcM4NVfzh3jLjCYEzCPzIkkTQ+\nnpZ/Dj36vbZNKjwGYVlYRqAXB97oPM22uGGmqdTTr8D6yQtlO88HXkcf70ZU80XV\nMK3K7CxRlCk58BATe21Fh6kGNPwUhfoj3+R+eRteFyR+S+w5wzqctT4R1Vep3JvJ\nPPsRtZVNxu0BsgynjUEOd5fXnlWLDrbd2gIL30vVxJq+XB6+UtUk2n2+KCZUR5BD\nL7cc+esCDZtDs9YcgN+v4H4DMEtxPXcD7GK3n9SKPddi0+f+qcXyVAyeqH04U6Iq\nAumPDCq6ln776QvY78jfxRry36OJK7K7Bzd1mq+3C64inF3PJ37hOV3VNFi2juUO\nuQFhfc3kEILJj8XrzsTtiHnHKxJ/JRkSQyVl9lSt/JFZpsSnv20RjWOGRtusNerN\nta4JnDA7fSJrgklWlj56llacfr0+Pi1vUkpvhmtF1LLe2fHdk2bu2dUXrcUSC3gp\nnu0DipF4spQe8U0IQ2nKxgHLbxnr9vz+I1ZxKFsinBmHrTM9BRP24AaibJC0QFmQ\nVi6ZVu2/T2NzngSVALKMmGECAwEAAQ==\n-----END PUBLIC KEY-----\n"
const ABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "id",
				"type": "bytes32"
			},
			{
				"name": "status",
				"type": "uint256"
			},
			{
				"name": "result",
				"type": "string"
			}
		],
		"name": "editExecution",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "data",
				"type": "string"
			}
		],
		"name": "execute",
		"outputs": [
			{
				"name": "id",
				"type": "bytes32"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_price",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "data",
				"type": "string"
			}
		],
		"name": "ExecutionCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "bytes32"
			}
		],
		"name": "ExecutionChanged",
		"type": "event"
	}
]

;(function () {
  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/"));
  }

  const data = "v3qU6HYM/efW/yEyrmlfyyMiT9L5Ciehpj8+EotDORgVBYNCU9DCz50/TKQyQzoG0blElCh4GLjAKVKQC1/ujal9HYFYSjEaybbFaMrE+OlBsvCASwqwYLvZgmB3VokdzRK5bJvWzGN/lAuGoeYyhDCWZ3qwmJsVe8CpWVTQsTkliQ/l+obJJoDQGUTXjBiUtnjPrwAJMbp7hVhBypBXizUb8LHvACM7uXox1v/HYzEcdbFC4B2EmblLO1x7hgFDOZCdFgPdWPhvhnZap8qewbNiH1jhgppmSgjXzo/pwoDc49m14ijN5csg47ckxfZoDh/jjueUejuxiAGdmESsLrhrPvL40phyxgKZ6lMTp+k9IuL5K6It+/87z1heBbL1AZfprhnQbzaIB8ALUHHFp2/kWN3FP2UKioMEJSB/ofgdoe2O7IEfzuWDPjO8hBMcrIa62lTl6N5dymVpb4LDKP1bKPG09UBcCPm7McZQVTWqEBLh4jU+laeLWMYAecVwYGTWUKkc5wRe3+jCrOpw5HQgHGClflIpplvTphuLkgiIhx5MBiQb+LE1fRNDbDbWVszchY1Kn1dB3GOL4dVKikOSDiUCimIFXskEF/SKsyBskr+Cc+tL6++jSPtJDDPVpqiVo6aPlOeSJ5j0nq1vcZjxnE8I8bj8oiXWWazdPBw="
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