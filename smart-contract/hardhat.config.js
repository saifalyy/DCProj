require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.2",
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/vDunnTjCE8XHGg0KUewNIhGM_a32fL89',
      accounts: [`0x38c91fb860ef24071620ce8c1910534af5cc0d98269aaa321caf9eeb57632020`],
    }
  }
};
