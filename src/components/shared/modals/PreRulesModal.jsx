import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
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
    width: 100%;
    text-align: center;
    font-size: var(--font_md);
`;

const ButtonWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: var(--spacing_x4);
    justify-content: space-between;

    & button {
        width: calc((100% - ${({$ratio}) => $ratio * 10}px) / 2);
    }
`;

export const PreRulesModal = () => {
    const ratio = useSizeRatio();
    const { setModal } = useProgress();

    return (
        <Modal isDarken>
            <Content hasCloseIcon onClose={() => setModal({visible: false})}>
                <Text>Про что хочешь узнать?</Text>
                <ButtonWrapper $ratio={ratio}>
                    <Button color="pink" onClick={() => setModal({type: 'movement', visible: true})}>Управление</Button>
                    <Button color="red" onClick={() => setModal({type: 'prizes', visible: true})}>Призы</Button>
                </ButtonWrapper>
            </Content>
        </Modal>
    )
}