import type { Coordinate } from '../@types';
import { scrollAnimate } from './scrollAnimate';

export const snap = (
    target: HTMLDivElement,
    coordinate: Coordinate,
    isAnimate: boolean | undefined,
) => {
    // フラグによりアニメーションか瞬間移動か分岐
    if (isAnimate) {
        const { animateScroll } = scrollAnimate();
        animateScroll(target, coordinate);
    } else {
        target.scrollLeft = coordinate.x;
        target.scrollTop = coordinate.y;
    }
};
