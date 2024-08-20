import styled from 'styled-components';
import snakeImg from '../../../assets/images/snake-up.png';
import { Subject } from './Subject';

const Wrapper = styled(Subject)`
    z-index: 3;
    position: fixed;
`;

export const SNAKE_SIZE_BY_LEVEL = {
    1: [95, 81],
    2: [95, 81],
    3: [113, 97],
    4: [113, 97],
}

export const Snake = ({ snake, level, snakesPosition, ...props }) => {
    const snakeObject = {
        image: snakeImg,
        width: SNAKE_SIZE_BY_LEVEL[level][0],
        height:  SNAKE_SIZE_BY_LEVEL[level][1]
    }

    return (
        <Wrapper 
            {...props}
            subjectPosition={snakesPosition}
            subject={{...snake, ...snakeObject}}
        />
    )
}