import { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { WhiteStarModalWrapper } from "./WhiteStarModalWrapper";

const Text = styled.p`
    font-size: var(--font_md);
`;

export const WhiteStarModal = (props) => (
    <WhiteStarModalWrapper {...props}>
        <Text>
            <b>Белые звёзды</b> ты получаешь за прохождение уровней на неделе. Если соберёшь больше 15 звёзд,{' '}
            сможешь принять участие в еженедельном розыгрыше призов!
        </Text>
    </WhiteStarModalWrapper>
)