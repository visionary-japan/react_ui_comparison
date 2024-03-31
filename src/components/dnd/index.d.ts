import type { Writable } from '../../@types';

export type MutableDOMRect = {
    [K in keyof Writable<Omit<DOMRect, 'toJSON'>>]: DOMRect[K];
};
