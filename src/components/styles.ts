import stylex from '@stylexjs/stylex';

const MOBILE = '@media (max-width: 700px)';
const REDUCE_MOTION = '@media (prefers-reduced-motion: reduce)';
const DARK = '@media (prefers-color-scheme: dark)';

export { MOBILE, REDUCE_MOTION, DARK };

const colors = stylex.defineVars({
    back: 'rgb(26, 26, 26)',
    text: 'rgb(255 255 255 / 87%)',
    textColored: 'rgb(100, 108, 255)',
});

export { colors };
