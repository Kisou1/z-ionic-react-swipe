import React, { useRef } from 'react';
import { createAnimation, IonButton } from '@ionic/react';
import { setOpacityLastTwoCard , checkIfNoMoreCards} from "../utils/swipeUtilis";

type DislikeButtonProps = {
    children: React.ReactNode;
    onSwipeLeft: () => void;
    className?: string;
    color?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "medium" | "dark";
    setEmpty?: () => void;
};

const DislikeButton: React.ForwardRefRenderFunction<HTMLDivElement, DislikeButtonProps> = (
    { children, onSwipeLeft, className, setEmpty, color = "light" },
    ref:any
) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const windowWidth = window?.innerWidth;

    const swipeLeftAnimation = [
        {offset: 0},
        {offset: 1, 
            transform: `translateX(-${windowWidth * 1.5}px) rotate(-20deg)`,
            transition: '0.3s ease-out',
            
        }
    ]

    const playMatchButtonAnimation = () => {
        if (ref?.current !== null) {
            const animation = createAnimation()
                .addElement(ref?.current)
                .duration(500)
                .keyframes(swipeLeftAnimation);
                
            animation.play();
            onSwipeLeft();

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
                className={className ? className : "z-dislike-button"}
                onClick={playMatchButtonAnimation}
            >
                {children}
            </IonButton>
        </div>
    );
};

export default React.forwardRef<HTMLDivElement, DislikeButtonProps>(DislikeButton);
