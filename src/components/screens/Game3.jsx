import { Game } from "../shared/Game";
import { HeaderComponent } from "../shared/HeaderComponent";

export const Game3 = () => (
    <HeaderComponent isGame>
        <Game 
            level={3} 
            customText={'Ура! Ты собрал все Альфа-звёзды и победил Лес Токсичной атмосферы. Теперь перед тобой открыты все двери к успеху в Альфа-Банке. Ты показал, что способен справляться с любыми вызовами и всегда находишь выход из сложных ситуаций.'} 
        />
    </HeaderComponent>
);
