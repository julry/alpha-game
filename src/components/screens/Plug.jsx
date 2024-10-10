import styled from "styled-components";
import logo from '../../assets/images/logo.svg';
import face from '../../assets/images/face.svg';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Button } from "../shared/Button";

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
    height: ${({$ratio}) => $ratio * 43}px;
    margin-left: var(--spacing_x6);
    background: url(${logo}) no-repeat 0 0 / cover;
    flex-shrink: 0;
`;

const Face = styled.div`
    position: relative;
    z-index: 2;
    width: 100%;
    margin-top: -1px;
    height: 90.9vw;
    background: url(${face}) no-repeat 0 0 / cover;
    flex-shrink: 0;

    @media screen and (min-width: 450px) {
        max-height: ${({$ratio}) => $ratio * 341}px;
    }
`;

const Content = styled.div`
    padding: 0 var(--spacing_x4) var(--spacing_x4);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    background: var(--color-white);
    color: var(--color-white-text);
`;

const TextBlock = styled.div`
    padding-top: ${({$ratio}) => $ratio * 30}px;
    padding-left: ${({$ratio}) => $ratio * 14}px;
    font-size: ${({$ratio}) => $ratio * 15}px;
    line-height: 111%;
`;

const ButtonWrapper = styled.div`
    margin-top: var(--spacing_x4);
`;

export const Plug = () => {
    const ratio = useSizeRatio();
    return (
        <Wrapper>
            <Logo $ratio={ratio}/>
            <Face $ratio={ratio}/>
            <Content>
                <TextBlock $ratio={ratio}>
                    <p>
                        <b>
                        Упс, игра уже подошла к концу :(
                        </b>
                    </p>
                    <br />
                    <p>
                        Следи за другими мероприятиями и проектами Альфа-Банка в телеграм-канале!
                    </p>
                </TextBlock>
                <ButtonWrapper>
                    <Button color="red" onClick={() => window.open('https://t.me/alfastudents/1100', '_blank')}>Перейти</Button>
                </ButtonWrapper>
            </Content>
        </Wrapper>
    )
};
