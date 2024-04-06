import stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { UserAuthoredStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import {
    type HTMLAttributes,
    type PointerEvent,
    forwardRef,
    memo,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { RefHandle } from '../../@types/scrollable';
import { useObserverMutationChild } from '../../hooks/useObserverMutationChild';
import { useScrollSmooth } from '../../hooks/useScrollSmooth';

interface Props extends HTMLAttributes<HTMLDivElement> {
    id: string;
    stylesParent?: StyleXStyles<UserAuthoredStyles>;
    stylesChild?: StyleXStyles<UserAuthoredStyles>;
    hasButton?: boolean;
}

const SCROLLBAR_WIDTH = 12;
const SCROLLBAR_MARGIN = 1;
const SCROLL_SUB = 300;

const styles = stylex.create({
    container: {
        position: 'relative',
        display: 'flex',
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
        '::-webkit-scrollbar-thumb': {
            display: 'none',
        },
    },
    target: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 4,
        height: 4,
        backgroundColor: 'green',
    },
    wrap: {
        position: 'sticky',
        right: 0,
        top: 0,
        height: '100%',
    },
    wrapNotScrollable: {
        display: 'none',
    },
    bar: {
        position: 'relative',
        width: SCROLLBAR_WIDTH,
        height: '100%',
        backgroundColor: 'darkred',
        cursor: 'pointer',
    },
    barHasButton: {
        height: `calc(100% - ${SCROLLBAR_WIDTH}px * 2)`,
    },
    button: (enable: boolean) => ({
        position: 'relative',
        width: SCROLLBAR_WIDTH,
        height: SCROLLBAR_WIDTH,
        backgroundColor: 'darkgoldenrod',
        cursor: 'pointer',
        pointerEvents: !enable && 'none',
        '::after': {
            content: '',
            position: 'absolute',
            top: 0,
            left: 0,
            width: `calc(${SCROLLBAR_WIDTH}px - ${SCROLLBAR_MARGIN}px * 2)`,
            height: `calc(${SCROLLBAR_WIDTH}px - ${SCROLLBAR_MARGIN}px * 2)`,
            margin: SCROLLBAR_MARGIN,
            backgroundColor: enable && 'yellow',
        },
    }),
    thumb: (height: number, top: number) => ({
        position: 'absolute',
        left: 0,
        top,
        width: `calc(${SCROLLBAR_WIDTH}px - ${SCROLLBAR_MARGIN}px * 2)`,
        height,
        backgroundColor: 'red',
        cursor: 'pointer',
        marginLeft: SCROLLBAR_MARGIN,
    }),
});

const Component = forwardRef<RefHandle, Props>(
    (
        {
            id,
            stylesParent,
            stylesChild,
            hasButton = false,
            children,
            ...attrs
        },
        ref,
    ) => {
        const [thumbHeight, setThumbHeight] = useState<number>(0);
        const [thumbTop, setThumbTop] = useState<number>(0);

        const isScrollable: boolean = useMemo(
            () => thumbHeight > 0,
            [thumbHeight],
        );

        const refScrollbar = useRef<HTMLDivElement>(null);

        const refTarget = useRef<HTMLDivElement>(null);
        const refParent = useRef<HTMLDivElement>(null);
        useImperativeHandle(ref, () => ({
            refTarget: refTarget.current,
            refParent: refParent.current,
        }));

        const { refChild, heightChild } = useObserverMutationChild();

        const handleLoad = useCallback(() => {
            // 親要素がないならキャンセル
            if (!refParent?.current) return;
            // 親要素の高さを取得
            const { clientHeight: heightParent } = refParent.current;
            // 親要素の高さをもとにボタンの有無でスクロールバーの高さを取得
            const heightScrollbar = hasButton
                ? heightParent - SCROLLBAR_WIDTH * 2
                : heightParent;
            // 親要素と子要素の高さの比を取得
            const ratio = heightParent / heightChild;
            // 子要素が親要素より小さくないならキャンセル
            if (ratio >= 1) return;
            // 比をもとにスクロールバーの高さを算出
            const newScrollbarHeight = Math.max(heightScrollbar * ratio, 32);
            // スクロールバーの高さを設定
            setThumbHeight(newScrollbarHeight);
        }, [heightChild, hasButton]);

        useEffect(() => {
            handleLoad();
        }, [handleLoad]);

        const handleScrollParent = useCallback(() => {
            if (!(refParent?.current && refScrollbar.current)) return;

            const { clientHeight: heightParent, scrollTop } = refParent.current;
            const { clientHeight: heightScrollbar } = refScrollbar.current;

            const scrollRatio = scrollTop / (heightChild - heightParent);
            const newScrollbarPosY =
                scrollRatio * (heightScrollbar - thumbHeight);

            setThumbTop(newScrollbarPosY);
        }, [heightChild, thumbHeight]);

        const [isDraggingThumb, setIsDraggingThumb] = useState<boolean>(false);
        const [thumbDragOffsetY, setThumbDragOffsetY] = useState<number>(0);

        // Thumb
        const handleThumbPointerDown = useCallback(
            (e: PointerEvent<HTMLDivElement>) => {
                e.stopPropagation();
                setIsDraggingThumb(true);
                e.currentTarget.setPointerCapture(e.pointerId);

                const rect = e.currentTarget.getBoundingClientRect();
                const offsetY = e.clientY - rect.top;
                setThumbDragOffsetY(offsetY);
            },
            [],
        );
        const handleThumbPointerUp = useCallback(
            (e: PointerEvent<HTMLDivElement>) => {
                setIsDraggingThumb(false);
                e.currentTarget.releasePointerCapture(e.pointerId);
            },
            [],
        );
        const handleThumbPointerMove = useCallback(
            (e: PointerEvent<HTMLDivElement>) => {
                if (
                    !(
                        isDraggingThumb &&
                        refParent?.current &&
                        refScrollbar.current
                    )
                )
                    return;

                const { clientHeight: heightParent } = refParent.current;
                const { clientHeight: heightScrollbar } = refScrollbar.current;

                const rect = refScrollbar.current.getBoundingClientRect();
                const offsetY = e.clientY - rect.top;

                const maxScrollbarPosY = heightScrollbar - thumbHeight;
                const newScrollbarPosY = Math.min(
                    Math.max(offsetY - thumbDragOffsetY, 0),
                    maxScrollbarPosY,
                );

                const scrollRatio = newScrollbarPosY / maxScrollbarPosY;
                const newScrollTop = scrollRatio * (heightChild - heightParent);

                setThumbTop(newScrollbarPosY);
                refParent.current.scrollTop = newScrollTop;
            },
            [heightChild, isDraggingThumb, thumbHeight, thumbDragOffsetY],
        );

        // スクロールバー
        const [isDraggingScrollbar, setIsDraggingScrollbar] =
            useState<boolean>(false);

        const handleScrollbarPointerMove = useCallback(
            (e: PointerEvent<HTMLDivElement>) => {
                if (
                    !(
                        isDraggingScrollbar &&
                        refParent?.current &&
                        refScrollbar.current
                    )
                )
                    return;

                const { clientHeight: heightParent } = refParent.current;
                const { clientHeight: heightScrollbar } = refScrollbar.current;

                const rect = refScrollbar.current.getBoundingClientRect();
                const offsetY = e.clientY - rect.top;

                const maxScrollbarPosY = heightScrollbar - thumbHeight;
                const newScrollbarPosY = Math.min(
                    Math.max(offsetY - thumbHeight / 2, 0),
                    maxScrollbarPosY,
                );

                const scrollRatio = newScrollbarPosY / maxScrollbarPosY;
                const newScrollTop = scrollRatio * (heightChild - heightParent);

                setThumbTop(newScrollbarPosY);
                refParent.current.scrollTop = newScrollTop;
            },
            [heightChild, isDraggingScrollbar, thumbHeight],
        );
        const handleScrollbarPointerDown = useCallback(
            (e: PointerEvent<HTMLDivElement>) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                setIsDraggingScrollbar(true);
                if (!(refParent?.current && refScrollbar.current)) return;

                const { clientHeight: heightParent } = refParent.current;
                const { clientHeight: heightScrollbar } = refScrollbar.current;

                const rect = refScrollbar.current.getBoundingClientRect();
                const offsetY = e.clientY - rect.top;

                const maxScrollbarPosY = heightScrollbar - thumbHeight;
                const newScrollbarPosY = Math.min(
                    Math.max(offsetY - thumbHeight / 2, 0),
                    maxScrollbarPosY,
                );

                const scrollRatio = newScrollbarPosY / maxScrollbarPosY;
                const newScrollTop = scrollRatio * (heightChild - heightParent);

                setThumbTop(newScrollbarPosY);
                refParent.current.scrollTop = newScrollTop;
            },
            [heightChild, thumbHeight],
        );
        const handleScrollbarPointerUp = useCallback(
            (e: PointerEvent<HTMLDivElement>) => {
                setIsDraggingScrollbar(false);
                e.currentTarget.releasePointerCapture(e.pointerId);
            },
            [],
        );

        const { scrollSmooth } = useScrollSmooth();

        const scrollSmoothCommon = useCallback(
            (newTop: number) => {
                //
                if (!refParent?.current) return;
                //
                scrollSmooth(refTarget.current, newTop, refParent.current.id);
            },
            [scrollSmooth],
        );
        const handleClickButtonUp = useCallback(() => {
            //
            if (!refParent?.current) return;
            //
            const newTop = Math.max(
                refParent.current.scrollTop - SCROLL_SUB,
                0,
            );
            //
            scrollSmoothCommon(newTop);
        }, [scrollSmoothCommon]);
        const handleClickButtonDown = useCallback(() => {
            //
            if (!refParent?.current) return;
            //
            const newTop = Math.min(
                refParent.current.scrollTop + SCROLL_SUB,
                refParent.current.clientHeight,
            );
            //
            scrollSmoothCommon(newTop);
        }, [scrollSmoothCommon]);

        const [canUp, setCanUp] = useState<boolean>(false);
        const [canDown, setCanDown] = useState<boolean>(true);

        useEffect(() => {
            if (!refScrollbar.current) return;
            const { clientHeight: heightScrollbar } = refScrollbar.current;
            setCanUp(thumbTop > 0);
            setCanDown(thumbTop < heightScrollbar - thumbHeight);
        }, [thumbHeight, thumbTop]);

        return (
            <div
                ref={refParent}
                id={`parent-${id}`}
                {...attrs}
                {...stylex.props(styles.container, stylesParent)}
                onScroll={handleScrollParent}
            >
                {/* スクロール対象 */}
                <div ref={refChild} {...stylex.props(stylesChild)}>
                    {/* ターゲット */}
                    <div
                        ref={refTarget}
                        id={`target-${id}`}
                        {...stylex.props(styles.target)}
                    />
                    {/* 子要素 */}
                    {children}
                </div>
                {/* スクロールバー */}
                <div
                    {...stylex.props(
                        styles.wrap,
                        !isScrollable && styles.wrapNotScrollable,
                    )}
                >
                    {/* 上ボタン */}
                    <div
                        {...stylex.props(hasButton && styles.button(canUp))}
                        onClick={handleClickButtonUp}
                    />
                    {/* バー本体 */}
                    <div
                        ref={refScrollbar}
                        {...stylex.props(
                            styles.bar,
                            hasButton && styles.barHasButton,
                        )}
                        onPointerDown={handleScrollbarPointerDown}
                        onPointerUp={handleScrollbarPointerUp}
                        onPointerMove={handleScrollbarPointerMove}
                    >
                        {/* thumb */}
                        <div
                            {...stylex.props(
                                styles.thumb(thumbHeight, thumbTop),
                            )}
                            onPointerDown={handleThumbPointerDown}
                            onPointerUp={handleThumbPointerUp}
                            onPointerMove={handleThumbPointerMove}
                        />
                    </div>
                    {/* 下ボタン */}
                    <div
                        {...stylex.props(hasButton && styles.button(canDown))}
                        onClick={handleClickButtonDown}
                    />
                </div>
            </div>
        );
    },
);

export const DivScrollable = memo(Component);
