import { useProgress } from "../../../contexts/ProgressContext";
import { Modal } from "./Modal";
import { WhiteStarPart } from "./WhiteStarPart";

export const WhiteStarModalWrapper = (props) => {
    const { modal } = useProgress();
    const { isDarken, isCloseIcon } = modal;

    console.log(modal);
    console.log(isCloseIcon);
    return (
        <Modal isDarken={isDarken}>
            <WhiteStarPart hasCloseIcon={isCloseIcon} onClose={props.onClose}>
                {props.children}
            </WhiteStarPart>
        </Modal>
    )
}