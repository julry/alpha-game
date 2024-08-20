import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Block } from "../Block";
import { Profile } from "../icons";
import { Modal } from "./Modal";

const Content = styled(Block)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: var(--spacing_x5);
`;

const Subtitle = styled.h4`
    font-size: var(--font_md);
    margin-bottom: calc(var(--spacing_x1) / 2);
`;

const Text = styled.p`
    font-size: var(--font_sm);
`;

const InfoBlock = styled.div`
    margin-top: var(--spacing_x7);
`

const IdBlock = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileIcon = styled(Profile)`
    width: ${({$ratio}) => $ratio * 38}px;
    height: ${({$ratio}) => $ratio * 38}px;
    margin-right: var(--spacing_x2);
`;

export const ProfileModal = (props) => {
    const ratio = useSizeRatio();
    const { user } = useProgress();

    return (
        <Modal>
            <Content onClose={props.onClose} hasCloseIcon>
                <IdBlock>
                    <ProfileIcon $ratio={ratio} color={'var(--color-black)'}/>
                    <div>
                        <Subtitle>ID</Subtitle>
                        <Text>{user.id}</Text>
                    </div>
                </IdBlock>
                <InfoBlock>
                    <Subtitle>ФИО</Subtitle>
                    <Text>{user.name}</Text>
                </InfoBlock>
                <InfoBlock>
                    <Subtitle>Почта</Subtitle>
                    <Text>{user.email}</Text>
                </InfoBlock>
                <InfoBlock>
                    <Subtitle>Факультет</Subtitle>
                    <Text>{user.university}</Text>
                </InfoBlock>
            </Content>
        </Modal>
    )
}