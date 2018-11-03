pragma solidity ^0.4.23;

contract Api {
    enum Status { Created, Success, Error }
    struct Execution {
        Status status;
        string result;
        address sender;
    }

    address public owner;
    uint256 public price;
    mapping (bytes32=>Execution) executions;

    event ExecutionCreated(bytes32 indexed id, string data);
    event ExecutionChanged(bytes32 indexed id);

    constructor(uint256 _price) public {
        owner = msg.sender;
        price = _price;
    }

    modifier onlyOwner() {
        if (msg.sender == owner) _;
    }

    function execute(string data) public payable returns (bytes32 id) {
        require(msg.value >= price, "Not enough value");
        bytes32 _id = keccak256(
            abi.encodePacked(msg.sender, block.number, data)
        );
        executions[_id] = Execution({
            status: Status.Created,
            result: "",
            sender: msg.sender
        });
        emit ExecutionCreated(_id, data);
        return _id;
    }

    function editExecution(bytes32 id, Status status, string result) public onlyOwner {
        Execution storage exec = executions[id];
        exec.status = status;
        exec.result = result;

        if (status == Status.Success) {
            // transfer price to owner
            owner.transfer(price);
        }
        else {
            // transfer price back to sender
            exec.sender.transfer(price);
        }

        emit ExecutionChanged(id);
    }
}
