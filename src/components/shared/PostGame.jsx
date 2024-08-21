import styled from "styled-components"
import { StarBackCard } from "./StarBackCard";
import dialog from '../../assets/images/dialog.svg';
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { useLayoutEffect, useState } from "react";
import { HeaderComponent } from "./HeaderComponent";
import { StarCard } from "./StarCard";
import { motion } from "framer-motion";
import { Block } from "./Block";
import { Button } from "./Button";
import { CURRENT_WEEK, useProgress } from "../../contexts/ProgressContext";
import { SCREENS } from "../../constants/screens";
import { cardsLevel1, cardsLevel2, cardsLevel3, cardsLevel4 } from "../../constants/cards";


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: ${({$isFlip, $ratio}) => $isFlip ? $ratio * 130 : 0}px;
`;

const CardStyled = styled(StarBackCard)`
    margin-right: ${({$ratio}) => $ratio * -130}px;
`;

const StarCardStyled = styled(motion.div)`
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
`;

const Text = styled.p`
    position: absolute;
    top: ${({$ratio}) => $ratio * 152}px;
    color: var(--color-black-text);
    width: 100%;
    text-align: center;
    font-size: var(--font_md);
    font-weight: bold;
`;

const ButtonsBlock = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: var(--spacing_x4);
    position: relative;

    & button {
        font-size: var(--font_md);
        width: calc((100% - var(--spacing_x4)) / 2);
    }
`;

const TipStyled = styled.div`
    position: absolute;
    bottom: calc(0px - var(--spacing_x2) - ${({$ratio}) => $ratio * 70}px);
    left: 0;
    height: ${({$ratio}) => $ratio * 70}px;
    background: url(${dialog}) no-repeat 0 center;
    width: calc((100% - var(--spacing_x4)) / 2);
    display: flex;
    align-items: center;
    justify-content: center;

    & p {
        font-size: ${({$ratio}) => $ratio * 13}px;
        font-weight: 400;
        margin-top: ${({$ratio}) => $ratio * 12}px;
        color: var(--color-white-text);
        text-align: center;
    }
`;

const TipStyledRight = styled(TipStyled)`
    left: auto;
    right: 0;
`;

const AnswerIcon = styled(motion.div)`
    position: absolute;
    left: 50%;
    top: ${({$ratio}) => $ratio * 93}px;
    width: ${({$ratio}) => $ratio * 64}px;
    height: ${({$ratio}) => $ratio * 64}px;
`;

const AnswerButtonStyled = styled(Button)`
    transition: opacity 0.2s;
    opacity: ${({$darken}) => $darken ? 0.2 : 1};
`;

const CARDS_BY_LEVEL = {
    1: cardsLevel1,
    2: cardsLevel2,
    3: cardsLevel3,
    4: cardsLevel4,
};

