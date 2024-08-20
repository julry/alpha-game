import styled from "styled-components";
import { IconButton } from "./Button";
import { Arrow } from "./icons";

const Wrapper = styled.div`
    width: 100%;
    font-size: var(--font_lg);
    font-weight: 700;

    & button + p {
        margin-top: var(--spacing_x5);
    }
`;

export const IntroHeader = ({text, onBack, ...props}) => (
    <Wrapper {...props}>
        <IconButton onClick={onBack} color="green">
            <Arrow />
        </IconButton>
        <p>{text}</p>
    </Wrapper>
)