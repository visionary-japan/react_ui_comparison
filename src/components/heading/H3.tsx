import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';
import type { Props } from '.';

const styles = stylex.create({
    base: {
        fontSize: '1.5em',
        lineHeight: 1,
        margin: 0,
    },
});

const Component: FC<Props> = ({ children, ...attrs }) => (
    <h3 {...attrs} {...stylex.props(styles.base)}>
        {children}
    </h3>
);

export const H3 = memo(Component);
