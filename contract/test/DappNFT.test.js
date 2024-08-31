const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DappNFT Contract", function () {
  let DappNFT;
  let dappNFT;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    DappNFT = await ethers.getContractFactory("DappNFT");
    [owner, addr1, addr2, _] = await ethers.getSigners();

    dappNFT = await DappNFT.deploy();
  });

  it("Should deploy the contract and set the right owner", async function () {
    expect(await dappNFT.owner()).to.equal(owner.address);
  });

  it("Should allow the owner to mint a new NFT", async function () {
    const tokenURI = "https://example.com/nft";
    await dappNFT.createCollectible(owner.address, tokenURI);

    const tokenId = 0;
    expect(await dappNFT.ownerOf(tokenId)).to.equal(owner.address);
    expect(await dappNFT.tokenURI(tokenId)).to.equal(tokenURI);
  });

  it("Should increment the token counter when a new NFT is minted", async function () {
    const tokenURI1 = "https://example.com/nft1";
    const tokenURI2 = "https://example.com/nft2";

    await dappNFT.createCollectible(owner.address, tokenURI1);
    expect(await dappNFT.tokenCounter()).to.equal(1);

    await dappNFT.createCollectible(owner.address, tokenURI2);
    expect(await dappNFT.tokenCounter()).to.equal(2);
  });

  it("Should allow multiple addresses to mint NFTs", async function () {
    const tokenURI1 = "https://example.com/nft1";
    const tokenURI2 = "https://example.com/nft2";

    await dappNFT.connect(addr1).createCollectible(addr1.address, tokenURI1);
    expect(await dappNFT.ownerOf(0)).to.equal(addr1.address);

    await dappNFT.connect(addr2).createCollectible(addr2.address, tokenURI2);
    expect(await dappNFT.ownerOf(1)).to.equal(addr2.address);
  });
});
