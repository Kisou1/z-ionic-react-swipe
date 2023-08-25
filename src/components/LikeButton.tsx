import React, { useRef } from 'react';
import { createAnimation, IonButton } from '@ionic/react';
import { setOpacityLastTwoCard , checkIfNoMoreCards} from "../utils/swipeUtilis";

type LikeButtonProps = {
    children: React.ReactNode;
    onSwipeRight: () => void;
    className?: string;
    color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";
    setEmpty?: () => void;
};

const LikeButton: React.ForwardRefRenderFunction<HTMLDivElement, LikeButtonProps> = (
    { children, onSwipeRight, className, setEmpty, color = "light" },
    ref:any
) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const windowWidth = window?.innerWidth;

    const swipeRightAnimation = [
        { offset: 0 },
        {
            offset: 1,
            transform: `translateX(${windowWidth * 1.5}px) rotate(20deg)`,
            transition: '0.3s ease-out',
        },
    ];

    const playMatchButtonAnimation = () => {
        if (ref?.current !== null) {
            const animation = createAnimation()
                .addElement(ref?.current)
                .duration(500)
                .keyframes(swipeRightAnimation);
                
            animation.play();
            onSwipeRight();

            animation.onFinish(() => {
                ref.current?.remove();
                checkIfNoMoreCards(setEmpty);
                setOpacityLastTwoCard();
            });
        }
    };

    return (
        <div ref={elementRef} className="ion-text-center">
            <IonButton
                color={color}
                className={className ? className : "z-like-button"}
                onClick={playMatchButtonAnimation}
            >
                {children}
            </IonButton>
        </div>
    );
};

export default React.forwardRef<HTMLDivElement, LikeButtonProps>(LikeButton);
