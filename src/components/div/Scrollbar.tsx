import stylex from '@stylexjs/stylex';
import {
    type FC,
    type PointerEvent,
    type RefObject,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { useScrollSmooth } from '../../hooks/useScrollSmooth';

interface Props {
    refParent: RefObject<HTMLDivElement>;
    refChild: RefObject<HTMLDivElement>;
    refTarget?: RefObject<HTMLDivElement>;
    hasButton?: boolean;
}

const SCROLLBAR_WIDTH = 8;
const SCROLLBAR_MARGIN = 1;
const SCROLL_SUB = 300;

const styles = stylex.create({
    wrap: {
        position: 'sticky',
        right: 0,
        top: 0,
        height: '100%',
    },
    scrollbar: {
        position: 'relative',
        width: SCROLLBAR_WIDTH,
        height: '100%',
        backgroundColor: 'darkred',
        cursor: 'pointer',
    },
    notScrollable: {
        display: 'none',
    },
    hasButton: {
        height: `calc(100% - ${SCROLLBAR_WIDTH}px * 2)`,
    },
    button: {
        position: 'relative',
        width: SCROLLBAR_WIDTH,
        height: SCROLLBAR_WIDTH,
        backgroundColor: 'darkgoldenrod',
        cursor: 'pointer',
        '::after': {
            content: '',
            position: 'absolute',
            top: 0,
            left: 0,
            width: `calc(${SCROLLBAR_WIDTH}px - ${SCROLLBAR_MARGIN}px * 2)`,
            height: `calc(${SCROLLBAR_WIDTH}px - ${SCROLLBAR_MARGIN}px * 2)`,
            margin: SCROLLBAR_MARGIN,
            backgroundColor: 'yellow',
        },
    },
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

const Component: FC<Props> = ({
    refParent,
    refChild,
    refTarget,
    hasButton = false,
}) => {
    const refScrollbar = useRef<HTMLDivElement>(null);

    const [scrollbarHeight, setScrollbarHeight] = useState<number>(0);
    const [scrollbarPosY, setScrollbarPosY] = useState<number>(0);

    const isScrollable: boolean = useMemo(
        () => scrollbarHeight > 0,
        [scrollbarHeight],
    );

    const handleLoad = useCallback(() => {
        if (!(refParent.current && refChild.current && refScrollbar.current))
            return;
        const { clientHeight: heightParent } = refParent.current;
        const { scrollHeight: heightChild } = refChild.current;
        const { scrollHeight: heightScrollbar } = refScrollbar.current;
        const ratio = heightParent / heightChild;
        if (ratio >= 1) return;
        const newScrollbarHeight = Math.max(heightScrollbar * ratio, 32);
        setScrollbarHeight(newScrollbarHeight);
    }, [refParent.current, refChild.current]);

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

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
                    refParent.current &&
                    refChild.current &&
                    refScrollbar.current
                )
            )
                return;

            const { clientHeight: heightParent } = refParent.current;
            const { scrollHeight: heightChild } = refChild.current;
            const { clientHeight: heightScrollbar } = refScrollbar.current;

            const rect = refScrollbar.current.getBoundingClientRect();
            const offsetY = e.clientY - rect.top;

            const maxScrollbarPosY = heightScrollbar - scrollbarHeight;
            const newScrollbarPosY = Math.min(
                Math.max(offsetY - thumbDragOffsetY, 0),
                maxScrollbarPosY,
            );

            const scrollRatio = newScrollbarPosY / maxScrollbarPosY;
            const newScrollTop = scrollRatio * (heightChild - heightParent);

            setScrollbarPosY(newScrollbarPosY);
            refParent.current.scrollTop = newScrollTop;
        },
        [
            isDraggingThumb,
            refParent.current,
            refChild.current,
            scrollbarHeight,
            thumbDragOffsetY,
        ],
    );

    // スクロールバー
    const [isDraggingScrollbar, setIsDraggingScrollbar] =
        useState<boolean>(false);

    const handleScrollbarPointerMove = useCallback(
        (e: PointerEvent<HTMLDivElement>) => {
            if (
                !(
                    isDraggingScrollbar &&
                    refParent.current &&
                    refChild.current &&
                    refScrollbar.current
                )
            )
                return;

            const { clientHeight: heightParent } = refParent.current;
            const { scrollHeight: heightChild } = refChild.current;
            const { clientHeight: heightScrollbar } = refScrollbar.current;

            const rect = refScrollbar.current.getBoundingClientRect();
            const offsetY = e.clientY - rect.top;

            const maxScrollbarPosY = heightScrollbar - scrollbarHeight;
            const newScrollbarPosY = Math.min(
                Math.max(offsetY - scrollbarHeight / 2, 0),
                maxScrollbarPosY,
            );

            const scrollRatio = newScrollbarPosY / maxScrollbarPosY;
            const newScrollTop = scrollRatio * (heightChild - heightParent);

            setScrollbarPosY(newScrollbarPosY);
            refParent.current.scrollTop = newScrollTop;
        },
        [
            isDraggingScrollbar,
            refParent.current,
            refChild.current,
            scrollbarHeight,
        ],
    );
    const handleScrollbarPointerDown = useCallback(
        (e: PointerEvent<HTMLDivElement>) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setIsDraggingScrollbar(true);
            if (
                !(refParent.current && refChild.current && refScrollbar.current)
            )
                return;

            const { clientHeight: heightParent } = refParent.current;
            const { scrollHeight: heightChild } = refChild.current;
            const { clientHeight: heightScrollbar } = refScrollbar.current;

            const rect = refScrollbar.current.getBoundingClientRect();
            const offsetY = e.clientY - rect.top;

            const maxScrollbarPosY = heightScrollbar - scrollbarHeight;
            const newScrollbarPosY = Math.min(
                Math.max(offsetY - scrollbarHeight / 2, 0),
                maxScrollbarPosY,
            );

            const scrollRatio = newScrollbarPosY / maxScrollbarPosY;
            const newScrollTop = scrollRatio * (heightChild - heightParent);

            setScrollbarPosY(newScrollbarPosY);
            refParent.current.scrollTop = newScrollTop;
        },
        [refParent.current, refChild.current, scrollbarHeight],
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
            if (!(refParent.current && refTarget)) return;
            scrollSmooth(refTarget, newTop, refParent.current.id);
        },
        [refParent, refTarget, scrollSmooth],
    );
    const handleClickButtonUp = useCallback(() => {
        if (!refParent.current) return;
        const newTop = Math.max(refParent.current.scrollTop - SCROLL_SUB, 0);
        scrollSmoothCommon(newTop);
    }, [refParent, scrollSmoothCommon]);
    const handleClickButtonDown = useCallback(() => {
        if (!refParent.current) return;
        const newTop = Math.min(
            refParent.current.scrollTop + SCROLL_SUB,
            refParent.current.scrollHeight,
        );
        scrollSmoothCommon(newTop);
    }, [refParent, scrollSmoothCommon]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                !(refParent.current && refChild.current && refScrollbar.current)
            )
                return;

            const { clientHeight: heightParent, scrollTop } = refParent.current;
            const { scrollHeight: heightChild } = refChild.current;
            const { clientHeight: heightScrollbar } = refScrollbar.current;

            const scrollRatio = scrollTop / (heightChild - heightParent);
            const newScrollbarPosY =
                scrollRatio * (heightScrollbar - scrollbarHeight);

            setScrollbarPosY(newScrollbarPosY);
        };

        if (refParent.current) {
            refParent.current.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (refParent.current) {
                refParent.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [refParent.current, refChild.current, scrollbarHeight]);

    return (
        <div {...stylex.props(styles.wrap)}>
            <div
                {...stylex.props(hasButton && styles.button)}
                onClick={handleClickButtonUp}
            />
            <div
                ref={refScrollbar}
                {...stylex.props(
                    styles.scrollbar,
                    !isScrollable && styles.notScrollable,
                    hasButton && styles.hasButton,
                )}
                onPointerDown={handleScrollbarPointerDown}
                onPointerUp={handleScrollbarPointerUp}
                onPointerMove={handleScrollbarPointerMove}
            >
                <div
                    {...stylex.props(
                        styles.thumb(scrollbarHeight, scrollbarPosY),
                    )}
                    onPointerDown={handleThumbPointerDown}
                    onPointerUp={handleThumbPointerUp}
                    onPointerMove={handleThumbPointerMove}
                />
            </div>
            <div
                {...stylex.props(hasButton && styles.button)}
                onClick={handleClickButtonDown}
            />
        </div>
    );
};

export const Scrollbar = memo(Component);
