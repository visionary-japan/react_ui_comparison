import type { Coordinate } from '../@types/index.d.ts';
import { getChildOffset } from './getChildOffset.ts';

type Type = (elem: HTMLDivElement) => Coordinate[];

export const getChildOffsets: Type = (elem: HTMLDivElement) => {
    const rectParent = elem.getBoundingClientRect();
    const children = Array.from(elem.children);
    const rectChildren = children.map(c => c.getBoundingClientRect());
    return rectChildren.map(c => getChildOffset(elem, rectParent, c));
};
