import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';
import type { Props } from '.';

const styles = stylex.create({
    base: {
        fontSize: '1.5em',
        lineHeight: 1,
        margin: 0,
    },
    left: {
        width: '100%',
        textAlign: 'left',
    },
});

const Component: FC<Props> = ({ isLeft, children, ...attrs }) => (
    <h3 {...attrs} {...stylex.props(styles.base, isLeft && styles.left)}>
        {children}
    </h3>
);

export const H3 = memo(Component);
