import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x5) 0 0;
`;

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--spacing_x5);
    text-align: center;
`;

export const EndGameModal = () => {
    const { user, setModal } = useProgress();

    const handleClick = () => {
        setModal({visible: false});
    }

    return (
        <Modal isDarken>
            <Content hasCloseIcon onClose={handleClick}>
                <p>
                    Игра подошла к концу!{'\n\n'}
                    Здесь ты можешь посмотреть накопленные баллы и данные профиля.
                    Следи за <b>оповещениями{' '}
                    <a href={`https://t.me/sbercryptography_bot?start=email_${btoa(user.email)}`} rel="noreferrer" target="_blank">в боте</a></b>,{' '} 
                    чтобы не упустить результаты розыгрыша.{'\n\n'}
                    Следи за карьерными возможностями и мероприятиями Альфа-Банка в ТГ-канале:
                </p>
                <ButtonStyled color="red" onClick={() => window.open('https://t.me/alfastudents/1100', '_blank')}>Перейти</ButtonStyled>
            </Content>
        </Modal>
    )
}