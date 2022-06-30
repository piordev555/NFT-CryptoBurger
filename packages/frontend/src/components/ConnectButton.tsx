import { providers } from 'ethers'
import { useEffect } from 'react';
import Web3Modal from 'web3modal'
import { useDispatch, useSelector } from 'react-redux';
import { getAddress, getChainId, getProvider, getWeb3Provider } from '../store/reducers';
import { resetWeb3Provider, setAddress, setChainId, setWeb3Provider } from '../store/actions'
import { web3ProviderOptions } from '../config'
//@ts-ignore
import styled from 'styled-components';
import { ellipseAddress } from '../lib/utilities';

let web3Modal:any;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions: web3ProviderOptions, // required
  })
}

const ConnectButton = (props:any) => {
    const dispatch = useDispatch();
    const provider = useSelector(state => getProvider(state));
    const web3Provider = useSelector(state => getWeb3Provider(state));
    const address = useSelector(state => getAddress(state));

    const connect = async function () {
      // This is the initial `provider` that is returned when
      // using web3Modal to connect. Can be MetaMask or WalletConnect.
      const provider = await web3Modal.connect();
  
      // We plug the initial `provider` into ethers.js and get back
      // a Web3Provider. This will add on methods from ethers.js and
      // event listeners such as `.on()` will be different.
      const web3Provider = new providers.Web3Provider(provider)
  
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
  
      const network = await web3Provider.getNetwork();
      console.log('connect');

      if (provider.on) {
        provider.on('accountsChanged', handleAccountsChanged)
        provider.on('chainChanged', handleChainChanged)
        provider.on('disconnect', handleDisconnect)
      }

      dispatch(setWeb3Provider(provider, web3Provider, address, network.chainId))
    };

    const disconnect = async function () {
      await web3Modal.clearCachedProvider()
      if (provider) {

        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged)
          provider.removeListener('chainChanged', handleChainChanged)
          provider.removeListener('disconnect', handleDisconnect)
        }

        if (provider.disconnect && typeof provider.disconnect === 'function') {
          await provider.disconnect()
        }
        dispatch(resetWeb3Provider());
      }
    }

    const handleAccountsChanged = (accounts: string[]) => {
      // eslint-disable-next-line no-console
      console.log('accountsChanged', accounts)
      dispatch(setAddress(accounts[0]));
    }

    const handleChainChanged = (chainIdHex: string) => {
      // eslint-disable-next-line no-console
      let chainId = parseInt(chainIdHex)
      console.log('chainChanged', chainIdHex, chainId);
      dispatch(setChainId(chainId));
    }

    const handleDisconnect = (error: { code: number; message: string }) => {
      // eslint-disable-next-line no-console
      console.log('disconnect', error)
      disconnect()
    }

    useEffect(() => {
      if (!provider && web3Modal.cachedProvider) {
        console.log('useEffect connect: ', provider);
        connect()
      }
    }, [provider])

    
      
    return (
            web3Provider ? (
              <Button onClick={() => disconnect()} style={{color: props.color}}>
                {ellipseAddress(address)}
              </Button>
          ) : (
            <Button onClick={() => connect()} style={{color: props.color}}>
              Connect
            </Button>
          )
    )
}

export default ConnectButton;

const Button = styled.span`
  font-size: 1.1rem;
  letter-spacing: 1.1px;
  font-family: 'Baloo';
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  &:hover{
    cursor: pointer;
    transform: scale(1.1);
  }
  @media(max-width: 767px) {
    font-size: 16px;
    text-transform: uppercase;
  }
`