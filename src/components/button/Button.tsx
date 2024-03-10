import * as stylex from '@stylexjs/stylex';
import type { ButtonHTMLAttributes, FC } from 'react';

// https://zenn.dev/u_10/articles/8c3cda00a701e9
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large';
    isHover: boolean;
    isFocus: boolean;
}

const styles = stylex.create({
    base: {
        fontFamily: 'inherit',
        color: '#646cff',
        cursor: 'pointer',
        backgroundColor: '#1a1a1a',
        border: '1px solid transparent',
        borderRadius: '8px',
        transition: 'border-color 0.25s',
        willChange: 'border-color',
    },
    hover: {
        borderColor: '#646cff',
    },
    focus: {
        borderColor: '#fff',
        // outline: '4px auto -webkit-focus-ring-color',
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

export const Button: FC<ButtonProps> = ({
    type,
    size = 'medium',
    isHover,
    isFocus,
    children,
    ...props
}) => (
    <button
        type={type} // submitとresetを許可しないなら固定でbuttonにすべき
        {...stylex.props(
            styles.base,
            isHover && styles.hover,
            isFocus && styles.focus,
            sizes[size],
        )}
        {...props}
    >
        {children}
    </button>
);
