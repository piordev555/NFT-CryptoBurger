import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Header from '../components/Header'
import { apiAction } from '../store/actions'
import { getAddress, getBurgTokenContractInstance, getChainId, getNFTContractInstance, getProvider, getWeb3Instance, getWssNFTContractInstance, isWhitelistMode } from '../store/reducers'
import { getCurrentTokenAmount, getLatestBNBPrice, getMetadata, getPriceType, getTokenAmountLimitation, mintNFT } from '../lib/nftutils';
import CustomModal from '../components/Modal'
import { apiConstants } from '../store/constants';
import getSocket from '../services/socket'
import Box from '../components/Box'


function Mint({ handleNotification }) {
    const dispatch = useDispatch();
    const [isModalShow, setModalShow] = useState(false);
    const [nftData, setNftData] = useState({});
    const address = useSelector(state => getAddress(state));
    const web3Instance = useSelector(state => getWeb3Instance(state));
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    const wssNFTContractInstance = useSelector(state => getWssNFTContractInstance(state));
    const burgTokenContractInstance = useSelector(state => getBurgTokenContractInstance(state));
    const provider = useSelector(state => getProvider(state));
    const chainId = useSelector(state => getChainId(state));
    const [bnbPrice, setBNBPrice] = useState(0);
    const whitelistState = useSelector(state => isWhitelistMode(state));
    const [currentTokenAmount, setCurrentTokenAmount] = useState([0, 0, 0]);
    const [limitationTokenAmount, setLimitationTokenAmount] = useState([4400, 2200, 900]);
    const [priceType, setPriceType] = useState('BNB');


    const onMintSuccess = async (data) => {
        const {to, metadata} = data;
        if (to === address) {
            console.log('metadata from server: ', metadata);
            if (metadata) {
                handleNotification('success', `NFT #${metadata.tokenId} is minted successfully `);
                setNftData(metadata);
                setModalShow(true);
                dispatch(apiAction.setLoading(false))
                dispatch(apiAction.getTokensPerAddress(nftContractInstance, address));
            } else {
                dispatch(apiAction.setLoading(false))
                handleNotification("error", 'NFT Mint is failed');
            }
        }
        
        let currentTokenAmounts = await getCurrentTokenAmount(nftContractInstance);
        if (currentTokenAmounts && currentTokenAmounts.length === 3) {
            setCurrentTokenAmount(currentTokenAmounts);
        }
    }

    const onMintFail = (error) => {
        console.error("Mint Failed", error);
        handleNotification("error", 'NFT Mint is failed');
        dispatch(apiAction.setLoading(false));
    }

    const mintNFT = (boxId) => {
        if (whitelistState) {
            mintWhiteList(boxId)
        } else {
            mintNormal(boxId)
        }
    }

    const mintNormal = (boxId) => {
        dispatch(apiAction.mintNFT(boxId, nftContractInstance, burgTokenContractInstance, address, onMintFail));
    }

    const mintWhiteList = (boxId) => {
        dispatch(apiAction.mintWhiteList(boxId, nftContractInstance, address, onMintFail));
    }

    useEffect(() => {
        //establish socket connection for notification after nft minting
        //we will use wallet address as socket id
    
        if (address && provider) {
            let _networkEnable = chainId === 4 // rinkeby. this should be 56 (BSC mainnet) in production mode
            if (!_networkEnable) {
                handleNotification('warning', 'Please switch to BSC mainnet');
                return;
            }
            const webSocket = getSocket(address);
            webSocket.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                console.log('Received message from server: ', msg);
                switch (msg.type) {
                    case 'NEW_NFT':
                        onMintSuccess(msg);
                        break;
                    case 'ERROR':
                        onMintFail(msg.error);
                        break;
                    default:
                        break;
                }
            }
            (async () => {
                let currentTokenAmounts = await getCurrentTokenAmount(nftContractInstance);
                if (currentTokenAmounts && currentTokenAmounts.length === 3) {
                    setCurrentTokenAmount(currentTokenAmounts);
                }
    
                let _limitationTokenAmount = await getTokenAmountLimitation(nftContractInstance);
                if (_limitationTokenAmount && _limitationTokenAmount.length === 3) {
                    setLimitationTokenAmount(_limitationTokenAmount);
                }

                let _priceType = await getPriceType(nftContractInstance);
                setPriceType(_priceType);
            })();
           
            dispatch(apiAction.isWhiteListMode(nftContractInstance));

            wssNFTContractInstance.events.whitelistModeChanged({})
            .on('data', async (event) => {
                handleNotification('warning', event.returnValues.isWhiteList ? `Whitelist mode has turned on`: 'Whitelist mode has turned off');
                dispatch({
                    type: apiConstants.GET_WHITELISTSTATE,
                    payload: event.returnValues.isWhiteList
                });
                console.log('whitelist changed: ', event.returnValues.isWhiteList)
            })

        } else {
            handleNotification("warning", 'You are not connected mainnet');
        }
        // const timerID = setInterval(async () => {
        //     const price = await getLatestBNBPrice();
        //     setBNBPrice(price);
        // }, 5000);
        // return () => {
        //     clearInterval(timerID);
        // };
    }, [provider, address, chainId]);
    return (
        <Container>
            <Header handleNotification={handleNotification} />
            <Row>
                <Box boxId={0} title="Happy Box" onPurchase={() => mintNFT(0)} currentTokenAmount={currentTokenAmount[0]} limitTokenAmount={limitationTokenAmount[0]} priceType={priceType}/>
                <Box boxId={1} title="Power Box" onPurchase={() => mintNFT(1)} currentTokenAmount={currentTokenAmount[1]} limitTokenAmount={limitationTokenAmount[1]} priceType={priceType}/>
                <Box boxId={2} title="Glorious Box" onPurchase={() => mintNFT(2)} currentTokenAmount={currentTokenAmount[2]} limitTokenAmount={limitationTokenAmount[2]} priceType={priceType}/>
               
                {/* <span style={{color:"red", fontSize: '32px'}}>{(Math.round(bnbPrice * 100) / 100).toFixed(2)}BUSD</span> */}
               
            </Row>
            <CustomModal show={isModalShow} data={nftData} handleClose={() => {
                setModalShow(false);
            }} />

        </Container>
    )
}

export default Mint

const Container = styled.div`
    overflow-x: hidden;
    background-image: url(/images/mint_burgers_background_green.svg);
    height: 100vh;
`
const Row = styled.div`
    display: flex;
    justify-content: center;
    height: fit-content;
    flex-wrap: wrap;
    max-width: 1000px;
    min-width: fit-content;
    padding: 130px 0 50px 0;
    @media(max-width: 767px) {
        margin: 0 auto;
        padding: 0;
        max-width: 320px !important;
    }
`

