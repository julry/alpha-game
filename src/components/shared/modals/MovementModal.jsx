import styled from "styled-components";
import { useState } from "react";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import alex from '../../../assets/images/alex.png';
import alexL from '../../../assets/images/alex-left.png';
import tree3 from '../../../assets/images/tree.png';
import tree4 from '../../../assets/images/tree4.png';
import star from '../../../assets/images/starWhite.png';
import stone from '../../../assets/images/stone.png';
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { motion } from "framer-motion";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--spacing_x5);
    z-index: 5;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: var(--spacing_x4) 0 0;
    align-items: center;

    & button {
        width: calc((100% - var(--spacing_x3) + (var(--spacing_x1) / 2))/2);
    }
`;

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x4) 0 0;
`;

const CharacterStyled = styled.img`
    position: absolute;
    width: ${({$ratio}) => $ratio * 135}px;
    height: ${({$ratio}) => $ratio * 165}px;
    bottom: ${({$ratio}) => $ratio * 38}px;
    left: ${({$ratio}) => $ratio * 64}px;
    object-fit: contain;
`;

const Character2Styled = styled(motion.img)`
    position: absolute;
    width: ${({$ratio}) => $ratio * 135}px;
    height: ${({$ratio}) => $ratio * 165}px;
    bottom: ${({$ratio}) => $ratio * 30}px;
    left: ${({$ratio}) => $ratio * 80}px;
    object-fit: contain;
    z-index: 3;
`;

const ControlWrapper = styled.div`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 85}px;
    right: ${({$ratio}) => $ratio * 75}px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 70}px;
    height: ${({$ratio}) => $ratio * 70}px;
    background-color: transparent;
    border: ${({$ratio}) => $ratio * 3.5}px solid var(--color-green);
    border-radius: 50%;
`;

const InnerStyled = styled(motion.div)`
    width: ${({$ratio}) => $ratio * 37}px;
    height: ${({$ratio}) => $ratio * 37}px;
    border-radius: 50%;
    background-color: var(--color-white);
`;

const Tree1 = styled.img`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 86}px;
    left: ${({$ratio}) => $ratio * -30}px;
    width: ${({$ratio}) => $ratio * 171}px;
    object-fit: contain;
    height: ${({$ratio}) => $ratio * 275}px;
    filter: brightness(0.3);
`;

const Tree2 = styled.img`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * -17}px;
    right: ${({$ratio}) => $ratio * -82}px;
    width: ${({$ratio}) => $ratio * 199}px;
    height: ${({$ratio}) => $ratio * 300}px;
    object-fit: contain;
    filter: brightness(0.3);
`;

const Stone = styled.img`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 19}px;
    left: ${({$ratio}) => $ratio * 2}px;
    width: ${({$ratio}) => $ratio * 95}px;
    height: ${({$ratio}) => $ratio * 77}px;
    object-fit: contain;
    filter: brightness(0.3);
`;

const Star = styled.img`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 155}px;
    left: ${({$ratio}) => $ratio * 233}px;
    width: ${({$ratio}) => $ratio * 44}px;
    height: ${({$ratio}) => $ratio * 47}px;
    object-fit: contain;
    z-index: 4;
`;

const ModalStyled = styled(Modal)`
    background: rgba(0, 0, 0, 0.95);
`;

export const MovementModal = () => {
    const ratio = useSizeRatio();
    const [part, setPart] = useState(0);
    const { user, setModal } = useProgress();
    const [image, setImage] = useState(alex);

    const getContent = () => {
        switch (part) {
            case 0:
                return (
                    <>
                        <Content>
                            <p>
                                Используй джойстик, чтобы управлять Алексом.{'\n\n'}
                                Вперёд к Альфа-сити!
                            </p>
                            <ButtonStyled color="red" onClick={() => setPart(prev => prev + 1)}>Далее</ButtonStyled>
                        </Content>
                        <CharacterStyled 
                            $ratio={ratio}
                            src={image}
                            alt=''
                        />
                        <ControlWrapper $ratio={ratio}>
                            <InnerStyled 
                                $ratio={ratio}
                                animate={{x: -14 * ratio}}
                                onUpdate={({x}) => {
                                    if (x < -5) setImage(alexL);
                                    else setImage(alex);
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.5,
                                    repeatType: 'reverse',
                                    repeatDelay: 0.4
                                }}
                            />
                        </ControlWrapper>
                    </>
                )
            case 1: 
                return (
                    <>
                        <Content>
                            <p>
                                Собери <b>10 белых Альфа-звёзд</b>, они осветят путь Алексу.{' '}
                                Чем больше звёзд, тем светлее лес. <b>Не попадайся змейкам</b> — столкнёшься с ними{' '}
                                и окажешься в стартовой точке.
                            </p>
                            {user.isVip && (
                                <p>
                                    {'\n\n'}
                                    Если пройдёшь уровень с первой попытки,{' '}
                                    получишь <b>3 красные звёзды</b>, если со второй — 2, с третьей — 1.
                                </p>
                            )}
                            <ButtonsWrapper>
                                <Button color="pink" onClick={() => setPart(prev => prev - 1)}>Назад</Button>
                                <Button color="red" onClick={() => setModal({visible: false})}>Далее</Button>
                            </ButtonsWrapper>
                        </Content>
                        <Character2Styled 
                            $ratio={ratio}
                            src={alex}
                            animate={{x: 51 * ratio}}
                            transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                repeatType: 'reverse',
                                repeatDelay: 2
                            }}
                        />
                        <Star src={star} alt="" $ratio={ratio}/>
                        <Tree1 src={tree3} alt="" $ratio={ratio}/>
                        <Tree2 src={tree4} alt="" $ratio={ratio}/>
                        <Stone src={stone} alt="" $ratio={ratio}/>
                    </>
                );
            default: break;
        }
    }

    return (
        <ModalStyled isDarken isDisabledAnimation>
            {getContent()}
        </ModalStyled>
    )
}