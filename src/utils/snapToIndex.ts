import type { Coordinate } from '../@types/index.ts';
import { getChildOffset } from './getChildOffset.ts';
import { snap } from './snap.ts';

export const snapToIndex = (
    target: HTMLDivElement,
    idx: number,
    isAnimate: boolean | undefined,
) => {
    //
    const offset: Coordinate = getChildOffset(
        target,
        target.getBoundingClientRect(),
        target.children[idx].getBoundingClientRect(),
    );
    snap(target, offset, isAnimate);
};
