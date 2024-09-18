import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { Block } from "../Block";
import { Modal } from "./Modal";
import { Button } from "../Button";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--spacing_x5);
`;

const ButtonStyled = styled(Button)`
    margin: var(--spacing_x4) 0 0;
`;

export const NewWeekModal = () => {
    const { user, setVipPoints, setUserInfo, setModal, updateUser, vipPoints, currentWeek } = useProgress();

    const handleClick = () => {
        if (!user.weekStars.includes(currentWeek)) {
            const data = {
                weekStars: [...user.weekStars, currentWeek].join(','),
                targetPoints: vipPoints + 1,
            };

            setVipPoints(prev => prev + 1);
            setUserInfo({weekStars: [...user.weekStars, currentWeek]});

            updateUser(data);
        }
        if (!user.isTgConnected) setTimeout(() => setModal({visible: true, type: 'tg'}), 0);

        setModal({visible: false});
    }

    return (
        <Modal isDarken isDisabledAnimation>
            <Content>
                <p>
                    Рады видеть тебя снова, вот твоя <b>красная звезда</b> за заход в игру на этой неделе! Продолжай играть, чтобы выигрывать больше призов.
                </p>
                <ButtonStyled color="red" onClick={handleClick}>Забрать звезду</ButtonStyled>
            </Content>
        </Modal>
    )
}