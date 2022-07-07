// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simplestorge = await SimpleStorage.deploy();

  // await simplestorge.deployed();

  console.log("simplestorge deployed to:", simplestorge.address);

  // await simplestorge.set(89);

  // x = await simplestorge.get();
  // console.log(x);

  // await simplestorge.executeSetIfSignatureMatch(
  //   0x1c,
  //   "0xb16c2bcd0dd68deaeffb5c9ec1a91b8a146ecb4ffceb3ca4f15436bf2f87cc58",
  //   "0x41b5abb863b942a7b2e35423c7730fc339eae77127e451a1ae2f487debeb7122",
  //   "0xfcB091902F35E2d7834a00397Ee63C4E4d0776Db",
  //   0x9d
  // );



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
