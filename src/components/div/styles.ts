import stylex from '@stylexjs/stylex';

export const stylesCommon = stylex.create({
    wrap: {
        width: '100dvw',
        height: '100lvh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    target: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 4,
        height: 4,
        backgroundColor: 'red',
    },
    h2: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        height: '100%',
        lineHeight: 1,
        marginLeft: '0.25em',
    },
});
