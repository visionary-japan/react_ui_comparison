import stylex from '@stylexjs/stylex';
import { type FC, memo, useCallback, useRef } from 'react';
import { ButtonVite } from '../components/button/ButtonVite';
import { DivCustom } from '../components/div/DivCustom';
import { Scrollbar } from '../components/div/Scrollbar';
import { useScrollSmooth } from '../hooks/useScrollSmooth';

const styles = stylex.create({
    wrap: {
        height: '200svh',
    },
    wraps: {
        position: 'relative',
        margin: '2em',
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'lightgray',
        textAlign: 'center',
        height: 480,
        overflow: 'auto',
        '::-webkit-scrollbar': {
            display: 'none',
        },
        display: 'flex',
    },
    wrapsDiv: {
        height: 960,
        padding: '4em',
        background: 'linear-gradient(black, white)',
    },
    target: {
        position: 'absolute',
        top: 0,
        transform: 'translateX(-50%)',
        width: 4,
        height: 4,
        backgroundColor: 'red',
    },
    divBtns: {
        position: 'sticky',
        top: 0,
    },
    fixed: {
        position: 'fixed',
        right: 0,
        bottom: 0,
    },
});

const SCROLL_SUB = 300;

const Component: FC = () => {
    const refWindowTarget = useRef<HTMLDivElement>(null);
    const refDivNormal = useRef<HTMLDivElement>(null);
    const refDivNormalDiv = useRef<HTMLDivElement>(null);
    const refDivSmooth = useRef<HTMLDivElement>(null);
    const refDivSmoothDiv = useRef<HTMLDivElement>(null);
    const refDivTarget = useRef<HTMLDivElement>(null);

    const { scrollSmooth } = useScrollSmooth();

    const getNewTopWindow = useCallback(() => {
        const topMax = window.innerHeight;
        const topNow = Math.round(window.scrollY);
        return topNow === topMax ? 0 : Math.min(topNow + SCROLL_SUB, topMax);
    }, []);
    const scrollWindowNormal = useCallback(() => {
        window.scrollTo(0, getNewTopWindow());
    }, [getNewTopWindow]);
    const scrollWindowSmooth = useCallback(() => {
        scrollSmooth(refWindowTarget, getNewTopWindow());
    }, [getNewTopWindow, scrollSmooth]);

    const getNewTopDiv = useCallback((current: HTMLDivElement) => {
        const topMax = current.scrollHeight - current.clientHeight;
        const topNow = Math.round(current.scrollTop);
        return topNow === topMax ? 0 : Math.min(topNow + SCROLL_SUB, topMax);
    }, []);
    const scrollDivNormal = useCallback(() => {
        if (!refDivNormal.current) return;
        refDivNormal.current.scrollTo(0, getNewTopDiv(refDivNormal.current));
    }, [getNewTopDiv]);
    const scrollDivSmooth = useCallback(() => {
        if (!refDivSmooth.current) return;
        scrollSmooth(
            refDivTarget,
            getNewTopDiv(refDivSmooth.current),
            'div-wrap',
        );
    }, [getNewTopDiv, scrollSmooth]);

    return (
        <DivCustom styleTypes={['flexStart']} styles={styles.wrap}>
            <div
                ref={refWindowTarget}
                id='window-target'
                {...stylex.props(styles.target)}
            />
            {/* ボタン */}
            <DivCustom
                styleTypes={['flexColumn', 'gap', 'margin']}
                styles={styles.fixed}
            >
                <ButtonVite onClick={scrollWindowNormal}>
                    Normal Scroll
                </ButtonVite>
                <ButtonVite onClick={scrollWindowSmooth}>
                    Smooth Scroll
                </ButtonVite>
            </DivCustom>
            {/* 通常スクロール */}
            <DivCustom ref={refDivNormal} styles={styles.wraps}>
                <DivCustom ref={refDivNormalDiv} styles={styles.wrapsDiv}>
                    <ButtonVite
                        styles={styles.divBtns}
                        onClick={scrollDivNormal}
                    >
                        Normal Scroll
                    </ButtonVite>
                </DivCustom>
                <Scrollbar
                    refParent={refDivNormal}
                    refChild={refDivNormalDiv}
                />
            </DivCustom>
            {/* スムーススクロール */}
            <DivCustom ref={refDivSmooth} id='div-wrap' styles={styles.wraps}>
                <DivCustom ref={refDivSmoothDiv} styles={styles.wrapsDiv}>
                    <ButtonVite
                        styles={styles.divBtns}
                        onClick={scrollDivSmooth}
                    >
                        Smooth Scroll
                    </ButtonVite>
                    <div
                        ref={refDivTarget}
                        id='div-target'
                        {...stylex.props(styles.target)}
                    />
                </DivCustom>
                <Scrollbar
                    refParent={refDivSmooth}
                    refChild={refDivSmoothDiv}
                    refTarget={refDivTarget}
                    hasButton
                />
            </DivCustom>
        </DivCustom>
    );
};

export const Scroll = memo(Component);
