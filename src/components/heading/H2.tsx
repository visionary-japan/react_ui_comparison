import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';
import type { Props } from '.';

const styles = stylex.create({
    base: {
        fontSize: '2em',
        lineHeight: 1.5,
        margin: 0,
        width: '100%',
        textAlign: 'left',
    },
});

const Component: FC<Props> = ({ children, ...attrs }) => (
    <h2 {...attrs} {...stylex.props(styles.base)}>
        {children}
    </h2>
);

export const H2 = memo(Component);
