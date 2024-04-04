import * as stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { UserAuthoredStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import { type AnchorHTMLAttributes, forwardRef, memo } from 'react';
import { sizes, styls } from './buttonViteStyle';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    size?: 'small' | 'medium' | 'large';
    styles?: StyleXStyles<UserAuthoredStyles>;
}

const Component = forwardRef<HTMLAnchorElement, Props>(
    ({ size = 'medium', styles, children, ...attrs }, ref) => (
        <a
            ref={ref}
            {...stylex.props(styls.base, sizes[size], styles)}
            {...attrs}
        >
            {children}
        </a>
    ),
);

export const ButtonViteAnchor = memo(Component);
