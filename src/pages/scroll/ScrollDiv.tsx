import stylex from '@stylexjs/stylex';
import { type FC, memo, useCallback, useRef } from 'react';
import type { RefHandle } from '../../@types/scrollable.ts';
import { ButtonVite } from '../../components/button/ButtonVite.tsx';
import { DivCustom } from '../../components/div/DivCustom.tsx';
import { DivScrollbar } from '../../components/div/DivScrollbar.tsx';
import { H2 } from '../../components/heading/H2.tsx';
import { useScrollSmooth } from '../../hooks/useScrollSmooth.tsx';
import { stylesCommon } from './styles.ts';

const styles = stylex.create({
    wrapper: {
        width: '100dvw',
        height: '100lvh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    child: {
        height: '80svh',
        width: '40svh',
        background: 'linear-gradient(red, blue)',
    },
    button: {
        position: 'sticky',
        top: '20svh',
        left: '20svh',
        transform: 'translate(-50%, -50%)',
    },
});

const Component: FC = () => {
    // ref
    // ノーマルスクロール
    const refNormal = useRef<RefHandle>(null);
    // スムーズスクロール
    const refSmooth = useRef<RefHandle>(null);

    // スムーズスクロールメソッドを取得
    const { scrollSmooth } = useScrollSmooth();

    // 親
    const getNewTopDiv = useCallback((current: HTMLDivElement) => {
        const topMax = current.scrollHeight - current.clientHeight;
        const topNow = current.scrollTop;
        const topSub = topMax / 4;
        return topNow >= topMax - 2 ? 0 : Math.min(topNow + topSub, topMax);
    }, []);

    //
    const scrollDivNormal = useCallback(() => {
        if (!refNormal.current?.refParent) return;
        refNormal.current.refParent.scrollTo(
            0,
            getNewTopDiv(refNormal.current.refParent),
        );
    }, [getNewTopDiv]);

    //
    const scrollDivSmooth = useCallback(() => {
        if (!(refSmooth.current?.refParent && refSmooth.current?.refTarget))
            return;
        scrollSmooth(
            refSmooth.current.refTarget,
            getNewTopDiv(refSmooth.current.refParent),
            refSmooth.current.refParent.id,
        );
    }, [getNewTopDiv, scrollSmooth]);

    return (
        <DivCustom styles={styles.wrapper}>
            <H2 propsStyles={stylesCommon.h2}>With JS</H2>
            {/* 通常スクロール */}
            <DivScrollbar
                ref={refNormal}
                id='normal'
                stylesChild={styles.child}
            >
                <ButtonVite styles={styles.button} onClick={scrollDivNormal}>
                    Normal Scroll
                </ButtonVite>
            </DivScrollbar>
            {/* スムーススクロール */}
            <DivScrollbar
                ref={refSmooth}
                id='smooth'
                stylesChild={styles.child}
                hasButton={true}
            >
                <ButtonVite styles={styles.button} onClick={scrollDivSmooth}>
                    Smooth Scroll
                </ButtonVite>
            </DivScrollbar>
        </DivCustom>
    );
};

export const ScrollDiv = memo(Component);
