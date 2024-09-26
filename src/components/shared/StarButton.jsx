import styled from "styled-components";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { IconButton } from "./Button";
import { Star } from "./icons";

const StarWrapper = styled(IconButton)`
    border-radius: var(--border-radius-icon);
    margin-left: var(--spacing_x2);
    min-width: ${({$ratio}) => $ratio * 71}px;
    width: auto !important;
    padding-right: ${({$ratio}) => $ratio * 7}px;
    padding-left: ${({$ratio}) => $ratio * 7}px;
    flex-shrink: 0;

    p {
        margin-top: calc(var(--spacing_x1) - 1px);
        font-size: calc(var(--font_lg) - 1px);
    }

    & svg {
        flex-shrink: 0;
        width: ${({$ratio}) => $ratio * 29}px;
        height: ${({$ratio}) => $ratio * 29}px;
        margin-right: calc(var(--spacing_x2) - 1px);
}
`;


export const StarButton = ({color, text, ...props}) => {
    const ratio = useSizeRatio();
    const { user, points, weekPoints, gamePoints, vipPoints } = useProgress();

    const getAmount = () => {
        if (user.isVip) {
            if (color === 'white') return `${weekPoints + gamePoints}/20`;
            else return `${vipPoints}/18`;
        }
        return `${points + gamePoints}/81`;
    }

    return (
        <StarWrapper {...props} $ratio={ratio}>
            <Star color={`var(--color-${color})`} />
            <p>{text ?? getAmount()}</p>
        </StarWrapper>
    )
}