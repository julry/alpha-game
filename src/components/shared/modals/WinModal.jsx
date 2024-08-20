import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Button } from "../Button";
import { StarButton } from "../StarButton";
import { WhiteStarModalWrapper } from "./WhiteStarModalWrapper";

const Text = styled.p`
    font-size: var(--font_md);
`;

const ButtonStyled = styled(Button)`
    margin-top: var(--spacing_x4);
`;

const StarButtonStyled = styled(StarButton)`
    position: absolute;
    top: calc(0px - var(--spacing_x4) - var(--spacing_x8) - var(--spacing_x1));
    left: 50%;
    transform: translateX(-50%);
`;

export const WinModal = (props) => {
    const { modal, setVipPoints, next, user } = useProgress();
    const { additionalPoints, customText } = modal;

    const getSnakeText = () => {
        switch (additionalPoints) {
            case 3: 
                return (
                    <Text>
                        Ты ни разу не попался змейке, поэтому получаешь <b>3 красные звезды!</b>
                    </Text>
                )
            case 2: 
                return (
                    <Text>
                        Ты один раз попался змейке, поэтому получаешь <b>2 красные звезды!</b>
                    </Text>
                )
            case 1: 
                return (
                    <Text>
                        Ты два раза попался змейке, поэтому получаешь <b>1 красную звезду!</b>
                    </Text>
                )
            default: 
                return (
                    <Text>
                        Ой! Ты попался змейке больше двух раз, поэтому на этой неделе не получаешь дополнительные звёзды.
                    </Text>
                )
        }
    };

    const handleClick = () => {
        if (user.isVip) setVipPoints(prev => prev + additionalPoints);
        next();
        props.onClose();
    }

    return (
        <WhiteStarModalWrapper {...props}>
            {user.isVip && additionalPoints > 0 && <StarButtonStyled color="red" text={`+${additionalPoints}`}/>}
            <Text>
                {customText}
            </Text>
            <br/>
            {user.isVip && getSnakeText()}
            {user.isVip && <br/>}
            <Text>
                Давай посмотрим, что находится на звёздах.
            </Text>
            <ButtonStyled color="red" onClick={handleClick}>Посмотреть</ButtonStyled>
        </WhiteStarModalWrapper>
    )
}