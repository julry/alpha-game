import styled from "styled-components";
import { SCREENS } from "../../../constants/screens";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Button } from "../Button";
import { Modal } from "./Modal";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--spacing_x5);
`;
const Text = styled.p`
    font-size: var(--font_md);
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
`;

export const RefreshStarsModal = () => {
    const { next, setModal } = useProgress();

    const handleClose = () => {
        setModal({visible: false});
        next(SCREENS.LIBRARY);
    }

    return (
        <Modal isDarken isDisabledAnimation>
            <Content>
                <Text>
                    Ты успешно завершил прошлую неделю, белые звёзды обнулились, так как розыгрыш уже прошёл.{'\n\n'}
                    Продолжай играть, чтобы участвовать в розыгрыше текущей недели!
                </Text>
                <ButtonStyled color="red" onClick={handleClose}>Далее</ButtonStyled>
            </Content>
        </Modal>
    )
}