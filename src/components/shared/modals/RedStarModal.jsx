import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { StarButton } from "../StarButton";
import { Modal } from "./Modal";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Text = styled.p`
    font-size: var(--font_md);
`;

const ButtonWrapper = styled.div`
    position: absolute;
    top: ${({ top }) => top}px;
    left: ${({ left }) => left}px;
`;

export const RedStarModal = (props) => {
    const { $redStarRef } = useProgress();
    const [starCoor, setStarCoor] = useState({x: 0, y: 0});

    useLayoutEffect(() => {
        const contentComponent = document.getElementById('content');
        const contentX = contentComponent.getBoundingClientRect()?.x;
        const contentY = contentComponent.getBoundingClientRect()?.y;

        const y = $redStarRef?.current?.getBoundingClientRect?.()?.y - (contentY > 0 ? contentY + 2 : 0);
        const x = $redStarRef?.current?.getBoundingClientRect?.()?.x - (contentX > 0 ? contentX + 2 : 0);

        setStarCoor({x, y});
    }, [$redStarRef]);


    return (
        <Modal>
            <ButtonWrapper 
                top={starCoor.y}
                left={starCoor.x}
            >
                <StarButton color="red" />
            </ButtonWrapper>
            <Content onClose={props.onClose} hasCloseIcon>
                <Text>
                    <b>Красные звезды</b> помогают выиграть главный приз!{'\n'}Ты можешь их получить за прохождение уровня с 1–3 попытки, за верные ответы на карточки-звёзды, за подписку на tg-канал и за вход в игру на каждой неделе. Также здесь суммируются твои результаты за игру.
                </Text>
            </Content>
        </Modal>
    )
}