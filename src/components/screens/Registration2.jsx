import styled from "styled-components";
import { SCREENS } from "../../constants/screens";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { IntroHeader } from "../shared/IntroHeader";
import { useProgress } from "../../contexts/ProgressContext";
import { useState } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: var(--spacing_x4);
`;

const Content = styled.div`
    margin-top: var(--spacing_x5);
    /* padding-right: var(--spacing_x6); */
`;

const InputWrapper = styled.div`
    margin-top: var(--spacing_x4);
`;

const Label = styled.p`
    margin-bottom: var(--spacing_x2);
    font-size: var(--font_sm);
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x8);
`;

const InputRadioButton = styled.input`
  display: none;
`;

const RadioIconStyled = styled.div`
  position: relative;
  flex-shrink: 0;
  width: var(--spacing_x4);
  height: var(--spacing_x4);
  background-color: var(--color-black);
  box-shadow: inset 0 0 0 2px var(--color-green);
  border-radius: var(--border-radius-xs);
  margin-right: var(--spacing_x2);
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size: var(--font_xxs);
  color: var(--color-white);
  width: 100%;
  text-align: left;
  margin-top: var(--spacing_x2);
  max-width: 300px;

  & ${InputRadioButton}:checked + ${RadioIconStyled} {
    background: var(--color-green);
  }

  & ${InputRadioButton}:checked + ${RadioIconStyled}::after {
    content: '';
    position: absolute;
    top: 8px;
    left: 2.5px;
    width: 5px;
    height: 1.5px;
    transform: rotate(40deg);
    background-color: var(--color-black);
    border-radius: 5px;
  }

  & ${InputRadioButton}:checked + ${RadioIconStyled}::before {
    content: '';
    position: absolute;
    top: 3px;
    right: 5.5px;
    width: 1.5px;
    height: 9px;
    transform: rotate(-130deg);
    background-color: var(--color-black);
    border-radius: 5px;
  }
`;

const Link = styled.a`
  color: inherit;
`;

export const Registration2 = () => {
    const { next, setUserInfo, user } = useProgress();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [isAgreed, setIsAgreed] = useState('');

    const handleClick = () => {
        setUserInfo({name: `${name} ${surname}`, email, isJustEntered: true});
        //send data to serv => user + name, email
        next();
    }

    return (
        <Wrapper>
            <IntroHeader 
                onBack={() => next(SCREENS.REG_1)}
                text={'Прежде чем помочь Алексу выбраться из леса, давай познакомимся!'}
            />
            <Content>
                <Label>
                    Укажи своё имя
                </Label>
                <Input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Иван"
                />

                <InputWrapper>
                    <Label>
                        Укажи свою фамилию
                    </Label>
                    <Input 
                        type="text" 
                        value={surname} 
                        onChange={(e) => setSurname(e.target.value)} 
                        placeholder="Иванов"
                    />
                </InputWrapper>

                <InputWrapper>
                    <Label>
                        Укажи свою почту
                    </Label>
                    <Input 
                        type="email" 
                        placeholder="user@mail.ru"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </InputWrapper>
                <RadioButtonLabel>
                    <InputRadioButton
                        type="checkbox"
                        value={isAgreed}
                        checked={isAgreed}
                        onChange={() => setIsAgreed((prevAgreed) => !prevAgreed)}
                    />
                    <RadioIconStyled/>
                    <span>
                        Я согласен(а) на{"\u00A0"}
                        {/* <Link
                        href={"https://fut.ru/personal_data_policy/"}
                        target="_blank"
                        > */}
                        обработку персональных данных
                        {/* </Link>{" "} */}
                        и получение информационных сообщений, а также с правилами проведения акции.
                    </span>
                </RadioButtonLabel>
            </Content>
            <ButtonStyled color="red" onClick={handleClick} disabled={!name || !email || !surname || !isAgreed}>Далее</ButtonStyled>
        </Wrapper>
    )
}