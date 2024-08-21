import styled from "styled-components";
import { useSizeRatio } from "../../hooks/useSizeRatio";
import { Arrow, Profile, TreeIcon } from "./icons";
import { IconButton, BackButton } from "./Button";
import { StarButton } from "./StarButton";
import { useProgress } from "../../contexts/ProgressContext";
import { SCREENS } from "../../constants/screens";
import dialog from '../../assets/images/dialog1.svg';
import dialog2 from '../../assets/images/dialog2.svg';
import close from '../../assets/images/close.svg';
import { useState } from "react";

const Wrapper = styled.div`
    position: absolute;
    top: var(--spacing_x4);
    left: var(--spacing_x4);
    right: var(--spacing_x4);
    display: flex;
    justify-content: space-between;
    z-index: 4;
`;

const IconButtonStyled = styled(IconButton)`
    position: relative;
    border-radius: var(--border-radius-icon);
    flex-shrink: 0;
    opacity: ${({$isHidden}) => $isHidden ? 0 : 1};

    margin-left: var(--spacing_x2);
`;

const Block = styled.div`
    display: flex;
`;

const InfoBlock = styled(Block)`
    ${({$isReversed}) => $isReversed ? 'flex-direction: row-reverse' : ''};
`;

const BackButtonStyled = styled(BackButton)`
    opacity: ${({$isHidden}) => $isHidden ? 0 : 1};
`;


const TipStyled = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    & p {
        font-weight: 400;
        margin-top: ${({$ratio}) => $ratio * 12}px;
        color: var(--color-white-text);
    }
`;

const RulesTipStyled = styled(TipStyled)`
    bottom: calc(0px - var(--spacing_x2) - ${({$ratio}) => $ratio * 70}px);
    left: ${({$ratio}) => $ratio * -95}px;
    height: ${({$ratio}) => $ratio * 78}px;
    background: url(${dialog}) no-repeat 0 center;
    width: ${({$ratio}) => $ratio * 219}px;
    background-size: contain;

    & p {
        text-align: center;
    }
`;

const LibTipStyled = styled(TipStyled)`
    bottom: calc(0px - var(--spacing_x2) - ${({$ratio}) => $ratio * 111}px);
    right: ${({$ratio}) => $ratio * 0}px;
    height: ${({$ratio}) => $ratio * 119}px;
    background: url(${dialog2}) no-repeat 0 center;
    width: ${({$ratio}) => $ratio * 277}px;
    background-size: contain;
`;

const CloseIcon = styled.button`
    position: absolute;
    top: var(--spacing_x4);
    right: var(--spacing_x1);
    background: transparent;
    outline: none;
    border: none;
    width: ${({$ratio}) => $ratio * 16}px;
    height: ${({$ratio}) => $ratio * 16}px;
    background: url(${close}) no-repeat center center;
    background-size: cover;
    cursor: pointer;
`;


const CloseIconStyled = styled(CloseIcon)`
    top: var(--spacing_x4);
    right: var(--spacing_x3);
