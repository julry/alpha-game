import { cardsLevel1 } from "../../constants/cards";
import { PostGame } from "../shared/PostGame";

export const PostGame1 = () => (
    <PostGame
        cards={cardsLevel1} 
        finishText={'В Альфа-Банке ты можешь работать удалённо из любого удобного места, а также гибко начинать рабочий день.'} 
    />
);