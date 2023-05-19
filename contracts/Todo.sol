// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Todo {
    address public owner;
    string[] lists;

    constructor() {
        owner = msg.sender;
    }

    function add(string memory text) public {
        require(owner == msg.sender);
        lists.push(text);
    }

    function edit(string memory text, uint256 index) public {
        require(owner == msg.sender);
        lists[index] = text;
    }

    function list() public view returns (string[] memory) {
        require(owner == msg.sender);
        return lists;
    }
}