import stylex from '@stylexjs/stylex';
import { type FC, type KeyboardEvent, memo, useRef, useState } from 'react';
import { ButtonVite } from '../../components/button/ButtonVite';
import { DivCustom } from '../../components/div/DivCustom';
import { DivScrollable } from '../../components/div/DivScrollable';
import { H2 } from '../../components/heading/H2';
import { findIndexes } from '../../utils/findIndexes';
import { snapToIndex } from '../../utils/snapToIndex';
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

const arr = [
    ['1', '2', '3', '4', '5', '6', '7', '8', ''],
    ['9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
];

export interface RefScroll {
    refScroll: HTMLDivElement | null;
    back: () => void;
    next: () => void;
}

const Component: FC = () => {
    const refScroll = useRef<RefScroll>(null);

    // State: Index
    const [chapIdx, setChapIdx] = useState<number>(0);
    const [pageIdx, setPageIdx] = useState<number>(0);
    // State: Text
    const [pageTxt, setPageTxt] = useState<string>('');

    // Function: Keydown
    const handleKeydown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.nativeEvent.isComposing || e.key !== 'Enter' || !pageTxt) return;
        const [newChapIdx, newPageIdx] = findIndexes(pageTxt, arr);
        if (newChapIdx === undefined || newPageIdx === undefined) return;
        if (newChapIdx === chapIdx) {
            if (!refScroll.current?.refScroll) return;
            snapToIndex(refScroll.current.refScroll, newPageIdx, true);
        } else {
            setChapIdx(newChapIdx);
            if (!refScroll.current?.refScroll) return;
            snapToIndex(refScroll.current.refScroll, newPageIdx, false);
        }
    };

    return (
        <DivCustom styles={styles.wrapper}>
            <H2
                propsStyles={stylesCommon.h2}
            >{`Page: "${arr[chapIdx][pageIdx]}" (${chapIdx}, ${pageIdx})`}</H2>
            {/*  */}
            <DivScrollable
                ref={refScroll}
                isSnap
                isAnimate
                stylesParent={styles.parent}
                stylesScroll={styles.scroll}
                onSetChap={setChapIdx}
                onSetPage={setPageIdx}
            >
                {arr[chapIdx].map(v => (
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
                <ButtonVite
                    onClick={() =>
                        setChapIdx(prev =>
                            prev >= arr.length - 1 ? 0 : prev + 1,
                        )
                    }
                >
                    Chap
                </ButtonVite>
                <input
                    name='chapter'
                    aria-label='chapter'
                    value={pageTxt}
                    onChange={e => setPageTxt(e.target.value)}
                    onKeyDown={handleKeydown}
                />
            </DivCustom>
        </DivCustom>
    );
};

export const Ultimate = memo(Component);
