import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { WhiteStarPart } from "./WhiteStarPart";
import { RedStarPart } from "./RedStarPart";
import { useEffect, useState } from "react";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--spacing_x5);
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: var(--spacing_x4) 0 var(--spacing_x5);
    align-items: center;

    & button {
        width: calc((100% - var(--spacing_x3) + (var(--spacing_x1) / 2))/2);
    }
`;

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x4) 0 var(--spacing_x5);
`;

const ProgressWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const ProgressCircle  = styled.div`
    width: ${({$ratio}) => $ratio * 6}px;
    height: ${({$ratio}) => $ratio * 6}px;
    border-radius: 50%;
    background-color: var(--color-${({$isActive}) => $isActive ? 'red' : 'black'});
    transition: background-color 0.2s;

    & + & {
        margin-left:  ${({$ratio}) => $ratio * 2.5}px;
    }
`;

export const InfoModal = () => {
    const ratio = useSizeRatio();
    const [part, setPart] = useState(0);
    const [checkTg, setCheckTg] = useState(false);
    const { user, setVipPoints, setModal, setUserInfo, updateUser, getUserInfo } = useProgress();
    const amount = user?.isVip ? 4 : 3;
    const progress = Array.from({length: amount}, (v, i) => i);

    const Progress = () => (
        <ProgressWrapper>
            {progress.map((p) => (
                <ProgressCircle key={p} $isActive={p === part} $ratio={ratio}/>
            ))}
        </ProgressWrapper>
    );

    const handleGoLobby = () => {
        updateUser({seenRules: true});
        setUserInfo({seenRules: true});
        setModal({visible: true, type: 'tg'});
    }

    const LastPart = (
        <Content>
            <p>
                Изучи опушку леса: на ней есть твой профиль и правила игры.
            </p>
            <ButtonsWrapper>
                <Button color="pink" onClick={() => setPart(prev => prev - 1)}>Назад</Button>
                <Button color="red" onClick={handleGoLobby}>На опушку</Button>
            </ButtonsWrapper>
            <Progress />
        </Content>
    );

    const handleSetRedStarPart = () => {
        if (user.isVip && !user.weekStars.includes(1)) {
            updateUser({vipPoints: 1});
            setVipPoints(prev => prev + 1);
            setUserInfo({weekStars: [...user.weekStars, 1]})
        }
        setPart(prev => prev + 1)
    }

    useEffect(() => {
        const handleCheck = () => {
            if (user.isTgConnected || checkTg) return;

            setCheckTg(true);
            
            getUserInfo(user.email, true).finally(() => {
                setCheckTg(false);
            });
        }

        window.addEventListener('focus', handleCheck);

        return () => window.removeEventListener('focus', handleCheck);
    }, []);
    
    const getContent = () => {
        switch (part) {
            case 0:
                return (
                    <Content>
                        <p>
                            Алекс попал в страшный лес. Это мрачное место, где каждый шаг наполнен тягостными мыслями{' '}
                            о строгих дедлайнах и бесконечных рабочих днях. В тёмных уголках леса{' '}
                            обитают призраки несбывшихся проектов и тени упущенных возможностей. 
                            {'\n\n'}
                            <b>Помоги Алексу выбраться и дойти до Альфа-сити!</b>
                        </p>
                        <ButtonStyled color="red" onClick={() => setPart(prev => prev + 1)}>Далее</ButtonStyled>
                        <Progress />
                    </Content>
                )
            case 1: 
                return (
                    <WhiteStarPart>
                        {
                            user?.isVip ? (
                                <p>
                                    За прохождение уровней и за правильные ответы на вопросы после них{' '}
                                    ты получаешь белые звёзды. Собирай каждую неделю больше <b>15 звёзд</b> и участвуй{' '}
                                    в <b>еженедельном розыгрыше</b>.
                                    {'\n\n'}
                                    Жди каждый понедельник письмо на почту или следи за уведомлениями от <a href={`https://t.me/Alfajourney_bot?start=${user.email}`} target={"_blank"} rel="noreferrer">tg-бота</a>. 
                                </p>
                            ) : (
                                <p>
                                    За прохождение уровней и за правильные ответы на вопросы после них ты получаешь белые{' '}
                                    звёзды.{'\n'}Собери больше <b>60 звёзд</b> и участвуй в розыгрыше.{' '}
                                    В конце всех недель игры мы направим письма на почты победителей, а также пришлём{' '}
                                    список ID счастливчиков в <a href={`https://t.me/Alfajourney_bot?start=${user.email}`} target={"_blank"} rel="noreferrer"><b>tg-бот</b></a>!
                                </p>
                            )
                        }
                        <ButtonsWrapper>
                            <Button color="pink" onClick={() => setPart(prev => prev - 1)}>Назад</Button>
                            <Button color="red" onClick={handleSetRedStarPart}>Далее</Button>
                        </ButtonsWrapper>
                        <Progress />
                    </WhiteStarPart>
                );
            case 2: 
                if (user?.isVip) return (
                    <RedStarPart>
                        <ButtonsWrapper>
                            <Button color="pink" onClick={() => setPart(prev => prev - 1)}>Назад</Button>
                            <Button color="red" onClick={() => setPart(prev => prev + 1)}>Далее</Button>
                        </ButtonsWrapper>
                        <Progress />
                    </RedStarPart>
                ) 

                return LastPart;
            case 3: 
                return LastPart;
            default: break;
        }
    }

    return (
        <Modal isDarken isDisabledAnimation>
            {getContent()}
        </Modal>
    )
}