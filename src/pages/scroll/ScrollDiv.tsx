import stylex from '@stylexjs/stylex';
import { type FC, memo, useCallback, useRef } from 'react';
import { ButtonVite } from '../../components/button/ButtonVite';
import { DivCustom } from '../../components/div/DivCustom';
import { Scrollbar } from '../../components/div/Scrollbar';
import { H1 } from '../../components/heading/H1';
import { useScrollSmooth } from '../../hooks/useScrollSmooth';
import { stylesCommon } from './styles';

const styles = stylex.create({
    wraps: {
        position: 'relative',
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'lightgray',
        textAlign: 'center',
        width: '40svh',
        height: '40svh',
        margin: '1em',
        overflow: 'auto',
        '::-webkit-scrollbar': {
            display: 'none',
        },
        display: 'flex',
    },
    wrapsDiv: {
        height: '80svh',
        width: '40svh',
        background: 'linear-gradient(black, white)',
    },
    divBtns: {
        position: 'sticky',
        top: '20svh',
        left: '20svh',
        transform: 'translate(-50%, -50%)',
    },
});

const Component: FC = () => {
    // ref
    // 通常スクロール
    const refDivNormal = useRef<HTMLDivElement>(null);
    const refDivNormalDiv = useRef<HTMLDivElement>(null);
    // スムーズスクロール
    const refDivSmooth = useRef<HTMLDivElement>(null);
    const refDivSmoothDiv = useRef<HTMLDivElement>(null);
    const refDivTarget = useRef<HTMLDivElement>(null);

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
        if (!refDivNormal.current) return;
        refDivNormal.current.scrollTo(0, getNewTopDiv(refDivNormal.current));
    }, [getNewTopDiv]);

    //
    const scrollDivSmooth = useCallback(() => {
        if (!refDivSmooth.current) return;
        scrollSmooth(
            refDivTarget,
            getNewTopDiv(refDivSmooth.current),
            'div-wrap',
        );
    }, [getNewTopDiv, scrollSmooth]);

    return (
        <DivCustom styles={stylesCommon.wrap}>
            <H1 propsStyles={stylesCommon.h1}>Scroll Div</H1>
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
                        {...stylex.props(stylesCommon.target)}
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

export const ScrollDiv = memo(Component);
