// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Token.sol";

contract EthSwap {
  string public name = "EthSwap Instant Exchange";
  Token public token;
  uint public rate = 100;

  constructor(Token _token) {
    token = _token;
  }

  function buyTokens() public payable {
    uint tokenAmount = msg.value * rate;
    token.transfer(msg.sender, tokenAmount);
  }
}