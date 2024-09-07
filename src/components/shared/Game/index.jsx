import {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import useResizeObserver from "use-resize-observer";
import {AnimatePresence, motion, useDragControls, useMotionValue, useAnimationFrame, useTransform} from "framer-motion";
import throttle from "lodash/throttle";
import random from "lodash/random";
import clamp from "lodash/clamp";
import styled, { keyframes } from "styled-components";
import { useSizeRatio } from "../../../hooks/useSizeRatio";
import { Board, WIDTH, HEIGHT} from "./Board";
import { Control } from "./Control";
import {Character, CHARACTER_SIZE} from "../Character";
import { stars1, stars2, stars3 } from "../../../constants/stars";
import { Star } from "./Star";
import { StarBoard } from "./StarBoard";
import { CURRENT_WEEK, useProgress } from "../../../contexts/ProgressContext";
import { snakes1, snakes2, snakes3 } from "../../../constants/snakes";
import { Snake, SNAKE_SIZE_BY_LEVEL } from "./Snake";

const MAX_LIVES = 3;
export const CHARACTER_STEP = 2;

const STARS_BY_LEVEL = {
    1: stars1,
    2: stars2,
    3: stars3,
}

const SNAKES_BY_LEVEL = {
    1: snakes1,
    2: snakes2,
    3: snakes3,
}

const STAR_WIDTH = 44;
const STAR_HEIGHT = 47;

const Wrapper = styled(motion.div)`
    position: relative;
    width: 100%;
    height: 100%;
    touch-action: none;
`;

const CharacterStyled = styled(Character)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;

    img {
        animation: ${({$isImun}) => $isImun ? test : ''} infinite 0.5s backwards;
    }
`;

const test = keyframes`
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0.7;
    }

    100% {
        opacity: 1;
    }
`;

const ControlStyled = styled(Control)`
    position: absolute;
    top: 0;
    left: 0;
`;

const BoardStyled = styled(Board)`
    width: 100%;
    height: 100%;
`;

const Warning = styled.p`
    position: absolute;
    z-index: 14;
    color: var(--color-black-text);
    left: 50%;
    bottom: ${({$ratio}) => $ratio * 107}px;
    transform: translateX(-50%);
    font-weight: 600;
    width: 100%;
    text-align: center;
    pointer-events: none;
`;

const Darken = styled(motion.div)`
    position: absolute;
    width: ${({$ratio}) => $ratio * WIDTH}px;
    height: ${({$ratio}) => $ratio * HEIGHT}px;
    z-index: 2;
    background: radial-gradient(circle, rgba(167,255,65, 1) 0, rgba(167,255,65, 0.5) ${({$ratio}) => $ratio * 40}px,rgba(0,0,0, 0.85) ${({$ratio, $collectedStars}) => $ratio * (130 + $collectedStars * 30)}px);
