import { Game1 } from "../components/screens/Game1";
import { Intro } from "../components/screens/Intro";
import { Login } from "../components/screens/Login";
import { Registration1 } from "../components/screens/Registration1";
import { Registration2 } from "../components/screens/Registration2";
import { Lobby } from "../components/screens/Lobby";
import { PostGame1 } from "../components/screens/PostGame1";
import { Library } from "../components/screens/Library";

import { SCREENS } from "./screens";

import alexL from '../assets/images/alex-left.png';
import alex from '../assets/images/alex.png';
import bag from '../assets/images/bag.png';
import bubble from '../assets/images/bubble.svg';
import cat from '../assets/images/cat.png';
import chair from '../assets/images/chair.png';
import clock from '../assets/images/clock.png';
import close from '../assets/images/close.svg';
import cup from '../assets/images/cup.png';
import arrow from '../assets/images/icon-arrow.svg';
import info from '../assets/images/info.svg';
import lamp from '../assets/images/lamp.png';
import lobbyT from '../assets/images/lobby-top.png';
import lobbyB from '../assets/images/lobby-bot.png';
import laptop from '../assets/images/laptop.png';
import library from '../assets/images/library.svg';
import loginPic from '../assets/images/login-pic.png';
import notebook from '../assets/images/notebook.png';
import pencil from '../assets/images/pencil.png';
import profile from '../assets/images/profile.svg';
import shirt from '../assets/images/shirt.svg';
import snakeD from '../assets/images/snake-down.png';
import snakeUp from '../assets/images/snake-up.png';
import sofa from '../assets/images/sofa.png';
import stone from '../assets/images/stone.png';
import tg from '../assets/images/tg-icon.svg';
import tree1 from '../assets/images/tree1.png';
import tree from '../assets/images/tree.png';
import tree2 from '../assets/images/tree2.png';
import tree3 from '../assets/images/tree3.png';
import tree4 from '../assets/images/tree4.png';

export const screens = {
    [SCREENS.INTRO]: Intro,
    [SCREENS.REG_1]: Registration1,
    [SCREENS.REG_2]: Registration2,
    [SCREENS.LOGIN]: Login,
    [SCREENS.GAME1]: Game1,
    [SCREENS.LOBBY]: Lobby,
    [SCREENS.POST_GAME1]: PostGame1,
    [SCREENS.LIBRARY]: Library
}

export const preloadImages = [
    alexL, alex, bag, bubble, cat, chair, clock, close, cup, arrow, info,
    lamp,  laptop, library, loginPic, notebook, pencil, profile, shirt, snakeUp,
    snakeD, sofa,  stone, tg, tree, tree1, tree2, tree3, tree4, lobbyT, lobbyB
];