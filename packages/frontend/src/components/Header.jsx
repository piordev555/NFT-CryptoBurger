import styled from 'styled-components'
import { getAddress, getNFTContractInstance, getProvider, getTokenList } from '../store/reducers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderDesktop from './HeaderDesktop';
import HeaderMobile from './HeaderMobile';
import { apiAction } from '../store/actions';

const Header = () => {
    const tokenList = useSelector(state => getTokenList(state));
    const address = useSelector(state => getAddress(state));
    const provider = useSelector(state => getProvider(state));
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    const dispatch = useDispatch();
    useEffect( () => {
        if (provider) {
            console.log('provider: ', provider);
            dispatch(apiAction.getTokensPerAddress(nftContractInstance, address));
        }
    }, [provider, address]);

    return (
        <Wrapper>
            <div className="desktop">
                <HeaderDesktop />
            </div>
            <div className="mobile">
                <HeaderMobile />
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 2;
    .desktop {
        width: 100%;
        display: flex;
    }
    .mobile {
        width: 100%;
        display: none;
        position: absolute;
        z-index: 1;
    }
    @media(max-width: 767px) {
        .desktop {
            display: none;
        }
        .mobile {
            display: flex;
        }
    }
`

export default Header;