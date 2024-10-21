import type { Coordinate } from '../@types/index.ts';
import { getChildOffsets } from './getChildOffsets.ts';
import { getClosestCoordinate } from './getClosestCoordinate.ts';
import { snap } from './snap.ts';

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
