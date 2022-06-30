import { useSelector } from 'react-redux';
import Header from '../components/Header';
import styled from 'styled-components';
import { getTokenList } from '../store/reducers';
import BurgerCard from '../components/BurgerCard';
import NotReady from '../components/NotReady';

const Burgers = ({ handleNotification }) => {
    
    const burgerList = useSelector(state => getTokenList(state));

    return (
        <Container>
            <Header handleNotification={handleNotification}/>
            <ContentContainer>
                {
                    burgerList && burgerList.length > 0 ?  (
                        <ItemList>
                        {
                            burgerList.map((data, index) => (
                                <BurgerCard data={data} key={index}/>
                            ))
                        }
                        </ItemList>
                    ) : (
                        <NotReady></NotReady>
                    )
                }
                
            </ContentContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: fit-contnet;
    min-height: 100vh;
    background-repeat-x: no-repeat;
    background-size: 100%;
    background-image: url(/images/home_burgers_background.png);
    background-repeat-y: repeat;
`
const ContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 20px;
    @media(max-width: 767px) {
        margin-top: 20px;
    }
`;
const ItemList = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    gap: 50px;
    justify-content: space-between;
    align-items: flex-start;
    @media(max-width: 991px) {
        justify-content: center;
    }
    z-index: 1;
    width: fit-content;
    max-width: 900px;
`;


export default Burgers;