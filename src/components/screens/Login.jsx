import styled from "styled-components";
import { SCREENS } from "../../constants/screens";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { IntroHeader } from "../shared/IntroHeader";
import { useProgress } from "../../contexts/ProgressContext";
import picture from "../../assets/images/login-pic.png";
import { useState } from "react";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { emailRegExp } from "../../constants/regexp";
import { getUserInfo } from "../../utils/getUserInfo";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    padding: var(--spacing_x4);
    position: relative;
    z-index: 2;
`;

const Text = styled.p`
    margin-top: var(--spacing_x5);
    margin-bottom: var(--spacing_x2);
    font-size: var(--font_sm);
`;

const ButtonStyled = styled(Button)`
    transition: opacity 0.2s, margin 0.2s;
    margin-top: ${({$isWrongEmail}) => $isWrongEmail ? 'calc(var(--spacing_x3) + 2px)' : 'var(--spacing_x5)'};
    opacity: ${({$isHidden}) => $isHidden ? 0 : 1};

    & + & {
        margin-top: var(--spacing_x2);
    }
`;

const Picture = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    width: 100%;
    background: url(${picture}) no-repeat center 100% / contain;
    height: ${({$ratio}) => $ratio * 418}px;
`;

const WrongText = styled.p`
    margin-top: var(--spacing_x2);
    color: var(--color-green);
    font-size: var(--font_xs);
`;

export const Login = () => {
    const [isWrongEmail, setWrongEmail] = useState(false);
    const [email, setEmail] = useState('');

    const ratio = useSizeRatio();
    const { next, setUserInfo, setPassedWeeks, setPoints, setWeekPoints, setVipPoints, setCardsSeen } = useProgress();

    const handleClick = async () => {
        if (!!email && !email.match(emailRegExp)) {
            setWrongEmail(true);
            return;
        }
        
        const info = await getUserInfo(email);

        if (info.isError) {
            setWrongEmail(true);
            return;
        }
        const { userInfo, passedWeeks, cardsSeen, points, weekPoints, vipPoints } = info;

        setUserInfo({...userInfo});
        setPassedWeeks(passedWeeks);
        setPoints(points);
        setWeekPoints(weekPoints);
        setVipPoints(vipPoints);
        setCardsSeen(cardsSeen);
        next();
    }
    return (
        <Wrapper>
            <Content>
                <IntroHeader 
                    onBack={() => next(SCREENS.INTRO)}
                    text={'Привет! Рады,\nчто ты волнуешься\nза Алекса.'}
                />
                <Text>
                    Введи свою почту,{'\n'}чтобы продолжить играть.
                </Text>
                <Input placeholder="user@mail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                {isWrongEmail && (
                    <WrongText>Ой! Такой почты нет. Попробуй ввести снова или зарегистрируйся, чтобы начать играть.</WrongText>
                )}
                <ButtonStyled $isWrongEmail={isWrongEmail} color="red" onClick={handleClick}>Далее</ButtonStyled>
                <ButtonStyled $isHidden={!isWrongEmail} color="pink" onClick={() => next(SCREENS.REG_1)}>Регистрация</ButtonStyled>
            </Content>
            <Picture $ratio={ratio} />
        </Wrapper>
    )
}