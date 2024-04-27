import type { Coordinate } from '../@types';
import { getChildOffset } from './getChildOffset';
import { snap } from './snap';

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
