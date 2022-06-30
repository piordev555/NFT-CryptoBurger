const { web3Config } = require('../config');
const wssWeb3 = web3Config.wssWeb3;
const CONTRACT_INFO = require('../../../../contracts.json');
const { generateMetadataForBoxType } = require('./metadata.service');
const { saveTokenMetadataToDB } = require('./mongoose');
const wssNFTContractInsance = new wssWeb3.eth.Contract(CONTRACT_INFO.contracts.Burger.abi, CONTRACT_INFO.contracts.Burger_Proxy.address);
const wss = require('./socketServer');

wssNFTContractInsance.events.MintNFT({})
    .on('data', async (event) => {
        const metadata = generateMetadataForBoxType(event.returnValues._id, event.returnValues._boxType);
        const savedBurger = await saveTokenMetadataToDB(metadata);
        console.log('saved burger:');
        if (savedBurger && savedBurger !== 'exist') {
            wss.sendBroadcast({
                type: 'NEW_NFT',
                metadata: savedBurger,
                to: event.returnValues._to
            })
        } else if (savedBurger === 'exist') {
            console.log('already exist: ', savedBurger);
        } else {
            wss.sendBroadcast({
                type: 'ERROR',
                error: 'Mint is failed',
                to: event.returnValues._to
            })
        }

    }).on("error", (error) => {
        console.error("Mint Failed", error);
    });