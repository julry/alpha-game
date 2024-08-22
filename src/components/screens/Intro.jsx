import styled from "styled-components";
import logo from '../../assets/images/logo.svg';
import face from '../../assets/images/face.svg';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";
import { SCREENS } from "../../constants/screens";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: var(--spacing_x6) 0 0;
    display: flex;
    flex-direction: column;
`;

const Logo = styled.div`
    position: relative;
    z-index: 1;
    width: ${({$ratio}) => $ratio * 146}px;
    height: ${({$ratio}) => $ratio * 51}px;
    margin-left: var(--spacing_x6);
    background: url(${logo}) no-repeat 0 0 / cover;
    flex-shrink: 0;
`;

const Face = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    margin-top: -1px;
    height: 58.9vw;
    background: url(${face}) no-repeat 0 0 / cover;

    @media screen and (min-width: 450px){
        max-height: ${({$ratio}) => $ratio * 221}px;
    }
`;

const Content = styled.div`
    padding: var(--spacing_x4);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    flex-grow: 1;
    background: var(--color-white);
    color: var(--color-white-text);
`;

const Title = styled.h2`
    width: 100%;
    text-align: center;
    font-size: var(--font_xl);
`;

const TextBlock = styled.div`
    padding: var(--spacing_x4);
    padding-bottom: 0;
    margin-bottom: ${({$ratio}) => $ratio * 36}px;
    font-size: var(--font_sm);
`;

const ButtonWrapper = styled.div`
    margin-top: auto;

    & button + button {
        margin-top: var(--spacing_x3);
    }
`;

export const Intro = () => {
    const {next} = useProgress();
    const ratio = useSizeRatio();
    return (
        <Wrapper>
            <Logo $ratio={ratio}/>
            <Face $ratio={ratio}/>
            <Content>
                <Title $ratio={ratio}>
                    Добро пожаловать{'\n'}в игру!
                </Title>
                <TextBlock $ratio={ratio}>
                    Алекс шёл в Альфа-сити — город карьерных успехов. Дорога через него лежит через лес страхов и сомнений. Помоги ему выбраться, чтобы построить успешную карьеру в Альфа-Банке.
                    {'\n\n'} Заглядывай в игру каждую неделю и получай за это призы!
                </TextBlock>
                <ButtonWrapper>
                    <Button color="pink" onClick={() => next(SCREENS.REG_1)}>Регистрация</Button>
                    <Button color="green" onClick={() => next(SCREENS.LOGIN)}>Вход</Button>
                </ButtonWrapper>
            </Content>
        </Wrapper>
    )
};
