import {forwardRef} from "react";
import styled from 'styled-components';
import {motion, useTransform} from "framer-motion";
import {useSizeRatio} from "../../../hooks/useSizeRatio";
import {Image} from "../Image";

const ImageStyled = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({$ratio, width}) => $ratio * width}px;
    height: ${({$ratio, height}) => $ratio * height}px;
`;

const SubjectComponent = ({subject, subjectPosition, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();
    const x = useTransform(subjectPosition, prev => `${prev[subject?.id]?.[0]}px`);
    const y = useTransform(subjectPosition, prev => `${prev[subject?.id]?.[1]}px`);

    if (!subject) {
        return null;
    }

    return (
        <ImageStyled
            {...rest}
            ref={ref}
            src={subject.image}
            height={subject.height}
            width={subject.width}
            $ratio={sizeRatio}
            style={{x, y}}
            exit={{scale: 0.8, opacity: 0}}
            transition={{type: "spring", velocity: 4}}
        />
    );
};

export const Subject = motion(forwardRef(SubjectComponent), {forwardMotionProps: true});