export const PostGame = ({finishText, level }) => {
    const { setModal, modal, next, addGamePoint, passedWeeks, gamePoints, setGamePoints, user, setPoints, setWeekPoints } = useProgress();
    const isFirstTime = passedWeeks.length < 1;
    const [isFlip, setFlip] = useState(false);
    const [isFlipped, setFlipped] = useState(false);
    const [cardPoints, setCardPoints] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [activeButton, setActiveButton] = useState();
    const [isShownFirst, setIsShownFirst] = useState(isFirstTime);
    const [shownId, setShownId] = useState(1);
    const [unshownCards, setUnshownCards] = useState(CARDS_BY_LEVEL[level]);
    const [isFinished, setIsFinished] = useState(false);

    const ratio = useSizeRatio();

    useLayoutEffect(() => {
        if (!isFirstTime) return;
        setModal({type: 'cardRules', visible: true, isDisabledAnimation: true});
    }, [isFirstTime, setModal]);

    const handleClick = () => {
        if (isFlip) return;
        setFlip(true);
        setTimeout(() => setFlipped(true), 400);
    };

    const onClickCard = (isAlpha) => {
        if (activeButton !== undefined) return;

        if (isShownFirst) setIsShownFirst(false);
        const card = unshownCards.find(({id}) => id === shownId);

        if (!card) return;
        setActiveButton(+isAlpha);
        setIsCorrect(card.isAlpha === isAlpha);

        if (card.isAlpha === isAlpha) {
            setCardPoints(prev => prev + 1);
            addGamePoint();
        }

        setTimeout(() => {
            setIsCorrect();
            setActiveButton();
            if (unshownCards.length > 1) {
                setUnshownCards(prev => prev.filter(({id}) => id !== shownId));
                setShownId(prev => prev + 1);
            } else {
                setIsFinished(true);
            }
        }, 1500)
    }

    const handleContinue = () => {
        if (level !== CURRENT_WEEK && user?.isVip) {
            setGamePoints(0);
            setModal({type: 'refreshStars', visible: true,});
            
            return;
        } 

        if (!user?.isVip) {
            setPoints(prev => prev + gamePoints);
        } else setWeekPoints(prev => prev + gamePoints);
        //в этом месте обновлять инфу по пойнтам

        setGamePoints(0);

        next(SCREENS.LIBRARY);
    };
    
    const getText = (p) => {
        if (p === 1) return 'балл';
        if ([2, 3, 4].includes(p)) return 'балла';
        if (p >= 5 || p === 0) return 'баллов';
    }
    
    return (
        <HeaderComponent isGame isCards>
            {isShownFirst && !modal.visible && (
                <Text $ratio={ratio}>Скорее жми на карточки!</Text>
            )}
            <Wrapper $isFlip={isFlip} $ratio={ratio}>
                {[...CARDS_BY_LEVEL[level]].reverse().map(({id}) => (
                    id === 1 ? (
                        <StarBackCard 
                            key={id} 
                            onClick={handleClick}
                            animate={isFlip && { rotate: 90, x: '-50%', y: '-50%', position: 'absolute', top: '50%', left: '50%', width: 214 * ratio, height: 342 * ratio }}
                            transition={{
                                duration: 0.4,
                            }}
                        />
                    ) : (
                         <CardStyled key={id} $ratio={ratio} onClick={handleClick} />
                    )
                ))}

                <StarCardStyled 
                    initial={{rotateY: 180 }}
                    animate={{ rotateY: isFlipped ? 0 : 180 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                >
                    {isFinished ? (
                        <Block>
                            {level === 1 ? 'Молодец! ' : ''}Ты получил {cardPoints} {getText(+cardPoints)}.{'\n\n'}
                            {finishText}
                            {'\n\n'}А теперь давай посмотрим на твои карточки.
                            <ButtonStyled color="red" onClick={handleContinue}>Далее</ButtonStyled>
                        </Block>
                    ): (
                        <div>
                            {activeButton !== undefined && (
                                <AnswerIcon
                                    $ratio={ratio}
                                    initial={{translateX: '-50%', opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                >
                                    <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {isCorrect ? (
                                                <path d="M52.0697 18.8192C53.4582 20.2078 53.4582 22.459 52.0697 23.8475L30.7364 45.1809C30.0696 45.8477 29.1652 46.2223 28.2222 46.2223C27.2792 46.2223 26.3749 45.8477 25.7081 45.1809L15.0414 34.5142C13.6529 33.1257 13.6529 30.8744 15.0414 29.4859C16.4299 28.0974 18.6812 28.0974 20.0697 29.4859L28.2222 37.6384L47.0414 18.8192C48.4299 17.4307 50.6812 17.4307 52.0697 18.8192Z" fill="#8FFF00"/>
                                            ) : (
                                                <path d="M16.0536 17.0536C17.6808 15.4265 20.319 15.4265 21.9462 17.0536L31.4999 26.6074L41.0536 17.0536C42.6808 15.4265 45.319 15.4265 46.9462 17.0536C48.5734 18.6808 48.5734 21.319 46.9462 22.9462L37.3925 32.4999L46.9462 42.0536C48.5734 43.6808 48.5734 46.319 46.9462 47.9462C45.319 49.5734 42.6808 49.5734 41.0536 47.9462L31.4999 38.3925L21.9462 47.9462C20.319 49.5734 17.6808 49.5734 16.0536 47.9462C14.4265 46.319 14.4265 43.6808 16.0536 42.0536L25.6074 32.4999L16.0536 22.9462C14.4265 21.319 14.4265 18.6808 16.0536 17.0536Z" fill="#8FFF00"/>
                                        )}
                                    </svg>
                                </AnswerIcon>
                            )}
                            <StarCard text={CARDS_BY_LEVEL[level].find(({id}) => id === shownId)?.text} />
                            <ButtonsBlock $ratio={ratio}>
                                <AnswerButtonStyled color="white" onClick={() => onClickCard(false)} $darken={activeButton === 1}>Тёмный лес</AnswerButtonStyled>
                                <AnswerButtonStyled color="green" onClick={() => onClickCard(true)} $darken={activeButton === 0}>Альфа-банк</AnswerButtonStyled>
                                {
                                    isShownFirst && (
                                        <>
                                            <TipStyled $ratio={ratio}>
                                                <p>Жми, если карточка{'\n'}не про Альфа-Банк</p>
                                            </TipStyled>
                                            <TipStyledRight $ratio={ratio}>
                                                <p>Жми, если карточка{'\n'}про Альфа-Банк</p>
                                            </TipStyledRight>
                                        </>
                                    )
                                }
                            </ButtonsBlock>
                        </div>
                    )}
                </StarCardStyled>
            </Wrapper>
        </HeaderComponent>
    )
}