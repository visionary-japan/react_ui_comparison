import type { Writable } from '../../@types';

// biome-ignore lint/style/useNamingConvention: <explanation>
export type MutableDOMRect = {
    [K in keyof Writable<Omit<DOMRect, 'toJSON'>>]: DOMRect[K];
};
