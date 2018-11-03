pragma solidity ^0.4.23;

contract Api {
    address public owner;
    mapping (bytes32=>uint) verifications;

    event APIexecute(bytes32 id, string data);

    constructor() public {
        owner = msg.sender;
    }

    function execute(string data) public payable {
        bytes32 id = keccak256(
            abi.encodePacked(msg.sender, block.number, data)
        );
        emit APIexecute(id, data);
    }
}
