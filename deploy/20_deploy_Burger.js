require('dotenv').config()

const fs = require("fs");
const rfs = require("recursive-fs");
const fetch = require("node-fetch");

const func = async function (hre) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;
  
  const {deployer} = await getNamedAccounts();
  const network = await hre.getChainId();
  const execSync = require('child_process').execSync;

  const contractDeployed = await deploy('Burger', {
    from: deployer,
    args: [
    ],
    log: true,
    proxy: {
      proxyContract: 'OpenZeppelinTransparentProxy',
    },
  });

  console.log('Verifying...');
  console.log('npx hardhat verify --network '+ hre.network.name +  ' ' + contractDeployed.address);

  // execSync(`npx hardhat verify --network ${hre.network.name} ${contractDeployed.address}`,  { encoding: 'utf-8' });
  // console.log('Verify Success: ', hre.network.name, contractDeployed.address);
};

module.exports = func;
func.tags = ['Burger'];
