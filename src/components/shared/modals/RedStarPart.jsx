
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

export const RedStarPart = (props) => {
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
        <>
            <ButtonWrapper 
                top={starCoor.y}
                left={starCoor.x}
            >
                <StarButton color="red" />
            </ButtonWrapper>
            <Content>
                <p>
                    Для того, чтобы выиграть супер-приз — iPhone 16 Pro Max, копи красные звезды.{' '}
                    Они даются за еженедельный заход в игру и другие действия.{'\n\n'}
                    Держи первую <b>красную звезду</b> за регистрацию! Не забывай заходить каждую неделю,{' '}
                    чтобы получать дополнительную красную звезду.{'\n\n'}
                    Итоги подведём в конце всех недель. А забрать призы ты сможешь до 10 октября.
                </p>
                {props.children}
            </Content>
        </>
    )
}