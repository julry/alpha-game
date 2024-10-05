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
        setModal({type: 'profile', visible: true});
    }

    return (
        <Modal isDarken>
            <Content>
                <p>
                    <b>Игра подошла к концу!</b>{'\n\n'}
                    Здесь ты можешь посмотреть накопленные баллы и данные профиля.
                    Следи за <b>оповещениями{' '}
                    <a href={`https://t.me/sbercryptography_bot?start=email_${btoa(user.email)}`} rel="noreferrer" target="_blank">в боте</a></b>,{' '} 
                    чтобы не упустить результаты розыгрыша.
                </p>
                <ButtonStyled color="red" onClick={handleClick}>Посмотреть прогресс</ButtonStyled>
            </Content>
        </Modal>
    )
}