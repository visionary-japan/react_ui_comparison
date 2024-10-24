import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';
import type { Props } from './index.ts';

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

const Component: FC<Props> = ({ isLeft, children, propsStyles, ...attrs }) => (
    <h3
        {...attrs}
        {...stylex.props(styles.base, isLeft && styles.left, propsStyles)}
    >
        {children}
    </h3>
);

export const H3 = memo(Component);
