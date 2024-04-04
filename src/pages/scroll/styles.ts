import stylex from '@stylexjs/stylex';

export const stylesCommon = stylex.create({
    wrap: {
        width: '100svw',
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
        right: 0,
        width: 4,
        height: 4,
        backgroundColor: 'red',
    },
    h1: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        writingMode: 'vertical-rl',
        textAlign: 'center',
        height: '100%',
        marginLeft: '0.125em',
    },
});
