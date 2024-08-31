// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DappNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("DappNFT", "DNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function createCollectible(address to, string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(to, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenCounter += 1;
        return newItemId;
    }
}
