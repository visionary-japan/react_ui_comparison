import type { Coordinate } from '../@types';

type Type = (elem: HTMLDivElement) => Coordinate[];

export const getChildOffsets: Type = (elem: HTMLDivElement) => {
    const rectParent = elem.getBoundingClientRect();
    const children = Array.from(elem.children);
    const rectChildren = children.map(c => c.getBoundingClientRect());
    return rectChildren.map(c => ({
        x: c.left - rectParent.left + elem.scrollLeft,
        y: c.top - rectParent.top + +elem.scrollTop,
    }));
};
