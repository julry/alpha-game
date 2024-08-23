import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { WhiteStarModalWrapper } from "./WhiteStarModalWrapper";

const Text = styled.p`
    font-size: var(--font_md);
`;

export const WhiteStarModal = (props) => {
    const {user} = useProgress();

    const text = user.isVip ? 
        'Если соберёшь больше 15 звёзд, сможешь принять участие в еженедельном розыгрыше призов!' : 
        'Если соберёшь больше 60 звёзд, сможешь принять участие в розыгрыше призов!'

    return (
        <WhiteStarModalWrapper {...props}>
            <Text>
                <b>Белые звёзды</b> ты получаешь за прохождение уровней на неделе. {text}
            </Text>
        </WhiteStarModalWrapper>
    )
}