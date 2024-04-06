import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';
import type { Props } from '.';

const styles = stylex.create({
    base: {
        fontSize: '3em',
        lineHeight: 1.5,
        margin: 0,
    },
    left: {
        width: '100%',
        textAlign: 'left',
    },
});

const Component: FC<Props> = ({ isLeft, children, propsStyles, ...attrs }) => (
    <h2
        {...attrs}
        {...stylex.props(styles.base, isLeft && styles.left, propsStyles)}
    >
        {children}
    </h2>
);

export const H2 = memo(Component);
