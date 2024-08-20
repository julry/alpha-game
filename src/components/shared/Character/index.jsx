import {forwardRef} from "react";
import styled from "styled-components";
import {motion} from "framer-motion"
import {useSizeRatio} from "../../../hooks/useSizeRatio";
import {useAnimate} from "./useAnimate";
import {Image} from "../Image";
import { HEIGHT, WIDTH } from "../Game/Board";

const WrapperStyled = styled(motion.div)`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * 107}px;
    height: ${({$ratio}) => $ratio * 131}px;

    border-radius: 50%;
    z-index: 2;
`;

const ImageStyled = styled(Image)`
    z-index: 3;
    width: ${({$ratio}) => $ratio * 107}px;
    height: ${({$ratio}) => $ratio * 131}px;
`;

const DarkenStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({$ratio}) => $ratio * WIDTH}px;
    height: ${({$ratio}) => $ratio * HEIGHT}px;
    z-index: 2;
    background: radial-gradient(circle, rgba(167,255,65, 1) 0, rgba(167,255,65, 0.5) ${({$ratio}) => $ratio * 40}px,rgba(0,0,0, 0.85) ${({$ratio, $collectedStars}) => $ratio * (130 + $collectedStars * 30)}px);
`;

export const CHARACTER_SIZE = [107, 131];

function CharacterComponent({direction, level, children, collectedStars, ...rest}, ref) {
    const sizeRatio = useSizeRatio();
    const source = useAnimate(direction);

    return (
        <WrapperStyled ref={ref} level={level} $ratio={sizeRatio} {...rest}>
            <ImageStyled src={source} $ratio={sizeRatio}/>
                {children}
            <DarkenStyled $ratio={sizeRatio} $collectedStars={collectedStars}/>
        </WrapperStyled>
    );
}

export const Character = motion(forwardRef(CharacterComponent), { forwardMotionProps: true });
