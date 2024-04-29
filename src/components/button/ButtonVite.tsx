import stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { UserAuthoredStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import { type ButtonHTMLAttributes, forwardRef, memo } from 'react';
import { sizes, styls } from './buttonViteStyle';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'small' | 'medium' | 'large';
    styles?: StyleXStyles<UserAuthoredStyles>;
}

const Component = forwardRef<HTMLButtonElement, Props>(
    ({ type = 'button', size = 'medium', styles, children, ...attrs }, ref) => (
        <button
            ref={ref}
            type={type}
            {...stylex.props(styls.base, sizes[size], styles)}
            {...attrs}
        >
            {children}
        </button>
    ),
);

export const ButtonVite = memo(Component);