`;

export const LobbyHeader = ({ isGame, isCards, onClickModalButton, isFirstTime, isNoGames }) => {
    const [isRulesTip, setIsRulesTip] = useState(isFirstTime);
    const [isLibTip, setIsLibTip] = useState(isNoGames);

    const ratio = useSizeRatio();
    const { user, currentScreen, next, $whiteStarRef, $redStarRef } = useProgress();

    const handleClickLib = () => {
        if (currentScreen === SCREENS.LOBBY) {
            next(SCREENS.LIBRARY);

            return;
        }
        
        onClickModalButton({type: 'exit', isDarken: true});
    }

    const handleCloseRulesTip = (e) => {
        e.stopPropagation();
        setIsRulesTip(false);
    }
    
    const handleCloseLibTip = (e) => {
        e.stopPropagation();
        setIsLibTip(false);
    }

    return (
       <>
            <Wrapper>
                {isGame && (
                    <BackButtonStyled $isHidden={isCards} onClick={() => onClickModalButton({type: 'exit', isDarken: true, isLobby: true})}> 
                        <Arrow color="var(--color-green)"/>
                        <TreeIcon />
                    </BackButtonStyled>
                )}
                <Block>
                    <div ref={$whiteStarRef}>
                        <StarButton onClick={() => onClickModalButton({type: 'whiteStar'})} color="white"/>
                    </div>
                    {!isGame && user.isVip && (
                        <div ref={$redStarRef}>
                            <StarButton onClick={() => onClickModalButton({type: 'redStar'})} color="red"/>
                        </div>
                    )}
                </Block>
                <InfoBlock $isReversed={isGame}>
                    <IconButtonStyled icon={{width: 28, height: 28}} onClick={() => onClickModalButton({type: isCards ? 'cardRules' : 'preRules'})}>
                        <svg id="rules" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1.41216" y="1.41216" width="25.1757" height="25.1757" rx="12.5878" stroke="#8FFF00" strokeWidth="1.82432"/>
                            <path d="M14.0997 16.1502L11.9145 16.2254L11.9016 15.8498C11.8652 14.7914 12.073 14.374 13.1915 13.6006L14.3601 12.7912C15.0112 12.3415 15.4892 11.8294 15.4634 11.0783C15.4328 10.1906 14.816 9.64777 13.8258 9.68185C12.8186 9.71651 12.2452 10.437 12.2787 11.4101L12.2957 11.9052L10.1788 11.978L10.1577 11.3634C10.0872 9.31484 11.4406 7.91801 13.7624 7.83812C16.1695 7.75529 17.5781 8.95451 17.6486 11.0031C17.7032 12.5907 16.9638 13.4537 15.5774 14.3902L14.5589 15.0918C14.1757 15.3784 14.082 15.638 14.0973 16.0819L14.0997 16.1502ZM11.8477 20.2442L11.7543 17.5299L14.3492 17.4406L14.4426 20.155L11.8477 20.2442Z" fill="#8FFF00"/>
                        </svg>
                       {
                            isRulesTip && (
                                <RulesTipStyled $ratio={ratio}>
                                    <p>Здесь всегда можно посмотреть правила</p>
                                    <CloseIcon $ratio={ratio} onClick={handleCloseRulesTip}/>
                                </RulesTipStyled>
                            )
                       }
                    </IconButtonStyled>
                   {
                    !isGame && (
                        <IconButtonStyled icon={{width: 23, height: 23}} onClick={() => onClickModalButton({type: 'profile'})}>
                            <Profile id="profile" />
                        </IconButtonStyled>
                    )
                   }
                    <IconButtonStyled 
                        icon={{width: 23, height: 30}} 
                        $isHidden={isCards} 
                        onClick={handleClickLib}
                    >
                        <svg id="library" viewBox="0 0 23 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.875 22.3381V5.08993L19.7686 1.38202V18.6302L1.875 22.3381Z" fill="black" stroke="#8FFF00" strokeWidth="2.25" strokeLinejoin="round"/>
                            <path d="M1.875 22.7138V5.43182L21.665 7.64382V24.9258L1.875 22.7138Z" fill="black" stroke="#8FFF00" strokeWidth="2.25" strokeLinejoin="round"/>
                            <path d="M1.875 23.1212V6.00404L14.2373 11.0297V28.1469L1.875 23.1212Z" fill="black" stroke="#8FFF00" strokeWidth="2.25" strokeLinejoin="round"/>
                        </svg>
                        {
                            isLibTip && (
                                <LibTipStyled $ratio={ratio}>
                                    <p>
                                        Все дела этой недели{'\n'}выполнены. Можешь пока{'\n'}пересмотреть библиотеку
                                        {'\n'}с собранными карточками.
                                    </p>
                                    <CloseIconStyled $ratio={ratio} onClick={handleCloseLibTip}/>
                                </LibTipStyled>
                            )
                       }
                    </IconButtonStyled>
                </InfoBlock>
            </Wrapper>
       </>
    )
}