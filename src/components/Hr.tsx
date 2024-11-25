import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';

const styles = stylex.create({
    base: {
        // fontSize: '4em',
        // lineHeight: 1.5,
        // margin: 0,
    },
});

const Component: FC = () => <hr {...stylex.props(styles.base)} />;

export const Hr = memo(Component);
