import stylex from '@stylexjs/stylex';
import { type FC, memo, useRef, useState } from 'react';
import { ButtonVite } from '../../components/button/ButtonVite';
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
    btns: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
});

const arr = ['1', '2', '3', '4', '5', '6', '7', '8', ''];

export interface ScrollMethods {
    refScroll: HTMLDivElement | null;
    back: () => void;
    next: () => void;
}

const Component: FC = () => {
    const refScroll = useRef<ScrollMethods>(null);

    const [pageIdx, setPageIdx] = useState<number>(0);

    const handleSetPage = (idx: number) => {
        setPageIdx(idx);
    };

    return (
        <DivCustom styles={styles.wrapper}>
            <H2
                propsStyles={stylesCommon.h2}
            >{`Page: "${arr[pageIdx]}" (${pageIdx})`}</H2>
            {/*  */}
            <DivScrollable
                ref={refScroll}
                isSnap
                isAnimate
                stylesParent={styles.parent}
                stylesScroll={styles.scroll}
                onSetPage={handleSetPage}
            >
                {arr.map(v => (
                    <div key={v} {...stylex.props(styles.child)}>
                        {v}
                    </div>
                ))}
            </DivScrollable>
            <DivCustom
                styleTypes={['flexColumn', 'gap', 'margin']}
                styles={styles.btns}
            >
                <ButtonVite onClick={() => refScroll.current?.back()}>
                    Back
                </ButtonVite>
                <ButtonVite onClick={() => refScroll.current?.next()}>
                    Next
                </ButtonVite>
            </DivCustom>
        </DivCustom>
    );
};

export const Ultimate = memo(Component);
