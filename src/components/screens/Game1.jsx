import { Game } from "../shared/Game";
import { HeaderComponent } from "../shared/HeaderComponent";

export const Game1 = () => (
    <HeaderComponent isGame>
        <Game level={1} />
    </HeaderComponent>
)