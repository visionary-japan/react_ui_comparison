import * as stylex from '@stylexjs/stylex';
import type { ButtonHTMLAttributes, FC } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large';
}

const styles = stylex.create({
    base: {
        fontFamily: 'inherit',
        color: '#646cff',
        cursor: 'pointer',
        backgroundColor: {
            default: '#1a1a1a',
            '@media (prefers-color-scheme: dark)': '#1a1a1a',
            '@media (prefers-color-scheme: light)': '#f9f9f9',
        },
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: {
            default: 'transparent',
            ':hover': '#646cff',
            ':focus': '#eee',
        },
        borderRadius: 8,
        transition: 'border-color 0.25s',
        willChange: 'border-color',
    },
});

const sizes = stylex.create({
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

export const Button: FC<Props> = ({
    type = 'button',
    size = 'medium',
    children,
    ...attrs
}) => (
    <button type={type} {...stylex.props(styles.base, sizes[size])} {...attrs}>
        {children}
    </button>
);
