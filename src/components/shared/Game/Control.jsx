import {forwardRef, useRef} from "react";
import styled from 'styled-components';
import {motion} from "framer-motion";
import {useSizeRatio} from "../../../hooks/useSizeRatio";
import {mergeRefs} from "../../../utils/mergeRefs";

const WrapperStyled = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 70}px;
    height: ${({$ratio}) => $ratio * 70}px;
    background-color: transparent;
    border: ${({$ratio}) => $ratio * 3.5}px solid var(--color-green);
    border-radius: 50%;
    z-index: 80;
`;

const InnerStyled = styled(motion.div)`
    width: ${({$ratio}) => $ratio * 37}px;
    height: ${({$ratio}) => $ratio * 37}px;
    border-radius: 50%;
    background-color: var(--color-white);
`;

const ControlComponent = ({stickProps, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();
    const wrapperRef = useRef();

    return (
        <WrapperStyled ref={mergeRefs(ref, wrapperRef)} $ratio={sizeRatio} {...rest}>
            <InnerStyled
                drag
                dragConstraints={wrapperRef}
                dragSnapToOrigin
                dragElastic={0.1}
                dragTransition={{bounceStiffness: 500}}
                $ratio={sizeRatio}
                {...stickProps}
            />
        </WrapperStyled>
    );
}

export const Control = motion(forwardRef(ControlComponent), { forwardMotionProps: true });