import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import top from '../../assets/images/lobby-top.png';
import bot from '../../assets/images/lobby-bot.png';
import alex from '../../assets/images/alex.png';
import dialog from '../../assets/images/dialog3.svg';
import close from '../../assets/images/close.svg';
import { SCREENS } from "../../constants/screens";
import { CURRENT_WEEK, useProgress } from "../../contexts/ProgressContext";
import { HeaderComponent } from "../shared/HeaderComponent";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Button, IconButton } from "../shared/Button";

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
    font-weight: 700;
    font-size: ${({$ratio}) => $ratio * 20}px;
    z-index: 4;

    & p {
        margin-top: ${({$ratio}) => $ratio * 2}px;
    }
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

const TgButton = styled(IconButton)`
    position: absolute;
    bottom: var(--spacing_x4);
    right: var(--spacing_x4);
`;

const TipStyled = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: calc(0px - var(--spacing_x2) - ${({$ratio}) => $ratio * 70}px);
    left: ${({$ratio}) => $ratio * -15}px;
    height: ${({$ratio}) => $ratio * 78}px;
    background: url(${dialog}) no-repeat 0 center;
    width: ${({$ratio}) => $ratio * 277}px;
    background-size: contain;

    & p {
        font-size: var(--font_md);
        font-weight: 400;
        margin-top: ${({$ratio}) => $ratio * 12}px;
        color: var(--color-white-text);
    }
`;

const CloseIcon = styled.button`
    position: absolute;
    top: var(--spacing_x4);
    right: var(--spacing_x2);
    background: transparent;
    outline: none;
    border: none;
    width: ${({$ratio}) => $ratio * 16}px;
    height: ${({$ratio}) => $ratio * 16}px;
    background: url(${close}) no-repeat center center;
    background-size: cover;
    cursor: pointer;
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
    const { passedWeeks, next, points, vipPoints, user, hasPassedThisTry, setModal, modal } = useProgress();
    const [week, setWeek] = useState(CURRENT_WEEK);
    const [isAvailableFirst, setIsAvailableFirst] = useState(!passedWeeks.includes(1) && CURRENT_WEEK > 1);

    const weeks = Array.from({length: 4}, (v, i) => i + 1);

    const changeWeek = (w) => {
        if (w > CURRENT_WEEK || passedWeeks.includes(w)) return;
        setWeek(w);
    };

    const isFirstTime = (!passedWeeks.length && ((!user.isVip && points === 0) || (user.isVip && vipPoints === 0)));

    useLayoutEffect(() => {
        if (!user.seenRules || isFirstTime) {
            setModal({type: 'info', visible: true, isDisabledAnimation: true, isDarken: true})
        }
    }, []);

    const handleCloseTip = (e) => {
        e.stopPropagation();
        setIsAvailableFirst(false);
    }

    return (
        <HeaderComponent isFirstTime={isFirstTime && !modal.visible} isNoGames={passedWeeks.length === CURRENT_WEEK}>
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
                               <p>{w}</p>
                              { w === 1 && isAvailableFirst && (
                                <TipStyled $ratio={ratio}>
                                    <p>Тебе доступен уровень{'\n'}первой недели. Жми сюда.</p>
                                    <CloseIcon $ratio={ratio} onClick={handleCloseTip}/>
                                </TipStyled>
                              )}
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
                <TgButton color="white" icon={{width: 18, height: 16}} onClick={() => setModal({type: 'tg', visible: true})}> 
                    <svg viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 1.03138L14.8109 14.8755C14.8109 14.8755 14.4347 15.8354 13.4011 15.3751L7.19673 10.517L7.16795 10.5027C8.00603 9.73417 14.5048 3.76706 14.7888 3.49658C15.2285 3.07767 14.9555 2.82829 14.445 3.14473L4.84555 9.37027L1.1421 8.09773C1.1421 8.09773 0.559283 7.88602 0.503215 7.42568C0.446409 6.96459 1.16128 6.7152 1.16128 6.7152L16.2591 0.666718C16.2591 0.666718 17.5 0.109938 17.5 1.03138Z" fill="black"/>
                    </svg>
                </TgButton>
            </Wrapper>
            <TopPicture />
            <BotPicture />
        </HeaderComponent>
    )
}