`;

export function Game({ className, level, isPaused, customText }) {
    const sizeRatio = useSizeRatio();
    const { addGamePoint, setModal, modal, setPassedWeeks, setHasPassedThisTry, endGame } = useProgress();
    const wrapperRef = useRef();
    const [wrapperRect, setWrapperRect] = useState(null);
    const [starsCollected, setStarsCollected] = useState(0);
    const [isImun, setIsImun] = useState(false);
    const [warn, setWarn] = useState(false);
    const [collidedSnakesAmount, setCollidedSnakesAmount] = useState(0);
    const [direction, setDirection] = useState([0, 0]);
    const [stars, setStars] = useState(STARS_BY_LEVEL[level]);
    const snakesDirection = useMotionValue(SNAKES_BY_LEVEL[level].reduce((acc, task) => {
        let x = random(-1, 1, true);
        let y = random(-1, 1, true);

        if (x >= 0 && x < 0.4) x = x + 0.4;
        if (x < 0 && x > -0.4) x = x - 0.4;

        if (y >= 0 && y < 0.4) y = y + 0.4;
        if (y < 0 && y > -0.4) y = y - 0.4;

        return ({
            ...acc,
            [task.id]: [
                x,
                y,
            ],
        })
    }, {}));
    const collidedStarRef = useRef(null);
    const collidedSnakeRef = useRef(null);
    const controlExistsRef = useRef(false);
    const [controlEvent, setControlEvent] = useState(null);
    const [controlPosition, setControlPosition] = useState(null);
    const dragControls = useDragControls();
    const initialCharacterPosition = useMemo(() => [
        (WIDTH/2 - CHARACTER_SIZE[0]/2) * sizeRatio,
        (HEIGHT/2 - CHARACTER_SIZE[1]/2) * sizeRatio,
    ], [sizeRatio]);
    const characterPosition = useMotionValue({});
    const snakesPosition = useMotionValue(SNAKES_BY_LEVEL[level].reduce((acc, snake) => ({
        ...acc,
        [snake.id]: [snake.position[0] * sizeRatio, snake.position[1] * sizeRatio],
    }), {}));

    const starsPosition = useMotionValue({});
    
    useLayoutEffect(() => {
        setModal({visible: true, type: 'movement'});
    }, [])

    useEffect(() => {
        starsPosition.set(
            STARS_BY_LEVEL[level].reduce((acc, star) => ({
                ...acc,
                [star.id]: [star.position[0] * sizeRatio, star.position[1] * sizeRatio],
            }), {})
        );
        characterPosition.set(initialCharacterPosition);
    }, [sizeRatio]);

    const characterDelta = useTransform(
        characterPosition,
        prev => {
            const leftDelta = prev[0] - wrapperRect?.width/2 + CHARACTER_SIZE[0]/2 * sizeRatio;
            const rightDelta = prev[0] + wrapperRect?.width/2 + (CHARACTER_SIZE[0]/2 - WIDTH) * sizeRatio;
            const topDelta = prev[1] - wrapperRect?.height/2 + CHARACTER_SIZE[1]/2 * sizeRatio;
            const bottomDelta = prev[1] + wrapperRect?.height/2 + (CHARACTER_SIZE[1]/2 - HEIGHT) * sizeRatio;

            let x;
            let y;

            if (Math.abs(leftDelta) > Math.abs(rightDelta)) {
                x = clamp(
                    rightDelta,
                    0,
                    wrapperRect?.width/2 - CHARACTER_SIZE[0]/2 * sizeRatio,
                );
            } else {
                x = clamp(
                    leftDelta,
                    CHARACTER_SIZE[0]/2 * sizeRatio - wrapperRect?.width/2,
                    0,
                );
            }

            if (Math.abs(topDelta) > Math.abs(bottomDelta)) {
                y = clamp(
                    bottomDelta,
                    0,
                    wrapperRect?.height/2 - CHARACTER_SIZE[1]/2 * sizeRatio,
                );
            } else {
                y = clamp(
                    topDelta,
                    CHARACTER_SIZE[1]/2 * sizeRatio - wrapperRect?.height/2,
                    0,
                );
            }

            return [x, y];
        }
    );
    const boardPositionX = useTransform(
        [characterPosition, characterDelta],
        ([prevPosition, prevDelta]) => `${-prevPosition[0] + wrapperRect?.width/2 - CHARACTER_SIZE[0]/2 * sizeRatio + prevDelta[0]}px`,
    );

    const boardPositionY = useTransform(
        [characterPosition, characterDelta],
        ([prevPosition, prevDelta]) => `${-prevPosition[1] + wrapperRect?.height/2 - CHARACTER_SIZE[1]/2 * sizeRatio + prevDelta[1]}px`,
    );

    const testX = useTransform(
        [characterDelta],
        ([prevDelta]) => `${prevDelta[0]}px`,
    );

    const testY = useTransform(
        [characterDelta],
        ([prevDelta]) => `${prevDelta[1]}px`,
    );

    const characterPositionX = useTransform(
        characterDelta,
        prev => `${wrapperRect?.width/2 - CHARACTER_SIZE[0]/2 * sizeRatio + prev[0]}px`,
    );
    const characterPositionY = useTransform(
        characterDelta,
        prev => `${wrapperRect?.height/2 - CHARACTER_SIZE[1]/2 * sizeRatio + prev[1]}px`,
    );

    const handleDrag = useCallback(
        throttle((event, info) => {
            if (!controlExistsRef.current || !info?.offset) {
                return;
            }

            const { x, y } = info.offset;

            const topRatio = clamp(y, -30, 30) / 30
            const leftRatio = clamp(x, -30, 30) / 30

            setDirection([leftRatio * CHARACTER_STEP * sizeRatio, topRatio * CHARACTER_STEP * sizeRatio]);
        }, 50),
        [sizeRatio],
    );

    const handleTapStart = (event) => {
        if (controlExistsRef.current) {
            return;
        }

        controlExistsRef.current = true;
        setControlEvent(event);
        setControlPosition([event.clientX - wrapperRect.left, event.clientY - wrapperRect.top]);
    };

    const handleTapEnd = () => {
        if (!controlExistsRef.current) {
            return;
        }

        controlExistsRef.current = false;
        handleDrag.cancel();
        setControlEvent(null);
        setControlPosition(null);
        setDirection([0, 0]);
    };

    const updateWrapperRect = () => {
        const rect = wrapperRef.current?.getBoundingClientRect?.();
        setWrapperRect(rect)
    };

    useLayoutEffect(() => {
        updateWrapperRect();
    }, [sizeRatio])

    useResizeObserver({ onResize: updateWrapperRect, ref: wrapperRef })

    useEffect(() => {
        if (controlEvent) {
            dragControls.start(controlEvent);
        }
    }, [controlEvent]);

    useEffect(() => {
        if (collidedStarRef.current) {
            addGamePoint();
            setStarsCollected(prev => prev + 1);
            collidedStarRef.current = null;
        }
        if (stars.length === 0) {
            const additionalPoints = MAX_LIVES - collidedSnakesAmount > 0 ? MAX_LIVES - collidedSnakesAmount : 0;
            endGame(level, additionalPoints);
            setPassedWeeks(prev => !prev.includes(level) ? [...prev, level] : prev);
            setHasPassedThisTry(level === CURRENT_WEEK);
            setModal({
                visible: true,
                type: 'win', 
                customText, 
                isDarken: true,
                additionalPoints: MAX_LIVES - collidedSnakesAmount > 0 ? MAX_LIVES - collidedSnakesAmount : 0
            })
        }
    }, [stars]);

    useEffect(() => {
        if (!collidedSnakeRef.current) return;

        setIsImun(true);
        setWarn(true);

        setTimeout(() => {
            collidedSnakeRef.current = null;
            setIsImun(false);
        }, 2000);

        setTimeout(() => {
            setWarn(false);
        }, 4000);

        if (!controlExistsRef.current) {
            return;
        }

        controlExistsRef.current = false;
        handleDrag.cancel();
        setControlEvent(null);
        setControlPosition(null);
        setDirection([0, 0]);
        
    }, [collidedSnakesAmount])

    useAnimationFrame(() => {
        if (isPaused || modal.visible) {
            return;
        }

        const prevSnakesDirection = snakesDirection.get();
        const prevSnakesPosition = snakesPosition.get();
        const [prevX, prevY] = characterPosition.get();

        const nextX = clamp(
            prevX + direction[0],
            0,
            (WIDTH - CHARACTER_SIZE[0]) * sizeRatio,
        );

        const nextY = clamp(
            prevY + direction[1],
            0,
            (HEIGHT - CHARACTER_SIZE[1]) * sizeRatio,
        );

        const nextSnakesDirection = SNAKES_BY_LEVEL[level].reduce((acc, snake) => {
            const prevPosition = prevSnakesPosition[snake.id];
            const prevDirection = prevSnakesDirection[snake.id];

            if (prevPosition[0] <= 0 || prevPosition[0] + SNAKE_SIZE_BY_LEVEL[level][0] * sizeRatio >= WIDTH * sizeRatio) {
                return {
                    ...prevSnakesDirection,
                    ...acc,
                    [snake.id]: [-prevDirection[0], prevDirection[1]],
                };
            }

            if (prevPosition[1] <= 0 || prevPosition[1] + SNAKE_SIZE_BY_LEVEL[level][1] * sizeRatio >= HEIGHT * sizeRatio) {
                return {
                    ...prevSnakesDirection,
                    ...acc,
                    [snake.id]: [prevDirection[0], -prevDirection[1]],
                };
            }

            return {
                ...acc,
                [snake.id]: prevDirection,
            };
        }, {});

        const nextSnakesPosition = SNAKES_BY_LEVEL[level].reduce((acc, snake) => {
            return {
                ...prevSnakesPosition,
                ...acc,
                [snake.id]: [
                    prevSnakesPosition[snake.id][0] + nextSnakesDirection[snake.id][0],
                    prevSnakesPosition[snake.id][1] + nextSnakesDirection[snake.id][1],
                ],
            };
        }, {});

        characterPosition.set([nextX, nextY]);
        snakesPosition.set(nextSnakesPosition);
        snakesDirection.set(nextSnakesDirection);

        if (!collidedStarRef.current) {
            const collidedStar = stars.find(({ position }) => {
                const starData = {
                    x: position[0] * sizeRatio + STAR_WIDTH * sizeRatio /2 ,
                    y: position[1] * sizeRatio + STAR_HEIGHT * sizeRatio/2 ,
                    r: STAR_WIDTH * sizeRatio /2 ,
                };

                const characterData = {
                    x: nextX + CHARACTER_SIZE[0] * sizeRatio / 2,
                    y: nextY + CHARACTER_SIZE[1] * sizeRatio / 2,
                    rx: CHARACTER_SIZE[0] * sizeRatio / 2,
                    ry: CHARACTER_SIZE[1] * sizeRatio / 2 ,
                };

                return Math.hypot(starData.x - characterData.x, starData.y - characterData.y) <= starData.r + Math.max(characterData.rx, characterData.ry);
            });

            if (collidedStar) {
                collidedStarRef.current = collidedStar;
                setStars(prev => prev.filter(star => star.id !== collidedStar.id))
            }
        }
        
        if (!collidedSnakeRef.current) {
            const collidedSnake = SNAKES_BY_LEVEL[level].find(({ id }) => {
                const snakeData = {
                    x: nextSnakesPosition[id][0] + SNAKE_SIZE_BY_LEVEL[level][0]/2 * sizeRatio,
                    y: nextSnakesPosition[id][1] + SNAKE_SIZE_BY_LEVEL[level][1]/2 * sizeRatio,
                    r: SNAKE_SIZE_BY_LEVEL[level][1]/2 * sizeRatio,
                };
                const characterData = {
                    x: nextX + CHARACTER_SIZE[0]/2 * sizeRatio,
                    y: nextY + CHARACTER_SIZE[1]/2 * sizeRatio,
                    rx: CHARACTER_SIZE[0]/2 * sizeRatio,
                    ry: CHARACTER_SIZE[1]/2 * sizeRatio,
                };

                return Math.hypot(snakeData.x - characterData.x, snakeData.y - characterData.y) <= snakeData.r + Math.max(characterData.rx, characterData.ry);
            });

            if (collidedSnake) {
                collidedSnakeRef.current = collidedSnake;
                characterPosition.set(initialCharacterPosition);
                setCollidedSnakesAmount(prev => prev + 1);
            }
        }

    });

    return (
       <>
        <Wrapper
            ref={wrapperRef}
            className={className}
            ratio={sizeRatio}
            onPointerDown={handleTapStart}
            onPointerUp={handleTapEnd}
            onPointerCancel={handleTapEnd}
        >
            <BoardStyled
                level={level}
                imageProps={{style: {x: boardPositionX, y: boardPositionY}}}
            />
            <StarBoard imageProps={{style: {x: boardPositionX, y: boardPositionY}}}>
                {stars.map((star) => (
                    <Star 
                        key={star.id}
                        star={star}
                        starsPosition={starsPosition}
                    />
                ))}
                 <AnimatePresence>
                    {SNAKES_BY_LEVEL[level].map((snake) => (
                        <Snake
                            level={level}
                            key={snake.id}
                            snake={snake}
                            snakesPosition={snakesPosition}
                        />
                    ))}
                </AnimatePresence>
            </StarBoard>
            <CharacterStyled
                level={level}
                direction={direction[0] || direction[1]}
                ratio={sizeRatio}
                style={{x: characterPositionX, y: characterPositionY}}
                $isImun={isImun}
            />
            <Darken 
                $ratio={sizeRatio}
                $collectedStars={starsCollected}
                style={{
                        x: testX, 
                        y: testY,
                        left: `${-(WIDTH/2 - CHARACTER_SIZE[0]/2) * sizeRatio + wrapperRect?.width/2 - CHARACTER_SIZE[0]/2 * sizeRatio}px`,
                        top: `${-(HEIGHT/2 - CHARACTER_SIZE[1]/2) * sizeRatio + wrapperRect?.height/2 - CHARACTER_SIZE[1]/2 * sizeRatio}px`,
                    }
                }
            />
            {warn && (
                <Warning $ratio={sizeRatio}>
                    Ой! Ты попался змейке,{'\n'}поэтому оказался{'\n'}в начальной точке.
                </Warning>
            )}
            <AnimatePresence>
                {!!controlPosition && (
                    <ControlStyled
                        ratio={sizeRatio}
                        stickProps={{
                            dragControls,
                            onDrag: handleDrag,
                        }}
                        initial={{
                            x: `calc(${controlPosition[0]}px - 50%)`,
                            y: `calc(${controlPosition[1]}px - 50%)`,
                            opacity: 0,
                        }}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.1}}
                    />
                )}
            </AnimatePresence>
        </Wrapper>
       </>
    );
}