import { Game } from "../shared/Game";
import { HeaderComponent } from "../shared/HeaderComponent";

export const Game1 = () => (
    <HeaderComponent isGame>
        <Game level={1} customText={'Молодец! Все Альфа-звёзды собраны, а тьма Леса Переработок развеяна. Ты доказал, что можешь преодолеть любые препятствия и найти свет даже в самых мрачных местах!'} />
    </HeaderComponent>
)