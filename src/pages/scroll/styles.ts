import stylex from '@stylexjs/stylex';

export const stylesCommon = stylex.create({
    h2: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        height: '100%',
        lineHeight: 1,
        marginLeft: '0.5em',
    },
});
