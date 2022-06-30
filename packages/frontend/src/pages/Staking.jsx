import styled from 'styled-components';
import Header from '../components/Header';
import NotReady from '../components/NotReady';

const Staking = ({handleNotification}) => {
    return (
        <Container>
            <Header handleNotification={handleNotification} />
            <ContentLayout>
                <NotReady></NotReady>
            </ContentLayout>
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
background-image: url(/images/home_burgers_background.svg);
background-repeat-y: repeat;
}
`

const ContentLayout = styled.div`
    display: flex;
    margin-top: 150px;
    width: 40%;
    min-width: 270px;
    justify-content: center;
`
export default Staking;