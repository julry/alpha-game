import { WhiteStarModal, ProfileModal, RedStarModal, ExitModal, WinModal, InfoModal, RefreshStarsModal } from "../components/shared/modals";
import { CardRulesModal } from "../components/shared/modals/CardRulesModal";

export const getModalByType = (type, props) => {
    let Component;

    switch(type) {
        case 'profile':
            Component = ProfileModal;
            break;
        case 'whiteStar':
            Component = WhiteStarModal;
            break;
        case 'redStar':
            Component = RedStarModal;
            break;  
        case 'exit':
            Component = ExitModal;
            break;
        case 'win':
            Component = WinModal;
            break;
        case 'cardRules':
            Component = CardRulesModal;
            break;
        case 'info':
            Component = InfoModal;
            break;
        case 'refreshStars':
            Component = RefreshStarsModal;
            break;
        
        default:
            return;
    }

    return <Component {...props} />
} 