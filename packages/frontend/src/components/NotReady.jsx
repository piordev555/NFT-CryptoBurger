import styled from 'styled-components';
import emptyImage from '../assets/imgs/not_ready.png';

const NotReady = (props) => {
    return (
        <Container>
            <EmptyImage src={emptyImage} />
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
`
const EmptyImage = styled.img`
    width: 100%;
`
export default NotReady;