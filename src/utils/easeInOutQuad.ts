type Type = (t: number) => number;
export const easeInOutQuad: Type = t => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
