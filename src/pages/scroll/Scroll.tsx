import stylex from '@stylexjs/stylex';
import { type FC, memo, useCallback, useRef } from 'react';
import { ButtonVite } from '../../components/button/ButtonVite';
import { DivCustom } from '../../components/div/DivCustom';
import { useScrollSmooth } from '../../hooks/useScrollSmooth';
import { ScrollCss } from './ScrollCss';
import { ScrollDiv } from './ScrollDiv';
import { stylesCommon } from './styles';

const styles = stylex.create({
    wrap: {
        height: '200lvh',
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
        const topMax = window.innerHeight;
        const topNow = window.scrollY;
        const topSub = topMax / 4;
        return topNow >= topMax - 1 ? 0 : Math.min(topNow + topSub, topMax);
    }, []);

    const scrollWindowNormal = useCallback(() => {
        window.scrollTo(0, getNewTopWindow());
    }, [getNewTopWindow]);

    const scrollWindowSmooth = useCallback(() => {
        scrollSmooth(refWindowTarget, getNewTopWindow());
    }, [getNewTopWindow, scrollSmooth]);

    return (
        <DivCustom styles={styles.wrap}>
            {/* Divスクロール */}
            <ScrollDiv />
            {/* CSSスクロール */}
            <ScrollCss />
            {/* Windowスクロール */}
            <div
                ref={refWindowTarget}
                id='window-target'
                {...stylex.props(stylesCommon.target)}
            />
            <DivCustom
                styleTypes={['flexColumn', 'gap', 'margin']}
                styles={styles.fixed}
            >
                <ButtonVite size='large' onClick={scrollWindowNormal}>
                    Normal Scroll
                </ButtonVite>
                <ButtonVite size='large' onClick={scrollWindowSmooth}>
                    Smooth Scroll
                </ButtonVite>
            </DivCustom>
        </DivCustom>
    );
};

export const Scroll = memo(Component);
