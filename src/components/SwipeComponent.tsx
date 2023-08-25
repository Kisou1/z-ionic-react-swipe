import { useRef, useEffect, useState } from "react";
import { createGesture } from "@ionic/react";
import { setOpacityLastTwoCard , checkIfNoMoreCards} from "../utils/swipeUtilis";
import React from "react";

type SwipeComponentProps = {
    children: React.ReactNode;
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
    className?: string;
    setEmpty?: () => void;
    index: number;
};


function SwipeComponent({
    children,
    onSwipeRight,
    onSwipeLeft,
    className,
    setEmpty,
    index,
}: SwipeComponentProps) {
    const zindex = {zIndex: '9999'+index}
    const [style, setStyle] = useState<any>(zindex);
    const elementRef = useRef<HTMLDivElement | any>(null);

    const windowWidth = window?.innerWidth;

    function handleStart() {
        setStyle({ ...style, transition: "none" });
    }

    function handleMove(ev:any) {
        setStyle({ ...style, transform: `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 20}deg)` });
    }

    function handleEnd(ev:any) {
        setStyle({ ...style, transition: "0.3s ease-out", transform: "" });
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

  return (
    <div ref={elementRef} style={style} className={className ? className : 'z-card-main'}>
      {children}
    </div>
  );
}

export default SwipeComponent;
