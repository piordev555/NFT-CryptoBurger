import styled from 'styled-components'
import ConnectButton from './ConnectButton';
import logoImg from '../assets/imgs/logo.svg';
import tableImg from '../assets/imgs/menu_table.png';
import menuHome from '../assets/imgs/menu_home.png';
import menuBurgers from '../assets/imgs/menu_mint.png';
import menuStaking from '../assets/imgs/menu_staking.png';
import menuMarket from '../assets/imgs/menu_marketplace.png';
import menuAccount from '../assets/imgs/menu_account.png';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress, getNFTContractInstance, getProvider, getTokenList } from '../store/reducers';
import { ellipseAddress } from '../lib/utilities';

const HeaderDesktop = () => {
    const tokenList = useSelector(state => getTokenList(state));
    const address = useSelector(state => getAddress(state));
    const provider = useSelector(state => getProvider(state));
    const nftContractInstance = useSelector(state => getNFTContractInstance(state));
    const dispatch = useDispatch();
    // useEffect( () => {
    //     if (provider) {
    //         console.log('provider: ', provider);
    //         dispatch(apiAction.getTokensPerAddress(nftContractInstance, address));
    //     }
    // }, [provider, address]);

    return (
        // <ConnectButton />
        <HeaderWrapper className="header-wrapper">
            <Link to={'/'}>
                <LogoImg src={logoImg} alt="logo" className="logo" />
            </Link>
            <Menu>
                <TableImg src={tableImg} alt="table" className="table-img" />
                <MenuItem className="home">
                    <Link to={'/'}>
                        <img src={menuHome} alt="home" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem className="mint">
                    <Link to={`/burgers`}>
                        <img src={menuBurgers} alt="mint" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem className="marketplace">
                    <Link to={`/mint`}>
                        <img src={menuMarket} alt="marketplace" className="menu-item-img" />
                    </Link>
                </MenuItem>
                <MenuItem className="staking">
                    <Link to={`/staking`}>
                        <img src={menuStaking} alt="staking" className="menu-item-img" />
                    </Link>
                </MenuItem>
            </Menu>
            <AccountInfo>
                <AccountPlaceHolder src={menuAccount} alt="account-background" className="account-background" />
                <div className="account-info">
                    {
                        provider && (
                            <>
                                <TokenCount>{tokenList.length}</TokenCount>
                                <AccountAddress>{ellipseAddress(address)}</AccountAddress>
                            </>
                        )
                    }
                    <ConnectButton />
                </div>
            </AccountInfo>
        </HeaderWrapper>

    )
}

const HeaderWrapper = styled.div`
    width: 100%;
    height: 15vw;
    padding: 0 50px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
    font-family: 'Baloo';
    @media(max-width: 991px) {
        padding: 10px;
    }
`;

const LogoImg = styled.img`
    width: 15vw;
    padding: 10px;
    &:hover {
        padding: 5px;
    }
    @media(max-width: 991px) {
        width: 130px;
        padding: 5px;
        &:hover {
            padding: 0
        }
    }
`;
const Menu = styled.div`
    width: 0;
    min-height: 50px;
    flex: 1;
    height: 5vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    margin: 4vw auto 0 auto;
`;
const TableImg = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 20px;
`;
const AccountInfo = styled.div`
    height: 15vw;
    min-width: 240px;
    width: 20vw;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    @media(max-width: 991px) {
        height: 140px;
        min-width: 180px;
        width: 20vw;

    }
    span {
        display: flex;
        height: 2vw;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        padding-bottom: 5px;
        @media(max-width: 991px) {
            font-size: 18px;
            padding-bottom: 0;
            padding-top: 5px;
            height: 25px;
        }
    }
    .account-info {
        padding-top: 3vw;
        width: 100%;
        height: 100%;
        @media(max-width: 991px) {
            height: 90px;
            padding-top: 20px;
        }
        gap: 0.5vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-transform: uppercase;
    }
`;

const AccountPlaceHolder = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
`;

const MenuItem = styled.div`
    height: 100%;
    width: 20%;
    max-width: 200px;
    display: flex;
    z-index: 1;
    position: absolute;
    &.home {
        left: 3.5%;
    }
    &.mint {
        left: 26.5%;
    }
    &.marketplace {
        left: 47.5%;
    }
    &.staking {
        left: 68.5%;
        width: 25%;
        max-width: 300px;   
        margin-top: 1%;
    }
    margin-bottom: 30px;
    align-items: flex-bottom;
    justify-content: center;
    cursor: pointer;
    padding: 2px;
    &:hover {
        padding: 0;
    }
    img {
        width: 100%;
        display: flex;
    }
    a {
        display: flex;
        align-items: flex-end;
        justify-content: center;
    }
    @media(min-width: 1300px) {
        margin-bottom: 45px;
    }
    @media(min-width: 1399px) {
        margin-bottom: 80px;
    }
    @media(min-width: 1400px) and (max-width: 1700px) {
        margin-bottom: 60px;
    }
    @media(max-width: 767px) {
        width: 83px;
        margin-bottom: 30px;
    }
`;

const TokenCount = styled.span`
    color: #444444;
`;
const AccountAddress = styled.span`
    color: #555555;
`;
export default HeaderDesktop;