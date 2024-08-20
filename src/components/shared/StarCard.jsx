import { motion } from "framer-motion";
import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";

const Wrapper = styled(motion.div)`
    position: relative;
    overflow: hidden;
    background: var(--color-pink);
    border-radius: ${({$ratio}) => $ratio * 21}px;
    padding-top: ${({$ratio}) => $ratio * 39}px;
    height: ${({$ratio}) => $ratio * 212}px;
    max-width: ${({$ratio}) => $ratio * 342}px;
    width: ${({$ratio}) => $ratio * 342}px;
    min-width: ${({$ratio}) => $ratio * 342}px;
`;

const TextWrapper = styled.div`
    display: flex;
    background: var(--color-red);
    color: var(--color-red-text);
    padding: var(--spacing_x3) ${({$ratio}) => $ratio * 11}px;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    font-size: ${({$ratio}) => $ratio * 29}px;
    font-weight: 900;
    line-height: 95%;
    letter-spacing: -0.06em;
`;

export const StarCard = ({text, ...props}) => {
    const ratio = useSizeRatio();

    return (
        <Wrapper $ratio={ratio} {...props}>
            <TextWrapper $ratio={ratio}>
                {text}
            </TextWrapper>
        </Wrapper>
    )
}