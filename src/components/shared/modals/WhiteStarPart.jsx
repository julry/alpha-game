
import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { StarButton } from "../StarButton";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ButtonWrapper = styled.div`
    position: absolute;
    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;
`;

export const WhiteStarPart = (props) => {
    const {$whiteStarRef, modal} = useProgress();
    const [starCoor, setStarCoor] = useState({x: 0, y: 0});

    useLayoutEffect(() => {
        const contentComponent = document.getElementById('content');
        const contentX = contentComponent.getBoundingClientRect()?.x;
        const contentY = contentComponent.getBoundingClientRect()?.y;

        const y = $whiteStarRef?.current?.getBoundingClientRect?.()?.y - (contentY > 0 ? contentY + 2 : 0);
        const x = $whiteStarRef?.current?.getBoundingClientRect?.()?.x - (contentX > 0 ? contentX + 2 : 0);

        setStarCoor({x, y});
    }, [$whiteStarRef]);

    return (
        <>
            <ButtonWrapper 
                top={starCoor.y}
                left={starCoor.x}
            >
                <StarButton color="white" />
            </ButtonWrapper>
            <Content onClose={props.onClose} hasCloseIcon={modal.isCloseIcon}>
                {props.children}
            </Content>
        </>
    )
}