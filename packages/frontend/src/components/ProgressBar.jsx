import styled from 'styled-components';

const ProgressBar = ({value}) => {
    return (
        <Container>
            <Progress style={{width: value + '%'}}></Progress>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid white;
`;
const Progress = styled.div`
    height: 100%;
    background: white;
`;

export default ProgressBar;