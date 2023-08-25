import { createGesture } from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import { checkIfNoMoreCards, setOpacityLastTwoCard } from "../utils/swipeUtilis";


type SwipeOptions = {
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
    setEmpty?: () => void;
    index: number;
};

function useSwipe({
    onSwipeRight,
    onSwipeLeft,
    setEmpty,   
    index,
}: SwipeOptions) {
    const zindex = { zIndex: '9999' + index };
    const [style, setStyle] = useState<any>(zindex);
    const elementRef = useRef<HTMLDivElement | any>(null);

    const windowWidth = window?.innerWidth;
    function handleStart() {
        setStyle({ ...style, transition: "none" });
    }

    function handleMove(ev: any) {
        setStyle({ ...style, transform: `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 20}deg)` });
    }

    function handleEnd(ev: any) {
        const isSwipeRight = ev.deltaX > windowWidth / 2;
        const isSwipeLeft = ev.deltaX < -windowWidth / 2;

        if (isSwipeRight || isSwipeLeft) {
            const transformValue = isSwipeRight ? `${windowWidth * 1.5}px` : `-${windowWidth * 1.5}px`;
            setStyle({ ...style, transition: `translateX(${transformValue})` });
            if (isSwipeRight) {
                onSwipeRight();
            } else {
                onSwipeLeft();
            }
            elementRef?.current?.remove();
            checkIfNoMoreCards(setEmpty);
            setOpacityLastTwoCard();
        } else {
            setStyle({ ...style, transform: null });
        }
    }

    useEffect(() => {
        const gesture = createGesture({
            el: elementRef?.current,
            gestureName: "custom-gesture",
            onStart: handleStart,
            onMove: handleMove,
            onEnd: handleEnd,
        });

        gesture.enable();

        return () => {
            gesture.destroy();
        };
    }, []);

    return {
        ref: elementRef,
        style,
    };
}

export default useSwipe;