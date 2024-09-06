import { CURRENT_WEEK } from "../contexts/ProgressContext";

export const getUserInfo = async (email) => {
    let userInfo = {};
    let passedWeeks = [];
    let cardsSeen = [];
    let points = 0;
    let weekPoints = 0;
    let vipPoints = 0;

    try {
        // const record = await ftClient.finddata({ email });
        // const {data, uuid} = record;
        const uuid = 12313132;
        const data = {
            id: '13526413',
            name: 'Иванов Иван',
            email: 'ivan2001@mail.ru',
            university: 'ННГУ им. Лобачевского',
            fac: 'Факультет химических технологий, промышленной экологии и биотехнологий',
            isTarget: true,
            seenRules: false,
            isTgConnected: false,
            weekStars: '',
            seenWeekInfo: false,
            registerWeek: 1,
            points: 0,
            weekPoints: 0,
            targetPoints: 0,
            passedWeeks: '',
            cardsSeen: ''
        };

        userInfo = {
            recordId: uuid,
            id: data.id,
            name: data.name,
            email,
            university: data.university,
            fac: data.fac,
            isVip: data.isTarget,
            seenRules: data.seenRules,
            isTgConnected: data.isTgConnected,
            weekStars: data.weekStars.length > 0 ? data.weekStars.replace(' ', '').split(',').map((l) => +l.trim()) : [],
            seenWeekInfo:  data.seenWeekInfo,
            registerWeek: data.registerWeek,
        };

        passedWeeks = data.passedWeeks.length > 0 ? data.passedWeeks.replace(' ', '').split(',').map((l) => +l.trim()) : [];
        cardsSeen = data.cardsSeen.length > 0 ? data.cardsSeen.replace(' ', '').split(',').map((l) => +l.trim()) : [];
        points = data.points ?? 0;
        weekPoints = data[`week${CURRENT_WEEK}Points`] ?? data.weekPoints ?? 0;
        vipPoints = data.targetPoints ?? 0;

        return { userInfo, passedWeeks, cardsSeen, points, weekPoints, vipPoints };
    }
    catch (e) {
        return { isError: true };
    }
}