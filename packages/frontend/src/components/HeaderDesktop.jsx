import styled from 'styled-components'
import ConnectButton from './ConnectButton';
import logoImg from '../assets/imgs/logo.png';
import menuHome from '../assets/imgs/menu_home_v2.png';
import menuBurgers from '../assets/imgs/menu_burgers_v2.png';
import menuStaking from '../assets/imgs/menu_staking_v2.png';
import menuMarket from '../assets/imgs/menu_marketplace_v2.png';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAddress, getProvider, getTokenList } from '../store/reducers';
import ProgressBar from './ProgressBar';
import Tooltip from './Tooltip';
import { useState } from 'react';

const HeaderDesktop = () => {
    const tokenList = useSelector(state => getTokenList(state));
    const address = useSelector(state => getAddress(state));
    const provider = useSelector(state => getProvider(state));
    
    const [showTooltipMarketplace, setShowTooltipMarketplace] = useState(false);
    const [showTooltipStaking, setShowTooltipStaking] = useState(false);

    const handleTooltip = (e, type) => {
        e.preventDefault();
        e.stopPropagation();
        if (type === 'marketplace') {
            setShowTooltipMarketplace(true);
            setTimeout(() => {
                setShowTooltipMarketplace(false)
            }, 1500);
        } else {
            setShowTooltipStaking(true);
            setTimeout(() => {
                setShowTooltipStaking(false)
            }, 1500);
        }
    }
    return (
        // <ConnectButton />
        <HeaderWrapper className="header-wrapper">
            <Link to={'/'} className="logo-link">
                <LogoImg src={logoImg} alt="logo" className="logo" />
            </Link>
            <Menu>
                <MenuItem className="home">
                    <Link to={'/mint'}>
                        <img src={menuHome} alt="home" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem className="mint">
                    <Link to={`/burgers`}>
                        <img src={menuBurgers} alt="mint" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem className="marketplace" onClick={(e)=> handleTooltip(e, 'marketplace')}>
                    {/* <Link to={`/marketplace`}> */}
                        <img src={menuMarket} alt="marketplace" className="menu-item-img" />
                    {/* </Link> */}
                    {
                        showTooltipMarketplace && (
                            <TooltipContainer>
                                <Tooltip />
                            </TooltipContainer>
                        )
                    }
                </MenuItem>
                <MenuItem className="staking" onClick={(e)=> handleTooltip(e, 'staking')}>
                    {/* <Link to={`/staking`}> */}
                        <img src={menuStaking} alt="staking" className="menu-item-img" />
                    {/* </Link> */}
                    {
                        showTooltipStaking && (
                            <TooltipContainer>
                                <Tooltip />
                            </TooltipContainer>
                        )
                    }
                </MenuItem>
            </Menu>
            <AccountInfo>
                <div className="account-info">
                    {
                        <>
                            <Account>
                                {
                                    provider && address ?
                                    (
                                        <>
                                            <TokenCount>{tokenList.length}</TokenCount>
                                            <Divider />
                                        </>
                                    ) : ''
                                
                                }
                                <div>
                                    <ConnectButton />
                                </div>
                            </Account>
                            <Level>
                                <ProgressBar value={70} />
                            </Level>
                        </>
                    }
                </div>
            </AccountInfo>
        </HeaderWrapper>

    )
}

const HeaderWrapper = styled.div`
    width: 100%;
    height: 95px;
    padding: 8px 10%;
    @media(max-width: 991px) {
        padding: 4px 5%;
        height: 75px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-family: 'Baloo';
    background-size: 100% 100%;
    background-image: url('/images/bg_menu_v2.png');
    .logo-link {
        height: 100%;
        width: 10%;
    }
`;

const LogoImg = styled.img`
    padding: 5px;
    height: 100%;
    &:hover {
        padding: 2px;
    }
`;
const Menu = styled.div`
    width: 0;
    padding: 0 40px;
    flex: 1;
    height: 55px;
    @media(max-width: 1200px) {
        height: 40px;
    }
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    width: 60%;
`;

const AccountInfo = styled.div`
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 200px;  
    width: 15%;
    z-index: 1;
    color: white;
    font-size: 14px;
    span {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .account-info {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-transform: uppercase;
    }
`;

const MenuItem = styled.div`
    height: 100%;
    max-width: 200px;
    width: 20%;
    display: flex;
    z-index: 1;
    align-items: center;
    position: relative;
    justify-content: center;
    cursor: pointer;
    padding: 2px;
    @media(max-width: 991px) {
        width: auto;
    }
    a {
        height: 100%;
    }
    &:hover {
        padding: 0;
    }
    img {
        height: 100%;
        display: flex;
    }
    a {
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
`;

const Account = styled.div`
    display: flex;
    background-image: url('/images/bg_account.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 5px 20px 5px 30px;
    width: 100%;
    & > div {
        flex: 1;
        justify-content: center;
        align-items: center;
        display: flex;
    }
`;
const TokenCount = styled.span`
    width: 20%;
`;
const Level = styled.div`
    display: flex;
    width: 100%;
    height: 31px;
    padding: 10px 15px 10px 60px;
    background-image: url('/images/bg_level.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
`;
const Divider = styled.span`
    display: flex;
    width: 3px;
    height: 100%;
    background: white;
    margin-right: 10px;
`;

const TooltipContainer = styled.div`
    height: 2.5vw;
    position: absolute;
    top: 100%;
`
export default HeaderDesktop;