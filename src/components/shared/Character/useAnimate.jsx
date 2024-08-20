import {useCallback, useEffect, useState} from "react";
import characterLeft from '../../../assets/images/alex-left.png';
import characterRight from '../../../assets/images/alex.png';
import throttle from "lodash/throttle";

export const RIGHT_INDEX = 1;
export const LEFT_INDEX = RIGHT_INDEX - 1;

const INDEX_TO_CHARACTER = {
   [RIGHT_INDEX]: characterRight,
   [LEFT_INDEX]: characterLeft,
};

export function useAnimate(direction) {
    const [index, setIndex] = useState(RIGHT_INDEX);
    const source = INDEX_TO_CHARACTER[index];

    const animate = useCallback(
        throttle((direction) => {
            if (direction >= 0) {
                setIndex(RIGHT_INDEX);
                return;
            }

            if (direction < 0) {
                setIndex(LEFT_INDEX);
                return;
            }
        }, 90),
        [],
    );

    useEffect(() => {
        animate(direction);

        const timer = setTimeout(() => animate(direction), 90);

        return () => clearTimeout(timer);
    }, [index, direction]);

    return source;
}