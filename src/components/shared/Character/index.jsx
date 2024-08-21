import {forwardRef} from "react";
import styled from "styled-components";
import {motion} from "framer-motion"
import {useSizeRatio} from "../../../hooks/useSizeRatio";
import {useAnimate} from "./useAnimate";
import {Image} from "../Image";

export const CHARACTER_SIZE = [107, 131];

const WrapperStyled = styled(motion.div)`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${({$ratio}) => $ratio * CHARACTER_SIZE[0]}px;
    height: ${({$ratio}) => $ratio * CHARACTER_SIZE[1]}px;

    border-radius: 50%;
    z-index: 2;
`;

const ImageStyled = styled(Image)`
    z-index: 3;
    width: ${({$ratio}) => $ratio * CHARACTER_SIZE[0]}px;
    height: ${({$ratio}) => $ratio * CHARACTER_SIZE[1]}px;
`;

const Darken = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 1330px;
    height: 1550px;
    z-index: 2;
    background: radial-gradient(circle, rgba(167,255,65, 1) 0, rgba(167,255,65, 0.5) ${({$ratio}) => $ratio * 40}px,rgba(0,0,0, 0.85) ${({$ratio, $collectedStars}) => $ratio * (130 + $collectedStars * 30)}px);
`;

function CharacterComponent({direction, children, collectedStars, ...rest}, ref) {
    const sizeRatio = useSizeRatio();
    const source = useAnimate(direction);

    return (
        <WrapperStyled ref={ref} $ratio={sizeRatio} {...rest}>
            <ImageStyled src={source} $ratio={sizeRatio}/>
                {/* {children} */}
            {/* <DarkenStyled $ratio={sizeRatio} $collectedStars={collectedStars}/> */}
        </WrapperStyled>
    );
}

export const Character = motion(forwardRef(CharacterComponent), { forwardMotionProps: true });
