import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import top from '../../assets/images/lobby-top.png';
import bot from '../../assets/images/lobby-bot.png';
import alex from '../../assets/images/alex.png';
import { SCREENS } from "../../constants/screens";
import { CURRENT_WEEK, useProgress } from "../../contexts/ProgressContext";
import { HeaderComponent } from "../shared/HeaderComponent";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Button } from "../shared/Button";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({$ratio}) => $ratio * 334}px var(--spacing_x4) 0;
`;

const Picture = styled.div`
    position: absolute;
    background-size: cover;
    width: 100%;
    background-repeat: no-repeat;
    z-index: 1;
    left: 0;
`;

const TopPicture = styled(Picture)`
    top: 0;
    height: 79vw;
    background-image: url(${top});
    background-position: center 100%;
    max-height: 299px;
`;

const BotPicture = styled(Picture)`
    bottom: 0;
    height: 72vw;
    background-image: url(${bot});
    background-position: center 0;
    max-height: 270px;
`;

const Path = styled.div`
    position: relative;
    display: flex;
    width: ${({$ratio}) => $ratio * 288}px;
    justify-content: space-between;
    margin-bottom: var(--spacing_x4);
`;

const WeekCircle = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({$ratio}) => $ratio * 36}px;
    height: ${({$ratio}) => $ratio * 36}px;
    background: var(--color-pink);
    border-radius: 50%;
    color: var(--color-pink-text);
    opacity: ${({$unavailable}) => $unavailable ? 0.35 : 1};
    z-index: 4;
`;

const Divider = styled.div`
    position: absolute;
    top: ${({$ratio}) => $ratio * 18}px;
    z-index: 1;
    left: ${({$ratio, $left}) => $left * $ratio * 36 + ($left - 1) * $ratio * 48}px;
    width: ${({$ratio}) => $ratio * 48}px;
    height: 3px;
    background: var(--color-pink);
    opacity: ${({$unavailable}) => $unavailable ? 0.35 : 1};
`;

const Character = styled.div`
    position: absolute;
    width: ${({$ratio}) => $ratio * 135}px;
    height: ${({$ratio}) => $ratio * 165}px;
    top: ${({$ratio}) => $ratio * -170}px;
    left: ${({$left, $ratio}) => $left * $ratio}px;
    transition: left 0.2s;
    z-index: 6;
    background: url(${alex}) no-repeat center center;
    background-size: contain;
`;

const NextWeekInfo = styled.div`
    width: ${({$ratio}) => $ratio * 344}px;
    padding: var(--spacing_x5);
    background: var(--color-white);
    color: var(--color-white-text);
    border-radius: var(--border-radius-sm);
    opacity: ${({$hidden}) => $hidden ? 0 : 1};
`;

const WEEK_TO_NEXT_SCREEN = {
    1: SCREENS.GAME1,
    2: SCREENS.GAME2,
    3: SCREENS.GAME3,
    4: SCREENS.GAME4,
}

const WEEK_TO_POSITION = {
    1: 0,
    2: 46,
    3: 116,
    4: 176,
}

export const Lobby = () => {
    const ratio = useSizeRatio();
    const { passedWeeks, next, setModal, points, vipPoints, user, hasPassedThisTry } = useProgress();
    const [week, setWeek] = useState(CURRENT_WEEK);

    const weeks = Array.from({length: 4}, (v, i) => i + 1);

    const changeWeek = (w) => {
        if (w > CURRENT_WEEK || passedWeeks.includes(w)) return;
        setWeek(w);
    };

    useLayoutEffect(() => {
        if (((!user.isVip && points === 0) || (user.isVip && vipPoints === 0))) {
            setModal({type: 'info', visible: true, isDisabledAnimation: true, isDarken: true})
        }
    }, []);

    return (
        <HeaderComponent>
            <Wrapper $ratio={ratio}>
                <Path $ratio={ratio}>
                    <Character $ratio={ratio} $left={WEEK_TO_POSITION[week]}/>
                    {weeks.map((w) => 
                        <>
                            <WeekCircle 
                                $ratio={ratio} 
                                onClick={() => changeWeek(w)}
                                $ind={w} 
                                key={`week_${w}`} 
                                $unavailable={w > CURRENT_WEEK}
                            >
                                {w}
                            </WeekCircle>
                            {w > 1 && (
                                <Divider $ratio={ratio} $unavailable={w > CURRENT_WEEK} $left={w - 1}/>
                            )}
                        </>
                    )}
                </Path>
                {
                    passedWeeks.includes(week) && week === CURRENT_WEEK ? (
                        <NextWeekInfo $ratio={ratio} $hidden={!hasPassedThisTry}>
                            Увидимся на следующей неделе!
                        </NextWeekInfo>
                    ) : (
                        <Button color="red" onClick={() => next(WEEK_TO_NEXT_SCREEN[week])}>В лес!</Button>
                    )
                }
            </Wrapper>
            <TopPicture />
            <BotPicture />
        </HeaderComponent>
    )
}