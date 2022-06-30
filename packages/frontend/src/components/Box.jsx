import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import boxPanel1 from '../assets/imgs/boxPanel1.png';
import boxPanel2 from '../assets/imgs/boxPanel2.png';
import boxPanel3 from '../assets/imgs/boxPanel3.png';

import memo1 from '../assets/imgs/memo1.png';
import memo2 from '../assets/imgs/memo2.png';
import memo3 from '../assets/imgs/memo3.png';

import memo1_soldout from '../assets/imgs/memo1_soldout.png';
import memo2_soldout from '../assets/imgs/memo2_soldout.png';
import memo3_soldout from '../assets/imgs/memo3_soldout.png';

import { getBoxPrice } from '../lib/nftutils';
import { getChainId, getNFTContractInstance, getProvider } from '../store/reducers';

const Box = ({ boxId, onPurchase, title, currentTokenAmount, limitTokenAmount, priceType }) => {
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    const provider = useSelector(state => getProvider(state));
    const chainId = useSelector(state => getChainId(state));
    const [price, setPrice] = useState(0);
    const [mintable, setMintable] = useState(chainId === 4 && (currentTokenAmount < limitTokenAmount));

    useEffect(() => {
        if (provider && chainId === 4) {
            (async () => {
                let _boxPrice = await getBoxPrice(nftContractInstance, boxId, priceType);
                setPrice(_boxPrice);
            })();
            setMintable(currentTokenAmount < limitTokenAmount)
        } else {
            setMintable(false);
        }
    }, [provider, chainId, currentTokenAmount, limitTokenAmount]);

    const getBoxPanel = (boxId) => {
        switch (boxId) {
            case 0:
                return boxPanel1;
            case 1:
                return boxPanel2;
            case 2:
                return boxPanel3;
        }
    }

    const getMemo = (boxId) => {
        switch (boxId) {
            case 0:
                return currentTokenAmount < limitTokenAmount ? memo1 : memo1_soldout;
            case 1:
                return currentTokenAmount < limitTokenAmount ? memo2 : memo2_soldout;;
            case 2:
                return currentTokenAmount < limitTokenAmount ? memo3 : memo3_soldout;;
        }
    }


    const getColor = (boxId) => {
        switch (boxId) {
            case 0:
                return "#1d6516";
            case 1:
                return "#164a65";
            case 2:
                return "#651623";
        }
    }
    const getOffset = (direction, boxId) => {
        const isMobile = window.innerWidth < 768;

        if (direction === 'left') {
            switch (boxId) {
                case 0:
                    return isMobile ? "50px" : "3.3vw";
                case 1:
                    return isMobile ? "138px" : "8.4vw";
                case 2:
                    return isMobile ? "61px" : "3.4vw";
            }
        } else {
            switch (boxId) {
                case 0:
                    return isMobile ? "31px" : "-2vw";
                case 1:
                    return isMobile ? "31px" : "-2vw";
                case 2:
                    return isMobile ? "34px" : "-2vw";
            }
        }
    }

    return (
        <Wrapper className="box-wrapper">
            <Panel src={getBoxPanel(boxId)} alt="panel" className="box-panel" />
            <Counter className="counter-layout">
                <img src="/images/bg_counter.png" alt="" className="counter-bg" />
                <span htmlFor="" className="counter">
                    {
                        <>
                            <span className="number">{currentTokenAmount}</span>
                            <span className="slash">/</span>
                            <span className="number">{limitTokenAmount}</span>
                        </>
                    }

                </span>
            </Counter>
            <Content>
                <Price style={{ color: getColor(boxId) }}>{price / Math.pow(10, 18)}{priceType}</Price>
                <ButtonPurchase
                    className="btn-text"
                    onClick={() => {
                        if (mintable) {
                            onPurchase();
                        }
                    }}
                    style={{
                        left: getOffset('left', boxId),
                        bottom: getOffset('bottom', boxId),
                        filter: !mintable ? 'grayscale(1)' : ''
                    }}>
                    <img src={getMemo(boxId)} className="bg_purchase" />
                </ButtonPurchase>
            </Content>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 20%;
    position: relative;
    display: flex;
    flex-direction: column;
    font-family: Baloo;
    margin: 0 3.5vw;
    @media(max-width: 767px) {
        width: 300px;
        margin-top: 100px;
    }
`;

const Panel = styled.img`
    width: 100%;
`;
const Counter = styled.div`
    position: absolute;
    top: -70px;
    left: 0;
    width: 100%;
    z-index: 1;
    justify-content: center;
    align-items: center;
    display: flex;
    img {
        width: 80%;
        z-index: -1;
    }
    span.counter {
        
        position: absolute;
        left: 0;
        top: 0;
        font-size: 2vw;
        text-align: center;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .number {
            color: #642f2f;
        }
        .slash {
            color: #ff3c1e;
        }
        @media(max-width: 767px) {
            font-size: 30px;
        }
    }
`
const Content = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 27%; 
    @media(max-width: 767px) {
        padding-top: 82px;
    }
`;

const Price = styled.span`
    font-size: 1.7vw;
    margin-top: 18%;
    margin-right: 2%;
    @media(max-width: 767px) {
        font-size: 27px;
        margin-right: 5px;
    }
`;
const ButtonPurchase = styled.div`
    cursor: pointer;
    text-transform: capitalize;
    font-weight: normal;
    z-index: 1;
    width: 40%;
    color: var(--button-text-color);
    position: relative;
    .bg_purchase {
        width: 100%;
        height: 100%;
    }
    :hover {
        width: 42%;
    }
    position: absolute;
    @media(max-width: 767px) {
        bottom: -25px !important;
        :hover {
            font-size: 34px;
            margin-left: 0px;
        }
    }
`;

export default Box;