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

const ListWrapper = styled.div`
    margin-top: var(--spacing_x2);
    padding-left: var(--spacing_x3);
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
                    <b>Красные звёзды</b> помогают выиграть главный приз. Ты можешь получить их за:
                </Text>
                <ListWrapper>
                    <ul>
                        <li>прохождение уровня с 1–3 попытки — от 3 до 1 звезды. Чем меньше попыток, тем больше звёзд</li>
                        <li>подписку на tg-канал — 1 звезда</li>    
                        <li>вход в игру на каждой неделе после появления нового уровня — 1 звезда</li>     
                        <li>за приглашение трёх или более студентов своего факультета — 1 звезда</li>     
                    </ul>
                </ListWrapper>
            </Content>
        </Modal>
    )
}