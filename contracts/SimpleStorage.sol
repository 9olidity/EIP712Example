// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "hardhat/console.sol";


contract SimpleStorage  {
  uint storedData;


  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }

  function executeSetIfSignatureMatch(
    uint8 v,
    bytes32 r,
    bytes32 s,
    address sender,
    // uint256 deadline,
    uint x
  ) public {
    // require(block.timestamp < deadline, "Signed transaction expired");
    

    uint chainId;
    assembly {
      chainId := chainid()
    }
    chainId = 1337;
    console.log(chainId);
    bytes32 eip712DomainHash = keccak256(
        abi.encode(
            keccak256(
                "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
            ),
            keccak256(bytes("SetTest")),
            keccak256(bytes("1")),
            chainId,
            address(this) // 这个值
        )
    );  

    bytes32 hashStruct = keccak256(
      abi.encode(
          keccak256("set(address sender,uint x)"),
          sender,
          x
          // deadline
        )
    );


    bytes32 hash = keccak256(abi.encodePacked("\x19\x01", eip712DomainHash, hashStruct));
    address signer = ecrecover(hash, v, r, s);

    console.log(sender);
    console.log(signer);

    require(signer == sender, "MyFunction: invalid signature");
    require(signer != address(0), "ECDSA: invalid signature");
    set(x);
  }

}