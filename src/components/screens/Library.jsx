import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import dialogL from '../../assets/images/library-left.svg';
import dialogR from '../../assets/images/library-right.svg';
import closeIcon from '../../assets/images/close.svg';
import { cardsLevel1, cardsLevel2, cardsLevel3, cardsLevel4 } from "../../constants/cards";
import { SCREENS } from "../../constants/screens";
import { CURRENT_WEEK, useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { BackButton, Button } from "../shared/Button";
import { Arrow, TreeIcon } from "../shared/icons";
import { StarBackCard } from "../shared/StarBackCard";
import { StarCard } from "../shared/StarCard";
import { Modal } from "../shared/modals/Modal";
import { Block } from "../shared/Block";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    
`;

const BackBtnStyled = styled(BackButton)`
    position: absolute;
    top: var(--spacing_x4);
    left: var(--spacing_x4);
    z-index: 10;
`;

const Wardrobe = styled.div`
    position: absolute;
    left: 50%;
    bottom: ${({$ratio}) => $ratio * 33}px;
    width: ${({$ratio}) => $ratio * 343}px;
    height: ${({$ratio}) => $ratio * 544}px;
    padding: var(--spacing_x5);
    background-color: var(--color-red);
    transform: translateX(-50%);
    border-radius: ${({$ratio}) => $ratio * 30}px ${({$ratio}) => $ratio * 30}px 0 0;
`;

const Door = styled.div`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 23}px;
    width: ${({$ratio}) => $ratio * 146}px;
    height: ${({$ratio}) => $ratio * 146}px;
    background: var(--color-pink);
    
    &::before {
        content: '';
        position: absolute;
        top: ${({$ratio}) => $ratio * 42}px;
        width: ${({$ratio}) => $ratio * 10}px;
        height: ${({$ratio}) => $ratio * 63}px;
        background: var(--color-green);
    }
`;

const DoorL = styled(Door)`
    left: var(--spacing_x5);

    &::before {
        right: var(--spacing_x4);
    }
`;

const DoorR = styled(Door)`
    right: var(--spacing_x5);
    
    &::before {
        left: var(--spacing_x4);
    }
`;

const Cards = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: var(--spacing_x5);
`;

const CardWrapper = styled.div`
    position: relative;
    background: var(--color-black);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    width: ${({$ratio}) => $ratio * 142}px;
    height: ${({$ratio}) => $ratio * 142}px;
    border-radius: ${({$ind, $ratio}) => $ind === 0 ? $ratio * 15 : 0}px ${({$ind, $ratio}) => $ind === 1 ? $ratio * 15 : 0}px 0 0;
`;

const WeekDialog = styled.div`
    position: absolute;
    width: ${({$ratio}) => $ratio * 297}px;
    height: ${({$ratio}) => $ratio * 96}px;
    top: ${({$ratio}) => $ratio * -48}px;
    padding: var(--spacing_x4) var(--spacing_x3) var(--spacing_x6) var(--spacing_x5);
    background-size: cover;
    z-index: 3;


    & p {
        color: var(--color-black);
    }

    & button {
        position: absolute;
        top: ${({$ratio}) => $ratio * 10}px;
        right: ${({$ratio}) => $ratio * 10}px;
        background: transparent;
        outline: none;
        border: none;
        width: ${({$ratio}) => $ratio * 16}px;
        height: ${({$ratio}) => $ratio * 16}px;
        background: url(${closeIcon}) no-repeat center center;
        background-size: cover;
        cursor: pointer;
    }
`;

const LeftDialog = styled(WeekDialog)`
    left: 0;
    background: url(${dialogL}) no-repeat center center;
`;

const RightDialog = styled(WeekDialog)`
    right: -4px;
    background: url(${dialogR}) no-repeat center center;
`;

const Text = styled.div`
    flex-grow: 1;
    font-size: var(--font_sm);
    font-weight: 900;
    color: var(--color-black-text);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    opacity: ${({$unknown}) => $unknown ? 0.3 : 1};
`;

const BackCardStyled = styled(StarBackCard)`
    width: ${({$ratio}) => $ratio * 122}px;
    height: ${({$ratio}) => $ratio * 76}px;
    margin-top: auto;
    flex-shrink: 0;

    & svg {
        width: ${({$ratio}) => $ratio * 57}px;
        height: ${({$ratio}) => $ratio * 57}px;
    }

    ${({$unknown}) => $unknown ? 'border: 2px solid var(--color-white); background: transparent; opacity: 0.3' : ''};
`;

const OpenedWrapper = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StarWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 352}px;
    padding: ${({$ratio}) => $ratio * 50}px ${({$ratio}) => $ratio * 5}px 0;
