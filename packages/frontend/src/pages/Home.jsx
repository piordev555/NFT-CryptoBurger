import styled from 'styled-components';
import { Link as RouterLink} from 'react-router-dom';

function Home() {
    const isMobile = window.innerWidth < 768;
    const playButtonImage = isMobile ? '/images/ASSETS/btn_play.png' : '/images/ASSETS/btn_play.png';
    const whitepaperButtonImage = isMobile ? '/images/ASSETS/btn_whitepaper.png' : '/images/ASSETS/btn_whitepaper.png';
    return (
        <Container>
            <GameButtonLayout>
                <ButtonWrapper>
                <RouterLink to="/mint">
                  <GameButton src={`${playButtonImage}`}  />
                </RouterLink>
                </ButtonWrapper>
                <ButtonWrapper>
                <Link href="https://whitepaper.cryptoburgers.io" target="_blank">
                  <GameButton src={`${whitepaperButtonImage}`}/>
                </Link>
                </ButtonWrapper>
            </GameButtonLayout>
            <ImageBox>
              <Link href="https://discord.gg/qxqbJzRTZX" target="_blank"> 
                <SocialButton>
                    <img src="/images/ASSETS/discordia.png" />
                </SocialButton>
              </Link>
              <Link href="https://twitter.com/CryptoBurgerNFT" target="_blank"> 
                <SocialButton>
                <img src="/images/ASSETS/gorjeo.png" />
                </SocialButton>
              </Link>
              <Link href="https://t.me/cryptoburgersnft" target="_blank"> 
                <SocialButton>
                <img src="/images/ASSETS/telegrama.png" />
                </SocialButton>
              </Link>
            </ImageBox>
        </Container>
    )
}

const Container = styled.div`
width: 100%;
min-height: 100vh;
height: fit-content;
background-image: url("/images/home_background/use.png");
background-size: 100% 100%;
background-position: center;
align-items: center;
justify-content: center;
display: flex;
@media(max-width: 767px) {
  background-image: url("/images/home_background/use-mobile.png");
  background-size: contain;
}
`
const ButtonWrapper = styled.div`
  width: 250px;
  text-align: center;
  display: flex;
  justify-content: center;
`
const GameButtonLayout= styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-top: 10px;
  width: 100%;
  margin-bottom: auto;
  @media(max-width: 767px) {
    width: fit-content;
    padding-top: 80px;
    flex-direction: column;
    margin-top: auto;
  }
`
const GameButton = styled.img`
  height: 120px;
  cursor: pointer;
  display: block;
  &:hover{
    padding: 3px 7.5px;
  }

  @media only screen and (max-width: 767px) {
    height: 85px;
  }
`

const ImageBox = styled.div`
  width: fit-content;
  position: absolute;
  bottom: 10%;
  left: 2%;
`

const SocialButton = styled.div`
  width: 80px;
  margin-top: 10px;
  img{
      width: 100%;

      &:hover{
          transform: scale(1.1);
          cursor: pointer;
      }
  }
  @media only screen and (max-width: 767px) {
    width: 50px;
  }
`

const Link = styled.a`
  text-decoration: none;
`
export default Home
