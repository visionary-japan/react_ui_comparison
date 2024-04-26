import type { Coordinate } from '../@types';
import { getChildOffset } from './getChildOffset';
import { snap } from './snap';

export const snapToElement = (
    target: HTMLDivElement,
    element: HTMLElement,
    isAnimate: boolean | undefined,
) => {
    //
    const offset: Coordinate = getChildOffset(
        target,
        target.getBoundingClientRect(),
        element.getBoundingClientRect(),
    );
    snap(target, offset, isAnimate);
};
