import { FTClient } from 'ft-client';
import {createContext, useEffect, useContext, useRef, useState} from 'react'
import {SCREENS, NEXT_SCREENS} from "../constants/screens";
import {screens} from "../constants/screensComponents";
import {getUrlParam} from "../utils/getUrlParam";

const INITIAL_USER = {
    id: '',
    name: '',
    email: '',
    university: '',
    isVip: true,
    seenRules: false,
    isTgConnected: false,
    weekStars: [],
    seenWeekInfo: false,
    registerWeek: 1,
    week1Points: 0,
    week2Points: 0,
    week3Points: 0,
    week4Points: 0,
};

const getCurrentWeek = () => {
    const today = new Date();

    if (today < new Date(2024, 8, 23)) return 1;
    if (today < new Date(2024, 8, 30)) return 2;
    if (today < new Date(2024, 9, 7)) return 3;

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

const API_LINK = 'https://ft-admin-api.sjuksin.ru/';

export function ProgressProvider(props) {
    const {children} = props
    const [currentScreen, setCurrentScreen] = useState(getUrlParam('screen') || INITIAL_STATE.screen);
    const [points, setPoints] = useState(INITIAL_STATE.points);
    const [vipPoints, setVipPoints] = useState(INITIAL_STATE.vipPoints);
    const [modal, setModal] = useState({visible: false});
    const [weekPoints, setWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [currentWeekPoints, setCurrentWeekPoints] = useState(INITIAL_STATE.weekPoints);
    const [gamePoints, setGamePoints] = useState(0);
    const [cardsSeen, setCardsSeen] = useState(INITIAL_STATE.cardsSeen);
    const [user, setUser] = useState(INITIAL_STATE.user);
    const [passedWeeks, setPassedWeeks] = useState(INITIAL_STATE.passedWeeks);
    const [hasPassedThisTry, setHasPassedThisTry] = useState(false); 
    const [currentWeek, setCurrentWeek] = useState(CURRENT_WEEK);
    const screen = screens[currentScreen];
    const $whiteStarRef = useRef();
    const $redStarRef = useRef();
    const client = useRef();

    const getDbCurrentWeek = async () => {
        const { week } = await client.current.loadProjectState();
        if (week && !isNaN(+week)) {
            setCurrentWeek(+week);
        }
    }

    useEffect(() => {
        client.current = new FTClient(
            API_LINK,
            'alfa'
        )
        try {
            getDbCurrentWeek();
        } catch (e) {
            console.log(e);
        }
    }, []);

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
        
        const isAddWeek = level === currentWeek;

        if (user.isVip) {
            if (isAddWeek) {
                data[`week${currentWeek}Points`] = weekPoints + 10;
                setCurrentWeekPoints(prev => prev + 10);
            }

            setWeekPoints(prev => prev + 10);
            data.targetPoints = vipPoints + additionalPoints;
            setVipPoints(prev => prev = prev + additionalPoints);
        } else {
            data.points = points + 10;
            setPoints(prev => prev + 10);
        }

        setGamePoints(0);
        updateUser(data);
    };

    const updateUser = async (changed) => {
        const { 
            isVip, recordId, weekStars, id, name, email, registerWeek,
            university, isTgConnected, seenRules, week1Points, week2Points, week3Points, week4Points,
        } = user;

        const data = {
            id,
            name,
            email,
            university,
            isTarget: isVip,
            isTgConnected: isTgConnected,
            weekStars: weekStars.join(','),
            points,
            targetPoints: vipPoints,
            week1Points, 
            week2Points, 
            week3Points, 
            week4Points,
            [`week${currentWeek}Points`]: currentWeekPoints,
            seenRules, 
            registerWeek,
            passedWeeks: passedWeeks.join(','),
            cardsSeen: cardsSeen.join(','),
            ...changed,
        };

        if (!recordId) return {...data, isEror: true};

        try {
            const result = await client.current.updateRecord(recordId, data);

            return result;
        } catch (e) {
            console.log(e);

            return {...data, isEror: true};
        }
    }

    const registrateUser = async ({id, name, email}) => {
        const data = {
            id,
            name,
            email,
            university: user.university,
            isTarget: user.isVip,
            points: 0,
            [`week${currentWeek}Points`]: 0,
            targetPoints: 0,
            isTgConnected: false,
            seenRules: false,
            registerWeek: currentWeek,
            weekStars: '',
            passedWeeks: '',
            cardsSeen: '',
        };

        const userInfo = {
            id,
            name,
            email,
            university: user.university,
            isVip: user.isVip,
            isTgConnected: false,
            seenRules: false,
            registerWeek: currentWeek,
            weekStars: [],
            week1Points: 0,
            week2Points: 0,
            week3Points: 0,
            week4Points: 0,
        };

       try {
            const record = await client?.current.createRecord(data);
            setUser({...userInfo, recordId: record.id});
            setPoints(INITIAL_STATE.points);
            setVipPoints(INITIAL_STATE.vipPoints);
            setWeekPoints(INITIAL_STATE.weekPoints);
            setCurrentWeekPoints(INITIAL_STATE.weekPoints);
            setCardsSeen(INITIAL_STATE.cardsSeen);
            setPassedWeeks(INITIAL_STATE.passedWeeks);
            
            return record; 
       } catch (e) {
            return {isError: true}
       }
    };

    const getUserInfo = async (email, isAfterTg) => {
       try {
            const record = await client?.current.findRecord('email', email);
            if (!record) return {isError: true}; 
            const {data, id} = record;
            let userInfo = {};

            userInfo = {
                recordId: id,
                id: data.id,
                name: data.name,
                email,
                university: data.university,
                fac: data.fac,
                isVip: data.isTarget,
                seenRules: data.seenRules,
                seenInfo: data.seenInfo,
                isTgConnected: data.isTgConnected,
                weekStars: data.weekStars.length > 0 ? data.weekStars.replace(' ', '').split(',').map((l) => +l.trim()) : [],
                registerWeek: data.registerWeek,
                week1Points: data.week1Points, 
                week2Points: data.week2Points,  
                week3Points: data.week3Points, 
                week4Points: data.week4Points, 
            };

            if (isAfterTg) {
                setUser(prev=> ({...prev, isTgConnected: data.isTgConnected}));
                setPoints(data?.points ?? 0);
                setVipPoints(data?.targetPoints ?? 0);

                return;
            }

            setUser(userInfo);
            const passed = data?.passedWeeks?.length > 0 ? data.passedWeeks.replace(' ', '').split(',').map((l) => +l.trim()) : [];
            const cardsSeen = data?.cardsSeen?.length > 0 ? data.cardsSeen.replace(' ', '').split(',').map((l) => +l.trim()) : [];
            setPassedWeeks(passed);
            setCardsSeen(cardsSeen);
            setPoints(data?.points ?? 0);
            setVipPoints(data?.targetPoints ?? 0);
            setWeekPoints(data?.[`week${currentWeek}Points`] ?? 0);
            setCurrentWeekPoints(data?.[`week${currentWeek}Points`] ?? 0);

            return {userInfo, passed};
       } catch (e) {
            console.log(e);
            return {isError: true}
       }
    }

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
        endGame,
        updateUser,
        getUserInfo,
        registrateUser,
        currentWeek,
        currentWeekPoints, 
        setCurrentWeekPoints,
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
