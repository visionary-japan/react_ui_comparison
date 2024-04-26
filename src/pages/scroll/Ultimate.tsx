import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';
import { DivCustom } from '../../components/div/DivCustom';
import { DivScrollable } from '../../components/div/DivScrollable';
import { H2 } from '../../components/heading/H2';
import { stylesCommon } from './styles';

const styles = stylex.create({
    wrapper: {
        width: '100dvw',
        height: '100dvh',
        position: 'relative',
    },
    parent: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80dvw',
        height: '80dvh',
    },
    scroll: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        '::-webkit-scrollbar': {
            display: 'none',
        },
    },
    child: {
        width: '80dvw',
        height: '80dvh',
        background: 'radial-gradient(#ff000033, #0000ff33)',
    },
});

const Component: FC = () => {
    return (
        <DivCustom styles={styles.wrapper}>
            <H2 propsStyles={stylesCommon.h2}>Ultimate</H2>
            {/*  */}
            <DivScrollable
                isSnap
                isAnimate
                stylesParent={styles.parent}
                stylesScroll={styles.scroll}
            >
                <div {...stylex.props(styles.child)}>1</div>
                <div {...stylex.props(styles.child)}>2</div>
                <div {...stylex.props(styles.child)}>3</div>
                <div {...stylex.props(styles.child)}>4</div>
                <div {...stylex.props(styles.child)}>5</div>
                <div {...stylex.props(styles.child)}>6</div>
                <div {...stylex.props(styles.child)}>7</div>
                <div {...stylex.props(styles.child)}>8</div>
                <div {...stylex.props(styles.child)}>9</div>
            </DivScrollable>
        </DivCustom>
    );
};

export const Ultimate = memo(Component);
