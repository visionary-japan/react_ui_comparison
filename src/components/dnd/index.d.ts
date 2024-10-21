import type { Writable } from '../../@types.ts';

export type MutableDomRect = {
    [K in keyof Writable<Omit<DOMRect, 'toJSON'>>]: DOMRect[K];
};
