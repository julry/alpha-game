import { motion } from "framer-motion";
import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Star } from "./icons";

const Wrapper = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid var(--color-black);
    border-radius: var(--border-radius-lg);
    width: ${({$ratio}) => $ratio * 149}px;
    height: ${({$ratio}) => $ratio * 239}px;
    background: var(--color-pink);
    cursor: pointer;
    backface-visibility: hidden;
`;

const StarStyled = styled(Star)`
    width: ${({$ratio}) => $ratio * 111}px;
    height: ${({$ratio}) => $ratio * 111}px;
`;


export const StarBackCard = (props) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper {...props} $ratio={ratio}>
            <StarStyled $ratio={ratio}/>
        </Wrapper>
    )
}