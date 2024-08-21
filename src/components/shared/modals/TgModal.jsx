import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";

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

export const TgModal = (props) => {
    const { user, setVipPoints, setPoints, modal, setModal, setUserInfo } = useProgress();

    const handleClick = () => {
        if (!user.isTgConnected) {
            if (user.isVip) setVipPoints(prev => prev + 1);
            else setPoints(prev => prev + 1);
            setUserInfo({isTgConnected: true});
        }
        setModal({visible: false});
    }

    return (
        <Modal isDarken isDisabledAnimation={modal.isDisabledAnimation}>
            <Content hasCloseIcon onClose={() => setModal({visible: false})}>
                <p>
                    У нас есть полезный <b>tg-канал</b> про карьерные возможности.{'\n'}
                    Переходи в <b>бот</b>, чтобы получить ссылку, и заработай ещё одну{' '}
                    <b>красную звезду</b> — так ты будешь на шаг ближе к главному призу.
                </p>
                <ButtonStyled color="red" onClick={handleClick}>Перейти</ButtonStyled>
            </Content>
        </Modal>
    )
}