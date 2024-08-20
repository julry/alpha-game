import styled from 'styled-components';
import starImg from '../../../assets/images/starWhite.png';
import { Subject } from './Subject';

const Wrapper = styled(Subject)`
    z-index: 3;
    position: fixed;
`;

export const Star = ({ star, starsPosition, ...props }) => {
    const starObject = {
        image: starImg,
        width: 44,
        height: 47
    }

    return (
        <Wrapper 
            {...props}
            subjectPosition={starsPosition}
            subject={{...star, ...starObject}}
        />
    )
}