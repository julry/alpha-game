import styled from "styled-components";
import tree from '../../../assets/images/tree.png';
import { useSizeRatio } from "../../../hooks/useSizeRatio";

const Wrapper = styled.img`
    width: ${({$ratio}) => $ratio * 18}px;
    height: ${({$ratio}) => $ratio * 29}px;
    object-fit: cover;
    margin-left: var(--spacing_x1);
`;

export const TreeIcon = (props) => {
    const ratio = useSizeRatio();

    return <Wrapper  src={tree} alt="" {...props} $ratio={ratio} />
}