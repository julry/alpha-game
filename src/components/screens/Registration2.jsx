import styled from "styled-components";
import { uid } from "uid";
import { SCREENS } from "../../constants/screens";
import { Button } from "../shared/Button";
import { Input } from "../shared/Input";
import { IntroHeader } from "../shared/IntroHeader";
import { useProgress } from "../../contexts/ProgressContext";
import {emailRegExp} from '../../constants/regexp';
import { useState } from "react";
import { reachMetrikaGoal } from "../../utils/reachMetrikaGoal";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    padding: var(--spacing_x4);
`;

const Content = styled.div`
    margin-top: var(--spacing_x5);
`;

const InputStyled = styled(Input)`
    ${({$isError}) => $isError ? 'box-shadow: 0 0 0 1px var(--color-red); color: var(--color-red)' : ''};
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

    & + & {
        margin-top: var(--spacing_x4);
    }
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

const WrongText = styled.p`
    margin-top: var(--spacing_x2);
    color: var(--color-green);
    font-size: var(--font_xs);
`;

const weekToMetrikaName = {
    2: 'second',
    3: 'third',
    4: 'fourth',
}

export const Registration2 = () => {
    const { next, setUserInfo, user, currentWeek, registrateUser, getUserInfo } = useProgress();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isAgreed, setIsAgreed] = useState('');
    const [isCorrect, setIsCorrect] = useState(true);
    const [isAlreadyHas, setIsAlreadyHas] = useState(false);
    
    const handleBlur = () => {
        if (email.match(emailRegExp) || !email) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleChange = (e) => {
        if (isSending) return;
        setIsCorrect(true);
        setIsAlreadyHas(false);
        setEmail(e.target.value);
    };

    const actionLink = user?.isVip ? 'https://alfajourney.fut.ru/agreement_ff.pdf ' : 'https://alfajourney.fut.ru/agreement.pdf'; 

    const handleClick = async () => {
        if (isSending) return;
        const res = await getUserInfo(email);

        if (!res.isError) {
            setIsAlreadyHas(true);

            return;
        }
        const id = uid(7);

        setIsSending(true);
        setUserInfo({name: `${name} ${surname}`, email, registerWeek: currentWeek, id});
        await registrateUser({name: `${name} ${surname}`, email, id});
        setIsSending(false);

        if (currentWeek === 1) {
            reachMetrikaGoal(`${user?.isVip ? '' : 'non'}target_lobby`);
        } else {
            reachMetrikaGoal(`${user.isVip ? '' : 'non'}target_${weekToMetrikaName[currentWeek]}_week_start`);
        }

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
                    <InputStyled 
                        $isError={!isCorrect}
                        type="email" 
                        placeholder="user@mail.ru"
                        value={email} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </InputWrapper>
                {isAlreadyHas && (
                    <WrongText>Ой! Эта почта уже зарегистрирована. Попробуй ввести снова или войди, чтобы начать играть.</WrongText>
                )}
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
                        <a
                            href={"https://doc.fut.ru/personal_data_policy.pdf"}
                            target="_blank"
                            rel="noreferrer"
                        >
                        обработку персональных данных
                        </a>{" "}
                        и получение информационных сообщений, а также с{' '} 
                        <a
                            href={actionLink}
                            target="_blank"
                            rel="noreferrer"
                        >
                        правилами проведения акции
                        </a>.
                    </span>
                </RadioButtonLabel>
            </Content>
            <ButtonStyled color="red" onClick={handleClick} disabled={!name || !email || !surname || !isAgreed || !isCorrect || isAlreadyHas}>Далее</ButtonStyled>
            {isAlreadyHas && (<ButtonStyled color='pink' onClick={() => {next()}}>Вход</ButtonStyled>)}
        </Wrapper>
    )
}