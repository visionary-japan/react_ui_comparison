import stylex from '@stylexjs/stylex';
import { type FC, memo, useCallback, useRef } from 'react';
import { ButtonVite } from '../../components/button/ButtonVite';
import { DivCustom } from '../../components/div/DivCustom';
import { H1 } from '../../components/heading/H1';
import { useScrollSmooth } from '../../hooks/useScrollSmooth';
import { ScrollCss } from './ScrollCss';
import { ScrollDiv } from './ScrollDiv';
import { Ultimate } from './Ultimate';

const styles = stylex.create({
    wrap: {
        position: 'relative',
        height: '200lvh',
    },
    h1: {
        position: 'absolute',
        left: '50%',
        top: 0,
        transform: 'translateX(-50%)',
    },
    target: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 4,
        height: 4,
        backgroundColor: 'red',
    },
    fixed: {
        position: 'fixed',
        right: 0,
        bottom: 0,
    },
});

const Component: FC = () => {
    const refWindowTarget = useRef<HTMLDivElement>(null);

    const { scrollSmooth } = useScrollSmooth();

    const getNewTopWindow = useCallback(() => {
        // ドキュメント要素の情報を取得
        const heightScroll = document.documentElement.scrollHeight;
        const heightWindow = document.documentElement.clientHeight;
        // 現在のスクロール値を取得
        const topNow = window.scrollY;
        // 計算用の値を算出
        const topSub = heightScroll / 3; // 要素はいま3つ
        const topMax = heightScroll - topSub; // スクロール可能な幅を算出
        const isNextNearTopMax = topNow + topSub > topMax - 2; // 誤差は2pxとする
        return Math.round(topNow) >= Math.round(topMax) - 1
            ? 0
            : isNextNearTopMax
              ? heightScroll - heightWindow
              : Math.round(topNow + topSub);
    }, []);

    const scrollWindowNormal = useCallback(() => {
        window.scrollTo(0, getNewTopWindow());
    }, [getNewTopWindow]);

    const scrollWindowSmooth = useCallback(() => {
        scrollSmooth(refWindowTarget.current, getNewTopWindow());
    }, [getNewTopWindow, scrollSmooth]);

    return (
        <DivCustom styles={styles.wrap}>
            {/* タイトル */}
            <H1 propsStyles={styles.h1}>Scroll</H1>
            {/* Ultimate */}
            <Ultimate />
            {/* Divスクロール */}
            <ScrollDiv />
            {/* CSSスクロール */}
            <ScrollCss />
            {/* Windowスクロール */}
            <div
                ref={refWindowTarget}
                id='window-target'
                {...stylex.props(styles.target)}
            />
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
        </DivCustom>
    );
};

export const Scroll = memo(Component);
