import stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { UserAuthoredStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import {
    type HTMLAttributes,
    type MouseEvent,
    type PointerEvent,
    type UIEvent,
    forwardRef,
    memo,
    useImperativeHandle,
    useRef,
} from 'react';
import type { Coordinate } from '../../@types/index';
import { useEventKeydown } from '../../hooks/useEventKeydown';
import { useEventWheel } from '../../hooks/useEventWheel';
import type { ScrollMethods } from '../../pages/scroll/Ultimate';
import { getMostVisibleIndex } from '../../utils/getMostVisibleIndex';
import { scrollAnimate } from '../../utils/scrollAnimate';
import { snapPointer } from '../../utils/snapPointer';
import { snapToElement } from '../../utils/snapToElement';
import { snapWheel } from '../../utils/snapWheel';

interface Props extends HTMLAttributes<HTMLDivElement> {
    isSnap?: boolean;
    isAnimate?: boolean;
    stylesParent?: StyleXStyles<UserAuthoredStyles>;
    stylesScroll?: StyleXStyles<UserAuthoredStyles>;
    onSetPage?: (idx: number) => void;
}

const styles = stylex.create({
    parent: {
        overflow: 'hidden',
    },
    scroll: {
        overflow: 'auto',
        touchAction: 'none',
        cursor: 'grab',
        position: 'relative',
        width: '100%',
        height: '100%',
    },
});

const initCoordinate = { x: 0, y: 0 };
let isDragging = false;

const Component = forwardRef<ScrollMethods, Props>(
    (
        {
            isSnap,
            isAnimate,
            stylesParent,
            stylesScroll,
            onSetPage,
            children,
            ...attrs
        },
        ref,
    ) => {
        // Ref: スクロール要素
        const refScroll = useRef<HTMLDivElement>(null);

        // Ref: ドラッグ関連
        const dragOffset = useRef<Coordinate>(initCoordinate); // ドラッグ開始時のポインター位置
        const dragScroll = useRef<Coordinate>(initCoordinate); // ドラッグ開始時のスクロール位置
        const dragTimestamp = useRef<number>(0); // ドラッグ中のタイムスタンプ

        const { cancelAnimateScroll } = scrollAnimate();

        const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
            // 複数指をキャンセル
            if (!refScroll.current || isDragging) return;
            // ポインターを追跡
            refScroll.current.setPointerCapture(e.pointerId);
            // アニメーションをキャンセル
            cancelAnimateScroll();
            // ドラッグフラグを有効化
            isDragging = true;
            // スクロール位置計算用変数を更新
            dragOffset.current = {
                x: e.clientX - refScroll.current.offsetLeft,
                y: e.clientY - refScroll.current.offsetTop,
            };
            dragScroll.current = {
                x: refScroll.current.scrollLeft,
                y: refScroll.current.scrollTop,
            };
            // カーソルを更新
            refScroll.current.style.cursor = 'grabbing';
            document.body.style.cursor = 'grabbing';
        };

        const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
            // ドラッグ中でないならキャンセル
            if (!(refScroll.current && isDragging)) return;
            // ドラッグ位置からスクロール位置を算出してスクロール
            const { offsetLeft, offsetTop } = refScroll.current;
            const x = e.clientX - offsetLeft - dragOffset.current.x;
            const y = e.clientY - offsetTop - dragOffset.current.y;
            refScroll.current.scrollLeft = dragScroll.current.x - x;
            refScroll.current.scrollTop = dragScroll.current.y - y;
            // タイムスタンプを更新
            dragTimestamp.current = e.timeStamp;
        };

        const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
            // ドラッグ中でないならキャンセル
            if (!(refScroll.current && isDragging)) return;
            // ドラッグフラグを初期化
            isDragging = false;
            // 吸着
            if (isSnap)
                snapPointer(
                    e,
                    dragScroll.current,
                    dragTimestamp.current,
                    isAnimate,
                );
            // カーソルを初期化
            refScroll.current.style.cursor = '';
            document.body.style.cursor = '';
        };

        useEventWheel(
            refScroll,
            () => {
                cancelAnimateScroll();
            },
            () => {
                if (!refScroll.current) return;
                snapWheel(refScroll.current, isAnimate);
            },
        );

        const move = (sub: number) => {
            if (!refScroll.current) return;
            const currentIndex = getMostVisibleIndex(refScroll.current);
            if (currentIndex === null) return;
            const targetIndex = currentIndex + sub;
            if (
                targetIndex < 0 ||
                refScroll.current.children.length - 1 < targetIndex
            )
                return;
            const targetChild = refScroll.current.children[
                targetIndex
            ] as HTMLElement;
            snapToElement(refScroll.current, targetChild, isAnimate);
        };
        const back = () => {
            move(-1);
        };
        const next = () => {
            move(1);
        };

        useEventKeydown([
            { key: 'ArrowLeft', callback: back },
            { key: 'ArrowUp', callback: back },
            { key: 'ArrowRight', callback: next },
            { key: 'ArrowDown', callback: next },
        ]);

        const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
            // ホイールクリックを無効化
            if (e.button === 1) return e.preventDefault();
        };

        const handleScroll = (e: UIEvent) => {
            // 最も表示面積の多い子要素のインデックスを取得
            const mostVisibleIndex = getMostVisibleIndex(
                e.target as HTMLElement,
            );
            // インデックスがないならキャンセル
            if (mostVisibleIndex === null) return;
            onSetPage?.(mostVisibleIndex);
        };

        useImperativeHandle(ref, () => ({
            refScroll: refScroll.current,
            back,
            next,
        }));

        return (
            <div {...attrs} {...stylex.props(styles.parent, stylesParent)}>
                {/* スクロール対象 */}
                <div
                    ref={refScroll}
                    {...stylex.props(styles.scroll, stylesScroll)}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onMouseDown={handleMouseDown}
                    onScroll={handleScroll}
                    onAuxClick={e => e.preventDefault()} // 左クリック以外を無効化
                >
                    {/* 子要素 */}
                    {children}
                </div>
            </div>
        );
    },
);

export const DivScrollable = memo(Component);
