import styled from "styled-components";
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

export const CardRulesModal = (props) => {
    const { modal } = useProgress();
    const {isDisabledAnimation} = modal;

    return (
        <Modal isDarken isDisabledAnimation={isDisabledAnimation}>
            <Content>
                <Text>
                    <b>Звёзды —</b> это твои проводники в мир крутой корпоративной культуры Альфа-Банка.{' '}
                    Часть из них говорят правду, а часть — лгут. Рассортируй карточки по двум категориям. 
                    {'\n\n'}
                    Если на карточке факт про Альфа-Банк, жми на правую кнопку.
                    {'\n'}Если нет — на левую.
                </Text>
                <ButtonStyled color="red" onClick={props.onClose}>Далее</ButtonStyled>
            </Content>
        </Modal>
    )
}