import styled from 'styled-components';
import {motion, useMotionValue} from "framer-motion";
import {forwardRef, useEffect} from "react";
import {useSizeRatio} from "../../../hooks/useSizeRatio";
import { Subject } from './Subject';
import { subjects1, subjects2, subjects3 } from '../../../constants/subjects';

export const WIDTH = 1500;
export const HEIGHT = 1334;

const WrapperStyled = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
`;

const BackgroundStyled = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({$ratio}) => $ratio * WIDTH}px;
    height: ${({$ratio}) => $ratio * HEIGHT}px;
    background-color: black;
`;

const SUBJECTS_TO_LEVEL = {
    1: subjects1,
    2: subjects2,
    3: subjects3,
}

const BoardComponent = ({level, imageProps, children, ...rest}, ref) => {
    const sizeRatio = useSizeRatio();

    const subjectPosition = useMotionValue({});

    useEffect(() => {
        subjectPosition.set(SUBJECTS_TO_LEVEL[level].reduce((acc, subject) => {
            return ({
                ...acc,
                [subject.id]: [subject.position[0] * sizeRatio, subject.position[1] * sizeRatio],
            })
        }, {}));
    }, [sizeRatio])

    return (
        <WrapperStyled ref={ref} {...rest}>
            <BackgroundStyled level={level} $ratio={sizeRatio} {...imageProps}>
                {SUBJECTS_TO_LEVEL[level].map(subject => (
                    <Subject key={subject.id} subjectPosition={subjectPosition} subject={subject} $transform={subject.transform}/>
                ))}
                {children}
            </BackgroundStyled>
        </WrapperStyled>
    );
}

export const Board = motion(forwardRef(BoardComponent));