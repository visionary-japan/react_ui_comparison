import type { PointerEvent } from 'react';
import type { Coordinate } from '../@types';
import { getChildOffsets } from './getChildOffsets';
import { getClosestCoordinate } from './getClosestCoordinate';
import { scrollAnimate } from './scrollAnimate';

export const snapPointer = (
    e: PointerEvent<HTMLDivElement>,
    dragScroll: Coordinate,
    dragTimestamp: number,
    isAnimate: boolean | undefined,
) => {
    //
    const target = e.target as HTMLDivElement;
    //
    const { scrollLeft, scrollTop, clientWidth, clientHeight } = target;
    const subTimestamp = e.timeStamp - dragTimestamp;
    const subCoordinate: Coordinate = {
        x: scrollLeft - dragScroll.x,
        y: scrollTop - dragScroll.y,
    };
    const adjuster: Coordinate = {
        x: ((subCoordinate.x / subTimestamp) * clientWidth) / 5000,
        y: ((subCoordinate.y / subTimestamp) * clientHeight) / 5000,
    };
    const adjusted: Coordinate = {
        x: scrollLeft + adjuster.x,
        y: scrollTop + adjuster.y,
    };
    const offsets: Coordinate[] = getChildOffsets(target);
    const closest = getClosestCoordinate(adjusted, offsets);
    // フラグによりアニメーションか瞬間移動か分岐
    if (isAnimate) {
        const { animateScroll } = scrollAnimate();
        animateScroll(target, closest);
    } else {
        target.scrollLeft = closest.x;
        target.scrollTop = closest.y;
    }
};
