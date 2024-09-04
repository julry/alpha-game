import {createContext, useContext, useRef, useState} from 'react'
import {SCREENS, NEXT_SCREENS} from "../constants/screens";
import {screens} from "../constants/screensComponents";
import {getUrlParam} from "../utils/getUrlParam";
import { updateUser } from '../utils/updateUser';

const INITIAL_USER = {
    id: '13526413',
    name: 'Иванов Иван Иванович',
    email: 'ivan2001@mail.ru',
    university: 'НИУ ВШЭ Московский Институт Электроники и Математики',
    isVip: true,
    seenRules: false,
    isTgConnected: false,
    weekStars: [],
    seenWeekInfo: false,
    registerWeek: 1,
};

// const USER = {
//     id: '13526413',
//     name: 'Иванов Иван',
//     email: 'ivan2001@mail.ru',
//     university: 'ННГУ им. Лобачевского',
//     fac: 'Факультет химических технологий, промышленной экологии и биотехнологий',
//     isTarget: true,
//     seenRules: false,
//     isTgConnected: false,
//     weekStars: '1, 2, 3',
//     seenWeekInfo: false,
//     registerWeek: 1,
//     points: 0,
//     weekPoints: 0,
//     targetPoints: 0,
//     passedWeeks: '1, 2, 3',
//     cardsSeen: '1, 2, 3'
// };

const getCurrentWeek = () => {
    const today = new Date();

    if (today < new Date(2024, 8, 16)) return 1;
    if (today < new Date(2024, 8, 23)) return 2;
    if (today < new Date(2024, 8, 30)) return 3;

    return 4;
}

export const CURRENT_WEEK = getCurrentWeek();

const INITIAL_STATE = {
    screen: SCREENS.INTRO,
    points: 0,
    vipPoints: 0,
    weekPoints: 0,
    user: INITIAL_USER,
    passedWeeks: [],
    cardsSeen: [],
}

const ProgressContext = createContext(INITIAL_STATE);

export function ProgressProvider(props) {
    const {children} = props
    const [currentScreen, setCurrentScreen] = useState(getUrlParam('screen') || INITIAL_STATE.screen);
    // points za igru, сюда добавляем набранные общие звезды 
    const [points, setPoints] = useState(INITIAL_STATE.points);
    // points za недели, сюда добавляем набранные красные звезды для випов
    const [vipPoints, setVipPoints] = useState(INITIAL_STATE.vipPoints);
    const [modal, setModal] = useState({visible: false});
    // points za неделю, сюда добавляем набранные белые звезды для випов
    const [weekPoints, setWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [gamePoints, setGamePoints] = useState(0);
    const [cardsSeen, setCardsSeen] = useState(INITIAL_STATE.cardsSeen);
    const [user, setUser] = useState(INITIAL_STATE.user);
    const [passedWeeks, setPassedWeeks] = useState(INITIAL_STATE.passedWeeks);
    const [hasPassedThisTry, setHasPassedThisTry] = useState(false); 
    const screen = screens[currentScreen];
    const $whiteStarRef = useRef();
    const $redStarRef = useRef();

    const next = (customScreen) => {
        const nextScreen = customScreen ?? NEXT_SCREENS[currentScreen]

        if (!nextScreen) {
            return
        }

        setCurrentScreen(nextScreen)
    }

    const setUserInfo = (user) => {
        setUser(prev => ({...prev, ...user}));
    }

    const addGamePoint = () => setGamePoints(prev => prev + 1);

    const endGame = (level, additionalPoints) => {
        const data = {
            passedWeeks: [...passedWeeks, level].join(',')
        };
        
        const isAddWeek = level === CURRENT_WEEK;
        if (user.isVip) {
            if (isAddWeek) data.weekPoints = weekPoints + 10;

            data.targetPoints = vipPoints + additionalPoints;
            setVipPoints(prev => prev = prev + additionalPoints);
        } else {
            data.points = points + 10;
            setPoints(prev => prev + 10);
            setGamePoints(0);
        }

        updateUser(user.recordId, data);
    };

    const state = {
        screen,
        currentScreen,
        points,
        next,
        setUserInfo, 
        user,
        weekPoints,
        addGamePoint,
        setGamePoints,
        gamePoints,
        vipPoints,
        setModal,
        setVipPoints,
        setWeekPoints,
        setPoints,
        modal,
        passedWeeks,
        setPassedWeeks,
        $whiteStarRef,
        $redStarRef,
        hasPassedThisTry,
        setHasPassedThisTry,
        setCardsSeen,
        cardsSeen,
        endGame
    }

    return (
        <ProgressContext.Provider value={state}>
            {children}
        </ProgressContext.Provider>
    )
}

export function useProgress() {
    return useContext(ProgressContext)
}
