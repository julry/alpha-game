import { Game } from "../shared/Game";
import { HeaderComponent } from "../shared/HeaderComponent";

export const Game2 = () => (
    <HeaderComponent isGame>
        <Game level={2} customText={'Ура, победа! Тьма Леса Негибкого графика рассеялась благодаря тебе.'} />
    </HeaderComponent>
)