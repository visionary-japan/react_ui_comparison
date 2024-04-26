import type { Coordinate } from '../@types';
import { getChildOffsets } from './getChildOffsets';
import { getClosestCoordinate } from './getClosestCoordinate';
import { snap } from './snap';

export const snapWheel = (
    target: HTMLDivElement,
    isAnimate: boolean | undefined,
) => {
    //
    const { scrollLeft: x, scrollTop: y } = target;
    const offsets: Coordinate[] = getChildOffsets(target);
    const closest = getClosestCoordinate({ x, y }, offsets);
    snap(target, closest, isAnimate);
};
