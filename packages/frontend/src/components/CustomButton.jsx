import styled from 'styled-components';
const CustomButton = ({text, isLoading, onClick, disabled=false}) => {
    return (
        <Button onClick={onClick} disabled={isLoading} disabled={disabled}>
            {
                isLoading && <i class="fa fa-spinner fa-spin fa-fw"></i>
            }
            {
                !isLoading && text
            }
        </Button>
    )
}

const Button = styled.button `
    width: fit-content;
    padding: 15px;
    border-radius: 5px;
    border: none;
    font-family: 'Festive', cursive;
    font-family: 'Space Mono', monospace;
    letter-spacing: 1.4px;
    background-color: var(--primary-color);
    color: black;
    font-weight: 28px;
    
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s; 

    :hover{
      transform: scale(1.02);
      cursor: pointer;
      color: #222831;
    }
`

export default CustomButton;