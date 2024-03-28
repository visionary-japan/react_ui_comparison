import stylex from '@stylexjs/stylex';
import { type FC, type ReactNode, memo } from 'react';

interface Props {
    children: ReactNode;
}

const styles = stylex.create({
    base: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Component: FC<Props> = props => (
    <div {...stylex.props(styles.base)}>{props.children}</div>
);

export const FlexCenter = memo(Component);
