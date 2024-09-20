import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { useEffect, useState } from "react";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--spacing_x5);
`;

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x4) 0 0;
`;

export const TgModal = () => {
    const { user, modal, setModal, getUserInfo } = useProgress();
    const [checkTg, setCheckTg] = useState(false);

    const handleClick = () => {
        if (checkTg) return;
        window.open(`https://t.me/Alfajourney_bot?start=${user.email}`, '_blank');
    }

    useEffect(() => {
        const handleCheck = () => {
            if (user.isTgConnected || checkTg) return;
            setCheckTg(true);
            setModal({visible: false});

            getUserInfo(user.email, true).finally(() => {
                setCheckTg(false);
            });
        }

        window.addEventListener('focus', handleCheck);

        return () => window.removeEventListener('focus', handleCheck);
    },[]);

    return (
        <Modal isDarken isDisabledAnimation={modal.isDisabledAnimation}>
            <Content hasCloseIcon onClose={() => setModal({visible: false})}>
                <p>
                    У нас есть полезный <b>tg-канал</b> про карьерные возможности.{'\n'}
                    Переходи в <b>бот</b>, чтобы получить ссылку, и заработай ещё одну{' '}
                    <b>{user?.isVip ? 'красную ' : 'белую '}звезду</b> — так ты будешь на шаг ближе к главному призу.
                </p>
                <ButtonStyled color="red" onClick={handleClick} disabled={checkTg}>Перейти</ButtonStyled>
            </Content>
        </Modal>
    )
}