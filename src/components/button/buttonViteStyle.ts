import stylex from '@stylexjs/stylex';

export const styls = stylex.create({
    base: {
        fontFamily: 'inherit',
        color: '#646cff',
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        backgroundColor: {
            default: '#1a1a1a',
            '@media (prefers-color-scheme: dark)': '#1a1a1a',
            '@media (prefers-color-scheme: light)': '#f9f9f9',
        },
        outline: 'none', // デフォルトのスタイル対策
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: {
            default: 'transparent',
            ':hover': '#646cff',
            ':focus': '#eee',
            ':focus-visible': '#eee',
        },
        borderRadius: 8,
        transition: 'border-color 0.25s',
        willChange: 'border-color',
        pointerEvents: {
            default: 'auto',
            ':disabled': 'none',
        },
        filter: {
            default: 'auto',
            ':disabled': 'brightness(0.5)',
        },
    },
});

export const sizes = stylex.create({
    small: {
        width: 96,
        height: 32,
        fontSize: '0.8em',
        fontWeight: 300,
    },
    medium: {
        width: 128,
        height: 48,
        fontSize: '1em',
        fontWeight: 500,
    },
    large: {
        width: 160,
        height: 64,
        fontSize: '1.2em',
        fontWeight: 700,
    },
});
