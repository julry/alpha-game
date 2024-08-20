import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { StarButton } from "../StarButton";
import { Modal } from "./Modal";
import { WhiteStarPart } from "./WhiteStarPart";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ButtonWrapper = styled.div`
    position: absolute;
    top: ${({ $top }) => $top}px;
    left: ${({ $left }) => $left}px;
`;

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