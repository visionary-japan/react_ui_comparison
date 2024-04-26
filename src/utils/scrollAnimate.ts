import type { Coordinate } from '../@types';
import { easeInOutQuad } from './easeInOutQuad';

const SCROLL_ANIMATE_DURATION = 250;

type Callback = () => void;

export const scrollAnimate = () => {
    // アニメーションのフレームID
    let animationFrameId: number | null = null;

    const cancelAnimateScroll = (callback?: Callback) => {
        if (animationFrameId === null) return;
        cancelAnimationFrame(animationFrameId);
        animationFrameId === null;
        callback?.();
    };

    const animateScroll = (
        elem: HTMLElement,
        target: Coordinate,
        callback?: Callback,
    ) => {
        const start = { x: elem.scrollLeft, y: elem.scrollTop };
        const distance = { x: target.x - start.x, y: target.y - start.y };
        if (distance.x === 0 && distance.y === 0) return callback?.();
        // タイムスタンプを定義
        let t: number | null = null;
        // アニメーションを定義
        const step = (timestamp: number) => {
            if (!t) t = timestamp;
            const progress = timestamp - t;
            const percentage = Math.min(progress / SCROLL_ANIMATE_DURATION, 1);
            const easePercentage = easeInOutQuad(percentage);
            elem.scrollLeft = start.x + distance.x * easePercentage;
            elem.scrollTop = start.y + distance.y * easePercentage;
            // 進捗率で分岐
            if (progress < SCROLL_ANIMATE_DURATION) {
                animationFrameId = window.requestAnimationFrame(step);
            } else {
                cancelAnimateScroll(callback);
            }
        };
        // アニメーションを実行
        window.requestAnimationFrame(step);
    };

    return { cancelAnimateScroll, animateScroll };
};
