// npx hardhat run scripts/initialize_contracts.js --network rinkeby

const hre = require("hardhat");

async function main() {

    const Burger = await  hre.deployments.get('Burger');
    const BurgerDeployed = await ethers.getContractAt('Burger', Burger.address);
    const txBurger = await BurgerDeployed.initialize();
    console.log('txBurger: ', txBurger);

    const BurgerToken = await  hre.deployments.get('BurgToken');
    const BurgerTokenDeployed = await ethers.getContractAt('BurgToken', BurgerToken.address);
    const txBurgerToken = await BurgerTokenDeployed.initialize();
    console.log('txBurgerToken: ', txBurgerToken);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

