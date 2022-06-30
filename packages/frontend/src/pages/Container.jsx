import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getChainId, getProvider } from '../store/reducers';

const Container = (props) => {
    const provider = useSelector(state => getProvider(state));
    const chainId = useSelector(state => getChainId(state));
    const [enableSnakebar, setEnableSnakebar] = useState(false);

    useEffect(() => {
        //rinkeby - test, should be changed to BSC mainnet (56)
        if (provider && chainId === 4) {
            setEnableSnakebar(false)
        } else {
            setEnableSnakebar(true);
        }
    }, [provider, chainId])
    return (
        <Wrapper className="snakebar-wrapper">
            {props.children}
            {
                enableSnakebar &&
                (
                    <CustomSnakeBar>
                        You are not connected BSC mainnet
                        <span onClick={() => {
                            setEnableSnakebar(false);
                        }}>X</span>
                    </CustomSnakeBar>
                )
            }

        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`;

const CustomSnakeBar = styled.div`
    width: 60vw;
    height: 60px;
    color: white;
    background: #e74545;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 88vh;
    left: calc(50% - 30vw);
    z-index: 1000000;
    text-align: center;
    border-radius: 8px;
    padding: 15px;
    @media(max-width: 767px) {
        width: 80vw;
        height: 70px;
        left: calc(50% - 40vw);

    }
    span {
        position: absolute;
        right: 5px;
        top: 0;
        color: white;
        cursor: pointer;
    }
`;

export default Container;