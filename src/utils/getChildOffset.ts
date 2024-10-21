import type { Coordinate } from '../@types/index.d.ts';

type Type = (
    elem: HTMLDivElement,
    rectParent: DOMRect,
    rectChildren: DOMRect,
) => Coordinate;

export const getChildOffset: Type = (elem, rectParent, rectChildren) => {
    return {
        x: rectChildren.left - rectParent.left + elem.scrollLeft,
        y: rectChildren.top - rectParent.top + +elem.scrollTop,
    };
};