`;

const Info = styled.div`
    padding: var(--spacing_x2);
    background: var(--color-white);
    color: var(--color-white-text);
    border-radius: var(--border-radius-sm);
    font-size: var(--font_sm);
    width: fit-content;
    flex-grow: 0;
    margin: var(--spacing_x4) auto 0;
`;

const CloseIcon = styled.button`
    position: absolute;
    top: ${({$ratio}) => $ratio * 167}px;
    right: calc(var(--spacing_x4) + var(--spacing_x5));
    background: transparent;
    outline: none;
    border: none;
    padding: 20px;
    width: ${({$ratio}) => $ratio * 65}px;
    height: ${({$ratio}) => $ratio * 65}px;
    cursor: pointer;
    z-index: 100;
`;

const ModalContent = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--spacing_x5);
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
`;

export const Library = () => {
    const ratio = useSizeRatio();
    const { next, passedWeeks, cardsSeen } = useProgress();
    const [openedCards, setOpenedCards] = useState([]);
    const [isModal, setIsModal] = useState(false); 

    const weeks = [
        {
            name: 'Лес\nПереработок',
            id: 1,
            cards: cardsLevel1,
        },
        {
            name: 'Лес Негибкого\nграфика',
            id: 2,
            cards: cardsLevel2,
        },
        {
            name: 'Лес Токсичной\nатмосферы',
            id: 3,
            cards: cardsLevel3,
        },
        {
            name: 'Лес\nПросроченных\nдедлайнов',
            id: 4,
            cards: cardsLevel4,
        }
    ];

    const dialogs = weeks.map(({id}) => !cardsSeen.includes(id) && passedWeeks.includes(id));

    const [shownDialogs, setShownDialogs] = useState(dialogs);

    const handleClick = (id, cards) => {
        if (!passedWeeks.includes(id)) {
            setIsModal(true);
            return;
        }

        if (!cardsSeen.includes(id)) {
            next(SCREENS[`POST_GAME${id}`]);
        }
    
        setOpenedCards(cards);
    };

    const getDialog = (id) => {
        if (!shownDialogs[id - 1]) return;

        const Component = id % 2 === 0 ? RightDialog : LeftDialog;

        const handleDialogClose = (e) => {
            e.stopPropagation();
            setShownDialogs(prev => prev.map((d, ind) => ind === id - 1 ? false : d));
        };

        return (
            <Component $ratio={ratio}>
                <p>У тебя остались неоткрытые звёзды с {id === CURRENT_WEEK ? 'этой' : 'прошлой'} недели, кликни, чтобы посмотреть их.</p>
                <button onClick={handleDialogClose}/>
            </Component>
        )
    };
    
    return (
        <Wrapper>
            <BackBtnStyled onClick={() => next(SCREENS.LOBBY)}>
                <Arrow color="var(--color-green)"/>
                <TreeIcon />
            </BackBtnStyled>
            <Wardrobe $ratio={ratio} $blurred={!!openedCards.length}>
                <Cards  $ratio={ratio}>
                    {weeks.map(({id, name, cards}, ind) =>(
                        <CardWrapper $ratio={ratio} key={name + id} $ind={ind} onClick={() => handleClick(id, cards)}>
                            <Text $ratio={ratio} $unknown={!cardsSeen.includes(id)}>{cardsSeen.includes(id) ? name : "?"}</Text>
                            <BackCardStyled $ratio={ratio} $unknown={!cardsSeen.includes(id)}/>
                            {getDialog(id)}
                        </CardWrapper>
                    ))}
                </Cards>
                <DoorL $ratio={ratio}/>
                <DoorR $ratio={ratio} />
            </Wardrobe>
            {
                openedCards.length > 0 && (
                    <OpenedWrapper>
                        <CloseIcon $ratio={ratio} onClick={() => setOpenedCards([])}>
                        <svg width="100%" height="100%" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.3125 20.3125L4.6875 4.6875M4.6875 20.3125L20.3125 4.6875" stroke="white" strokeWidth="3.125" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </CloseIcon>
                        <Slider
                            centerMode
                            slidesToShow={1}
                            slidesToScroll={1}
                            adaptiveHeight={true}
                            initialSlide={5}
                            variableWidth
                            arrows={false}
                        >
                            {openedCards.map(({text, id, isAlpha}) => (
                                <StarWrapper key={id} $ratio={ratio}>
                                    <StarCard text={text} />
                                    <Info>{isAlpha ? 'Альфа-Банк' : 'Тёмный лес'}</Info>
                                </StarWrapper>
                            ))}
                        </Slider>
                    </OpenedWrapper>
                )
            }
            {isModal && (
                <Modal isDarken>
                    <ModalContent>
                        Карточки на этой полке откроются после прохождения следующих недель.
                        <ButtonStyled color="red" onClick={() => setIsModal(false)}>Понятно</ButtonStyled>
                    </ModalContent>
                </Modal>
            )}
        </Wrapper>
    )
}