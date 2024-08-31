async function main() {
  const DappNFT = await ethers.getContractFactory("DappNFT");
  const dappNFT = await DappNFT.deploy();

  console.log("DappNFT deployed to:", dappNFT.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
