import { Game1 } from "../components/screens/Game1";
import { Intro } from "../components/screens/Intro";
import { Login } from "../components/screens/Login";
import { Registration1 } from "../components/screens/Registration1";
import { Registration2 } from "../components/screens/Registration2";
import { Lobby } from "../components/screens/Lobby";
import { PostGame1 } from "../components/screens/PostGame1";
import { Library } from "../components/screens/Library";
import { Game2 } from "../components/screens/Game2";
import { PostGame2 } from "../components/screens/PostGame2";
import { Game3 } from "../components/screens/Game3";
import { PostGame3 } from "../components/screens/PostGame3";
import { Game4 } from "../components/screens/Game4";
import { PostGame4 } from "../components/screens/PostGame4";
import { Finish } from "../components/screens/Finish";

import { SCREENS } from "./screens";

import alexL from '../assets/images/alex-left.png';
import alex from '../assets/images/alex.png';
import bag from '../assets/images/bag.png';
import bubble from '../assets/images/bubble.png';
import cat from '../assets/images/cat.png';
import chair from '../assets/images/chair.png';
import clock from '../assets/images/clock.png';
import close from '../assets/images/close.svg';
import cup from '../assets/images/cup.png';
import dialog from '../assets/images/dialog.svg';
import dialog1 from '../assets/images/dialog1.svg';
import dialog2 from '../assets/images/dialog2.svg';
import dialog3 from '../assets/images/dialog3.svg';
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
import shirt from '../assets/images/shirt.png';
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
import text from '../assets/images/text1.svg';
import text2 from '../assets/images/text2.svg';
import text3 from '../assets/images/text3.svg';
import text4 from '../assets/images/text4.svg';
import text5 from '../assets/images/text5.svg';
import text6 from '../assets/images/text6.svg';
import text7 from '../assets/images/text7.svg';
import text8 from '../assets/images/text8.svg';
import text9 from '../assets/images/text9.svg';
import text10 from '../assets/images/text10.svg';

export const screens = {
    [SCREENS.INTRO]: Intro,
    [SCREENS.REG_1]: Registration1,
    [SCREENS.REG_2]: Registration2,
    [SCREENS.LOGIN]: Login,
    [SCREENS.GAME1]: Game1,
    [SCREENS.LOBBY]: Lobby,
    [SCREENS.POST_GAME1]: PostGame1,
    [SCREENS.LIBRARY]: Library,
    [SCREENS.GAME2]: Game2,
    [SCREENS.POST_GAME2]: PostGame2,
    [SCREENS.GAME3]: Game3,
    [SCREENS.POST_GAME3]: PostGame3,
    [SCREENS.GAME4]: Game4,
    [SCREENS.POST_GAME4]: PostGame4,
    [SCREENS.FINISH]: Finish
};

export const preloadImages = [
    alexL, alex, bag, bubble, cat, chair, clock, close, cup, arrow, info,
    lamp,  laptop, library, loginPic, notebook, pencil, profile, shirt, snakeUp,
    snakeD, sofa,  stone, tg, tree, tree1, tree2, tree3, tree4, lobbyT, lobbyB,
    dialog, dialog1, dialog2, dialog3, text, text2, text3, text4, text5, text6,
    text7, text8, text9, text10,
];
