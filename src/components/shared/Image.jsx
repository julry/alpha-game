import styled from "styled-components";
import {motion} from "framer-motion";
import {forwardRef} from "react";

const ImageStyled = styled(motion.img)`
    object-fit: contain;
    pointer-events: none;
    touch-action: none;
    user-select: none;
    -webkit-user-drag: none;
`;

const ImageComponent = ({src, className, ...rest}, ref) => <ImageStyled ref={ref} className={className} src={src} {...rest} />

export const Image = motion(forwardRef(ImageComponent));
