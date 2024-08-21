import styled from "styled-components"
import { useProgress } from "../../contexts/ProgressContext";
import { getModalByType } from "../../utils/getModalByType";
import { LobbyHeader } from "./LobbyHeader";

const Content = styled.div`
    width: 100%;
    height: 100%;
    ${({$isBlurred}) => $isBlurred ? 'filter: blur(3px)' : ''};
`;

export const HeaderComponent = ({children, isGame, isCards, isFirstTime, isNoGames}) => {
    const { modal, setModal,  } = useProgress();

    const handleCloseModal = () => {
        setModal({visible: false});
    }

    return (
        <>
            <Content $isBlurred={modal.visible}>
                <LobbyHeader 
                    onClickModalButton={(args) => setModal({visible: true, isCloseIcon: true, ...args})} 
                    isGame={isGame} 
                    isCards={isCards}
                    isFirstTime={isFirstTime}
                    isNoGames={isNoGames}
                />
                {children}
            </Content>
            {modal.visible && getModalByType(modal.type, {onClose: handleCloseModal})}
        </>
    )
}