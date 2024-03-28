import stylex from '@stylexjs/stylex';
import { type FC, type ReactNode, memo } from 'react';

interface Props {
    children: ReactNode;
}

const styles = stylex.create({
    base: {
        fontSize: '4em',
        lineHeight: 1,
    },
});

const Component: FC<Props> = props => (
    <h1 {...stylex.props(styles.base)}>{props.children}</h1>
);

export const H1 = memo(Component);
