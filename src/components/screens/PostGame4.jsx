import { SCREENS } from "../../constants/screens";
import { PostGame } from "../shared/PostGame";

export const PostGame4 = () => (
    <PostGame
        level={4}
        nextScreen={SCREENS.FINISH}
        finishText={'В Альфа-Банке ты сможешь работать по своим правилам, учиться новому, получать поддержку коллег и регулярно продвигаться по карьерной лестнице.'} 
    />
);