import type { Coordinate } from '../@types';
import { getChildOffsets } from './getChildOffsets';
import { getClosestCoordinate } from './getClosestCoordinate';
import { scrollAnimate } from './scrollAnimate';

export const snapWheel = (
    target: HTMLDivElement,
    isAnimate: boolean | undefined,
) => {
    //
    const { scrollLeft: x, scrollTop: y } = target;
    const offsets: Coordinate[] = getChildOffsets(target);
    const closest = getClosestCoordinate({ x, y }, offsets);
    // フラグによりアニメーションか瞬間移動か分岐
    if (isAnimate) {
        const { animateScroll } = scrollAnimate();
        animateScroll(target, closest);
    } else {
        target.scrollLeft = closest.x;
        target.scrollTop = closest.y;
    }
};
