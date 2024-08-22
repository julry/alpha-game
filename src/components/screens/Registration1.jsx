import styled from "styled-components";
import { SCREENS } from "../../constants/screens";
import { Button } from "../shared/Button";
import { Select } from "../shared/Select";
import { IntroHeader } from "../shared/IntroHeader";
import { useProgress } from "../../contexts/ProgressContext";
import { useState } from "react";
import { faculties, universities } from "../../constants/universities";

const Wrapper = styled.div`
    overflow: auto;
    width: 100%;
    height: 100%;
    padding: var(--spacing_x4);
`;

const Label = styled.p`
    margin-top: var(--spacing_x5);
    margin-bottom: var(--spacing_x2);
    font-size: var(--font_sm);
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x8);
`;

export const Registration1 = () => {
    const [univ, setUniv] = useState({});
    const [fac, setFac] = useState('');
    const { next, setUserInfo } = useProgress();

    const handlePicUniversity = (id, name) => {
        if (univ?.id === id) return;
        
        setUniv({id, name});
        setFac('');
    }

    const handleNext = () => {
        setUserInfo({university: `${univ.name} ${fac}`, isVip: !!fac && fac !== 'Другое'});
        next();
    }

    const btnDisabled = !univ?.id || (univ.id !== 'other' && !fac);

    return (
        <Wrapper>
            <IntroHeader 
                onBack={() => next(SCREENS.INTRO)}
                text={'Прежде чем помочь Алексу выбраться из леса, давай познакомимся!'}
            />
            <Label>Выбери свой ВУЗ</Label>
            <Select options={universities} onChoose={handlePicUniversity}/>
            {univ?.id && univ.id !== 'other' && (
                <>
                    <Label>Выбери свой факультет</Label>
                    <Select 
                        options={faculties.filter(({university}) => university === univ.id || university === 'all')}
                        onChoose={(_, name) => setFac(name)}
                    />
                </>
            )}
            <ButtonStyled color="red" onClick={handleNext} disabled={btnDisabled}>Далее</ButtonStyled>
        </Wrapper>
    )
}