import { Game } from "../shared/Game";
import { HeaderComponent } from "../shared/HeaderComponent";

export const Game4 = () => (
    <HeaderComponent isGame>
        <Game 
            level={4} 
            customText={'Просроченные дедлайны позади. Впереди только чёткий план и уверенность с Альфа-Банком!'} 
        />
    </HeaderComponent>
);
